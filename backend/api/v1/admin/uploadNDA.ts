/* eslint-disable prettier/prettier */
import path from 'path'

import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import { generateFileName } from '@helpers/global'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentStatus } from '@models/agent-profile.model'
// eslint-disable-next-line import/no-extraneous-dependencies
import { UploadedFile } from 'express-fileupload'

const uploadNDA: CustomRequestHandler<{ agentId: string }> = async (req, res) => {
  const agent = await AgentProfileModel.findByAgentId(parseInt(req.params.agentId, 10))
  if (!agent) throw new RecordNotFoundError('Agent not found')
  console.log(`files from backend uploading function`,req.files?.file)

  if (!req.files?.file || !!(req.files?.file as UploadedFile[])?.[0])
    throw new RecordNotFoundError('NDA file not found')

  const fileName = generateFileName((req.files.file as UploadedFile).name)

  const file = req.files?.file as UploadedFile
  await file.mv(path.resolve(__dirname, '../../../uploads/nda', fileName))

  agent.nda = fileName

  if (agent.contract) agent.status = AgentStatus.Active

  await agent.save()

  res.json(successResponse(agent.format(req.user!.roles ?? [])))
}

export default uploadNDA
