import path from 'path'

import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import { generateFileName } from '@helpers/global'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentStatus } from '@models/agent-profile.model'
import { UploadedFile } from 'express-fileupload'

const uploadDocuments: CustomRequestHandler<{ agentId: string }> = async (req, res) => {
  const agent = await AgentProfileModel.findByAgentId(parseInt(req.params.agentId, 10))
  if (!agent) throw new RecordNotFoundError('Agent not found')

  if (!req.files?.contract) throw new RecordNotFoundError('Contract file not found')
  if (!req.files?.nda) throw new RecordNotFoundError('NDA file not found')

  const fileNameC = generateFileName((req.files.contract as UploadedFile).name)
  const fileNameN = generateFileName((req.files.nda as UploadedFile).name)

  const fileC = req.files?.contract as UploadedFile
  const fileN = req.files?.nda as UploadedFile
  await fileC.mv(path.resolve(__dirname, '../../../uploads/contract', fileNameC))
  await fileN.mv(path.resolve(__dirname, '../../../uploads/nda', fileNameN))

  agent.contract = fileNameC
  agent.nda = fileNameN

  agent.status = AgentStatus.Active
  await agent.save()

  res.json(successResponse(agent.format(req.user!.roles ?? [])))
}

export default uploadDocuments
