import { ClassTransformerRoles } from '@helpers/access'
import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import validateClass, { transactional } from '@helpers/global'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile, AgentProfileLocation } from '@models/agent-profile.model'
import UserModel, { User } from '@models/user.model'
import { Exclude, Expose, plainToClass, Type } from 'class-transformer'
import { IsEmail, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator'

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

  @ValidateNested()
  @Type(() => AgentProfileLocation)
  @Expose()
  public location!: AgentProfileLocation

  @IsString()
  @IsEmail()
  @Expose()
  public email!: User['email']

  @IsString()
  @MinLength(8)
  @IsOptional()
  @Expose()
  public password?: User['password']
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
  const { email, password, ...agentData } = request
  agent.set(agentData)
  user.email = email
  if (password) user.password = password

  // Do not use `updateOne` method of mongoose, it will not trigger `pre` and `post` hooks
  await user.save()
  await agent.save()

  await user.populate('agentProfile')

  res.json(successResponse(user.format([ClassTransformerRoles.Self, ...(user.roles ?? [])])))
}

export default transactional(updateProfile)
