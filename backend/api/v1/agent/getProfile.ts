import { ClassTransformerRoles } from '@helpers/access'
import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import AgentProfileModel from '@models/agent-profile.model'

const get: CustomRequestHandler<{ id: string }> = async (req, res) => {
  const agent = await AgentProfileModel.findById(req.params.id)
  if (!agent) throw new RecordNotFoundError('Agent not found')
  res.json(
    successResponse(
      agent.format([
        ...(req.user?.subject === parseInt(req.params.id, 10) ? [ClassTransformerRoles.Self] : []),
        ...(req.user?.roles ?? [])
      ])
    )
  )
}

export default get
