import path from 'path'

import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import { generateFileName } from '@helpers/global'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentStatus } from '@models/agent-profile.model'
import { UploadedFile } from 'express-fileupload'

const uploadNDA: CustomRequestHandler<{ agentId: string }> = async (req, res) => {
  const agent = await AgentProfileModel.findByAgentId(parseInt(req.params.agentId, 10))
  if (!agent) throw new RecordNotFoundError('Agent not found')

  if (!req.files?.document || !!(req.files?.document as UploadedFile[])?.[0])
    throw new RecordNotFoundError('NDA file not found')

  const fileName = generateFileName((req.files.document as UploadedFile).name)

  const file = req.files?.document as UploadedFile
  await file.mv(path.resolve(__dirname, '../../../uploads/nda', fileName))

  agent.nda = fileName

  if (agent.contract) agent.status = AgentStatus.Active

  await agent.save()

  res.json(successResponse(agent.format(req.user!.roles ?? [])))
}

export default uploadNDA
