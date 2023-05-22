import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import { generateFileName } from '@helpers/global'
import { successResponse } from '@helpers/response'
import AgentProfileModel from '@models/agent-profile.model'
import { UploadedFile } from 'express-fileupload'

const uploadNDA: CustomRequestHandler<{ agentId: string }> = async (req, res) => {
  const agent = await AgentProfileModel.findByAgentId(parseInt(req.params.agentId, 10))
  if (!agent) throw new RecordNotFoundError('Agent not found')

  if (!req.files?.nda) throw new RecordNotFoundError('NDA file not found')

  const fileName = generateFileName((req.files.nda as UploadedFile).name)

  // todo: Implement File Upload Functionality
  // Assuming file upload is successful

  agent.nda = fileName
  await agent.save()

  res.json(successResponse(agent.format(req.user!.roles ?? [])))
}

export default uploadNDA
