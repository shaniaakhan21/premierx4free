import { CustomRequestHandler, RecordAlreadyExistsError } from '@helpers/errorHandler'
import { Request } from 'express'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile } from '@models/agent-profile.model'
import UserModel, { User } from '@models/user.model'
import { transactional } from '@helpers/global'
import { Roles } from '@helpers/access'

type RegisterRequest = Omit<AgentProfile, 'agentId'> & Pick<User, 'email' | 'password'>

const register: CustomRequestHandler = async (
  req: Request<{}, {}, RegisterRequest>,
  res
) => {
  const exist = await User.findByEmail(req.body.email)

  if (exist.length > 0) throw new RecordAlreadyExistsError('Agent with this email already exists')

  const user = await UserModel.create({
    email: req.body.email,
    password: req.body.password,
    roles: [Roles.Agent]
  });

  const agent = await AgentProfileModel.create({
    name: req.body.name,
    contactNo: req.body.contactNo,
    location: {
      address: req.body.location?.address,
      city: req.body.location?.city,
      state: req.body.location?.state,
      zip: req.body.location?.zip
    },
    referralCode: req.body.referralCode
  });

  user.agentProfile = agent._id
  await user.save()

  res.json(successResponse())
}

export default transactional(register)
