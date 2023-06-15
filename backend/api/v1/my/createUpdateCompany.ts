import { ClassTransformerRoles } from '@helpers/access'
import { sendEmail } from '@helpers/email'
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
  request.uniqueKey = `${request.name?.toLowerCase().replace(/[^a-z0-9]/g, '')}-${request.address
    ?.toLowerCase()
    .replace(/[^a-z0-9]/g, '')}-${request.employeeCount}`
  const existing = await AgentProfileModel.findByCompanyUniqueKey(request.uniqueKey)
  if (existing && (!request._id || agent._id !== existing._id)) throw new Error('Company already exists')

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

  if (process.env.NOTIFY_COMPANY_CREATE) {
    const emails = process.env.NOTIFY_COMPANY_CREATE.split(',')
    await Promise.all(
      emails.map((email) =>
        sendEmail(
          email,
          `PremieRx - Company Created by ${agent.name}`,
          `Company ${request.name} has been created by agent ${agent.name}. Please review the company. ${process.env.FRONTEND_URL}/admin/agents/${user.userId}`
        )
      )
    )
  }

  res.json(successResponse(user.format([ClassTransformerRoles.Self, ...(user.roles ?? [])])))
}

export default createUpdateCompany
