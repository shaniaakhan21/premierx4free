import { ClassTransformerRoles, Roles } from '@helpers/access'
import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import validateClass, { transactional } from '@helpers/global'
import { successResponse } from '@helpers/response'
import { moveFile } from '@helpers/s3'
import AgentProfileModel, {
  AgentProfile,
  AgentProfileCompany,
  AgentProfileLocation,
  AgentStatus
} from '@models/agent-profile.model'
import UserModel, { User } from '@models/user.model'
import { Exclude, Expose, plainToClass, Type } from 'class-transformer'
import { IsArray, IsEmail, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator'

@Exclude()
export class UpdateAgentRequest {
  constructor(body: any) {
    Object.assign(this, body)
  }

  @IsString()
  @Expose()
  public _id!: AgentProfile['_id']

  @IsEnum(AgentStatus)
  @Expose()
  public status?: AgentProfile['status']

  @IsString()
  @Expose()
  public name!: AgentProfile['name']

  @IsString()
  @Expose()
  public contactNo: AgentProfile['contactNo']

  @IsString()
  @IsOptional()
  @Expose()
  public address!: AgentProfileLocation['address']

  @IsString()
  @IsOptional()
  @Expose()
  public city!: AgentProfileLocation['city']

  @IsString()
  @IsOptional()
  @Expose()
  public state!: AgentProfileLocation['state']

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

  @IsArray()
  @IsEnum(Roles, { each: true })
  @Expose()
  public roles?: User['roles']

  @IsArray()
  @ValidateNested()
  @Type(() => AgentProfileCompany)
  @Expose()
  public companies?: AgentProfile['companies']

  @IsString()
  @IsOptional()
  @Expose()
  public profileImage!: AgentProfile['profileImage']

  @IsString()
  @IsOptional()
  @Expose()
  public nda?: AgentProfile['nda']

  @IsString()
  @IsOptional()
  @Expose()
  public contract?: AgentProfile['contract']
}

const updateAgentProfile: CustomRequestHandler<{}, any, UpdateAgentRequest> = async (req, res) => {
  const admin = await UserModel.findByUserId(req.user!.subject)
  if (!admin) throw new RecordNotFoundError('Admin not found')
  const request = plainToClass(UpdateAgentRequest, req.body, {
    strategy: 'excludeAll',
    exposeUnsetFields: false,
    groups: [ClassTransformerRoles.Self, ...(req.user?.roles ?? [])]
  })
  await validateClass(request)
  const user = await UserModel.findOne({ agentProfile: req.body._id })
  if (!user) throw new RecordNotFoundError('Agent not found')
  const agent = await AgentProfileModel.findById(req.body._id)
  if (!agent) throw new RecordNotFoundError('Agent not found')
  agent.set({
    name: request.name,
    contactNo: request.contactNo,
    location: {
      address: request.address,
      city: request.city,
      state: request.state,
      zip: request.zip
    },
    companies: request.companies,
    status: request.status,
    updatedBy: admin._id
  })

  user.email = request.email
  user.roles = request.roles

  if (request.password) user.password = request.password

  agent.profileImage = await moveFile(request.profileImage, 'profileImage', agent.profileImage)
  agent.nda = await moveFile(request.nda, 'nda', agent.nda)
  agent.contract = await moveFile(request.contract, 'contract', agent.contract)

  // Do not use `updateOne` method of mongoose, it will not trigger `pre` and `post` hooks
  await user.save()
  await agent.save()

  await user.populate('agentProfile')

  res.json(successResponse(user.format(req.user!.roles ?? [])))
}

export default transactional(updateAgentProfile)
