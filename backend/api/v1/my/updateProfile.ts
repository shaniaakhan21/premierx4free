import { ClassTransformerRoles } from '@helpers/access'
import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import { transactional } from '@helpers/global'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile } from '@models/agent-profile.model'
import UserModel, { User } from '@models/user.model'

export type UpdateProfileRequest = Pick<AgentProfile, 'name' | 'contactNo' | 'location'> &
  Pick<User, 'email' | 'password'>

const updateProfile: CustomRequestHandler<{}, any, UpdateProfileRequest> = async (req, res) => {
  const user = await UserModel.findByUserId(req.user!.subject)
  if (!user) throw new RecordNotFoundError('Agent not found')
  const agent = await AgentProfileModel.findById(user.agentProfile)
  if (!agent) throw new RecordNotFoundError('Agent not found')
  agent.name = req.body.name
  agent.contactNo = req.body.contactNo
  agent.location = {
    address: req.body.location?.address,
    city: req.body.location?.city,
    state: req.body.location?.state,
    zip: req.body.location?.zip
  }
  user.email = req.body.email
  if (req.body.password) user.password = req.body.password

  // Do not use `updateOne` method of mongoose, it will not trigger `pre` and `post` hooks
  await user.save()
  await agent.save()

  await user.populate('agentProfile')

  res.json(successResponse(user.format([ClassTransformerRoles.Self, ...(user.roles ?? [])])))
}

export default transactional(updateProfile)
