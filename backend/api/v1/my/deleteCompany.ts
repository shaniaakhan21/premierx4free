import { ClassTransformerRoles } from '@helpers/access'
import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import AgentProfileModel from '@models/agent-profile.model'
import UserModel from '@models/user.model'

const deleteCompany: CustomRequestHandler<{ id: string }> = async (req, res) => {
  const user = await UserModel.findByUserId(req.user!.subject)
  if (!user) throw new RecordNotFoundError('Agent not found')
  const agent = await AgentProfileModel.findById(user.agentProfile)
  if (!agent) throw new RecordNotFoundError('Agent not found')

  if (!req.params.id) throw new RecordNotFoundError('Company not found')
  agent.companies = agent.companies?.filter((c) => c._id?.toString() !== req.params.id)

  await agent.save()

  await user.populate('agentProfile')

  res.json(successResponse(user.format([ClassTransformerRoles.Self, ...(user.roles ?? [])])))
}

export default deleteCompany
