import { ClassTransformerRoles } from '@helpers/access'
import { CustomRequestHandler, RecordNotFoundError } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import UserModel from '@models/user.model'
import { instanceToPlain } from 'class-transformer'

const get: CustomRequestHandler<{ id: string }> = async (req, res) => {
  const user = await UserModel.findByUserId(parseInt(req.params.id, 10))
  if (!user) throw new RecordNotFoundError('Agent not found')
  await user.populate('agentProfile')
  res.json(
    successResponse(
      instanceToPlain(user.toJSON(), {
        groups: [
          ...(req.user?.subject === parseInt(req.params.id, 10) ? [ClassTransformerRoles.Self] : []),
          ...(user.roles ?? [])
        ]
      })
    )
  )
}

export default get
