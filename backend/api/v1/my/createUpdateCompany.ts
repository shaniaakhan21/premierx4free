import { ClassTransformerRoles } from '@helpers/access'
import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import validateClass from '@helpers/global'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfileCompany } from '@models/agent-profile.model'
import UserModel from '@models/user.model'
import { plainToInstance } from 'class-transformer'

const createUpdateCompany: CustomRequestHandler<{}, any, AgentProfileCompany> = async (req, res) => {
  const request = plainToInstance(AgentProfileCompany, req.body, {
    strategy: 'excludeAll',
    exposeUnsetFields: false,
    groups: [ClassTransformerRoles.Self, ...(req.user?.roles ?? [])]
  })
  await validateClass(request)
  const user = await UserModel.findByUserId(req.user!.subject)
  if (!user) throw new RecordNotFoundError('Agent not found')
  const agent = await AgentProfileModel.findById(user.agentProfile)
  if (!agent) throw new RecordNotFoundError('Agent not found')

  if (request._id) {
    const company = agent.companies?.find((c) => c._id?.toString() === request._id)
    if (!company) throw new RecordNotFoundError('Company not found')
    Object.assign(company, request)
  } else {
    if (!agent.companies) agent.companies = []
    agent.companies.push(request)
  }

  await agent.save()

  await user.populate('agentProfile')

  res.json(successResponse(user.format([ClassTransformerRoles.Self, ...(user.roles ?? [])])))
}

export default createUpdateCompany
