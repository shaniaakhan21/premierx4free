import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import ContractModel from '@models/contract.model'

const deleteContract: CustomRequestHandler<{ id: string }> = async (req, res) => {
  const existing = await ContractModel.findById(req.params.id)
  if (!existing) throw new Error('Contract not found')
  await ContractModel.deleteOne({ _id: req.params.id })

  res.json(successResponse())
}

export default deleteContract
