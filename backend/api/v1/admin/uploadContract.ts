import path from 'path'

import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import { generateFileName } from '@helpers/global'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentStatus } from '@models/agent-profile.model'
import { UploadedFile } from 'express-fileupload'

const uploadContract: CustomRequestHandler<{ agentId: string }> = async (req, res) => {
  const agent = await AgentProfileModel.findByAgentId(parseInt(req.params.agentId, 10))
  if (!agent) throw new RecordNotFoundError('Agent not found')

  if (!req.files?.document) throw new RecordNotFoundError('Contract file not found')

  const fileName = generateFileName((req.files.document as UploadedFile).name)

  const file = req.files?.document as UploadedFile
  await file.mv(path.resolve(__dirname, '../../../uploads/contract', fileName))

  agent.contract = fileName

  if (agent.nda) agent.status = AgentStatus.Active
  await agent.save()

  res.json(successResponse(agent.format(req.user!.roles ?? [])))
}

export default uploadContract
