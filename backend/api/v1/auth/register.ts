import { Roles } from '@helpers/access'
import { CustomRequestHandler, RecordAlreadyExistsError } from '@helpers/errorHandler'
import { transactional } from '@helpers/global'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile } from '@models/agent-profile.model'
import UserModel, { User } from '@models/user.model'

type RegisterRequest = Omit<AgentProfile, 'agentId'> & Pick<User, 'email' | 'password'> & { referrer?: number }

const register: CustomRequestHandler<{}, any, RegisterRequest> = async (req, res) => {
  const exist = await UserModel.findByEmail(req.body.email.toLowerCase())

  if (exist) throw new RecordAlreadyExistsError('Agent with this email already exists')

  const user = await UserModel.create({
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    roles: [Roles.Agent]
  })

  const agentData: Partial<AgentProfile> = {
    name: req.body.name,
    contactNo: req.body.contactNo,
    location: {
      address: req.body.location?.address,
      city: req.body.location?.city,
      state: req.body.location?.state,
      zip: req.body.location?.zip
    }
  }

  if (req.body.referrer && req.body.referrer?.toString() !== '') {
    const referrer = await AgentProfileModel.findByAgentId(req.body.referrer)
    if (referrer) agentData.referrer = referrer._id
  }

  const agent = await AgentProfileModel.create(agentData)

  user.agentProfile = agent._id
  await user.save()

  res.json(successResponse())
}

export default transactional(register)
