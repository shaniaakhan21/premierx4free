import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import ContractModel from '@models/contract.model'

const getContacts: CustomRequestHandler<{}> = async (req, res) => {
  res.json(
    successResponse(
      (await ContractModel.find({}).populate('agent')).map((document) => document.format(req.user!.roles ?? []))
    )
  )
}

export default getContacts
