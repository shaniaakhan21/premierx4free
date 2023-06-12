import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentStatus } from '@models/agent-profile.model'

const uploadNDA: CustomRequestHandler<{ agentId: string }> = async (req, res) => {
  const agent = await AgentProfileModel.findByAgentId(parseInt(req.params.agentId, 10))
  if (!agent) throw new RecordNotFoundError('Agent not found')

  if (!req.file) throw new RecordNotFoundError('NDA file not found')

  agent.nda = (req.file as Express.MulterS3.File).location

  if (agent.contract) agent.status = AgentStatus.Active

  await agent.save()

  res.json(successResponse(agent.format(req.user!.roles ?? [])))
}

export default uploadNDA
