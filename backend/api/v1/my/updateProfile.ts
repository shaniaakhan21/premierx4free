import fs from 'fs'
import path from 'path'

import { ClassTransformerRoles } from '@helpers/access'
import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import validateClass, { generateFileName, transactional } from '@helpers/global'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile, AgentProfileLocation } from '@models/agent-profile.model'
import UserModel, { User } from '@models/user.model'
import { Exclude, Expose, plainToClass } from 'class-transformer'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
import { UploadedFile } from 'express-fileupload'

@Exclude()
export class UpdateProfileRequest {
  constructor(body: any) {
    Object.assign(this, body)
  }

  @IsString()
  @Expose()
  public name!: AgentProfile['name']

  @IsString()
  @Expose()
  public contactNo: AgentProfile['contactNo']

  @IsString()
  @IsOptional()
  @Expose()
  public zip!: AgentProfileLocation['zip']

  @IsString()
  @IsEmail()
  @Expose()
  public email!: User['email']

  @IsString()
  @IsOptional()
  @Expose()
  public password?: User['password']

  @IsString()
  @MinLength(8)
  @IsOptional()
  @Expose()
  public newPassword?: User['password']

  @IsString()
  @IsOptional()
  @Expose()
  public profileImage!: AgentProfile['profileImage']
}

const updateProfile: CustomRequestHandler<{}, any, UpdateProfileRequest> = async (req, res) => {
  const request = plainToClass(UpdateProfileRequest, req.body, {
    strategy: 'excludeAll',
    exposeUnsetFields: false,
    groups: [ClassTransformerRoles.Self, ...(req.user?.roles ?? [])]
  })
  await validateClass(request)
  const user = await UserModel.findByUserId(req.user!.subject)
  if (!user) throw new RecordNotFoundError('Agent not found')
  const agent = await AgentProfileModel.findById(user.agentProfile)
  if (!agent) throw new RecordNotFoundError('Agent not found')
  const { email, password, newPassword, zip, ...agentData } = request
  agent.set({ ...agentData, location: { ...agent.location, zip } })
  user.email = email

  if (req.files?.profileImage && !(req.files?.profileImage as UploadedFile[])?.[0]) {
    const file = req.files?.profileImage as UploadedFile
    const fileName = generateFileName(file.name)
    await file.mv(path.resolve(__dirname, '../../../uploads/profileImage', fileName))
    if (agent.profileImage) {
      const existingFile = path.resolve(__dirname, '../../../uploads/profileImage', agent.profileImage)
      if (fs.existsSync(existingFile)) {
        fs.unlinkSync(existingFile)
      }
    }
    agent.profileImage = fileName
  }

  if (newPassword && password) {
    if (!(await user.comparePassword(password))) throw new Error('Invalid password')
    if (password) user.password = newPassword
  }

  // Do not use `updateOne` method of mongoose, it will not trigger `pre` and `post` hooks
  await user.save()
  await agent.save()

  await user.populate('agentProfile')

  res.json(successResponse(user.format([ClassTransformerRoles.Self, ...(user.roles ?? [])])))
}

export default transactional(updateProfile)
