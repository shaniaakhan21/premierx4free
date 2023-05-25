import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import AgentProfileModel from '@models/agent-profile.model'

const getAll: CustomRequestHandler<{}> = async (_req, res) => {
  const agent = await AgentProfileModel.getAllAgents()
  if (!agent) throw new RecordNotFoundError('Agent not found')
  res.json(successResponse(agent))
}

export default getAll
