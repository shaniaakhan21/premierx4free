/* eslint-disable import/no-extraneous-dependencies */

import { CustomRequestHandler } from '@helpers/errorHandler'
import validateClass from '@helpers/global'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfileCompany } from '@models/agent-profile.model'
import ContractModel, { Contract } from '@models/contract.model'
import UserModel from '@models/user.model'
import { DocumentType } from '@typegoose/typegoose'
import { plainToInstance } from 'class-transformer'

export type CreateContractRequest = Omit<
  Contract,
  'company' | 'createdBy' | 'lastUpdatedBy' | 'createdAt' | 'updatedAt'
> & {
  company: Pick<AgentProfileCompany, '_id' | 'commissionRate' | 'employeeCount'>
}

const createContract: CustomRequestHandler<{}, any, Contract> = async (req, res) => {
  const me = await UserModel.findByUserId(req.user!.subject)
  const request = plainToInstance(Contract, req.body, {
    strategy: 'excludeAll',
    exposeUnsetFields: false,
    groups: req.user?.roles ?? []
  })
  await validateClass(request)
  const agent = await AgentProfileModel.findById(request.agent)
  if (!agent) throw new Error('Agent not found')
  const company = agent.companies?.find((c) => c._id!.toString() === request.company)
  if (!company) throw new Error('Company not found')

  let document: DocumentType<Contract> | null = null

  if (request._id) {
    document = await ContractModel.findById(request._id).exec()
    if (!document) throw new Error('Contract not found')
    const data: Partial<Contract> = {
      ...request,
      lastUpdatedBy: me?._id
    }
    document.set(data)
    await document.save()
  } else {
    document = await ContractModel.create({
      ...request,
      createdBy: me?._id
    })
  }

  await AgentProfileModel.updateOne(
    {
      _id: agent._id,
      'companies._id': company._id
    },
    {
      $set: {
        'companies.$.employeeCount': request.employeeCount,
        'companies.$.commissionRate': request.commissionRate
      }
    }
  )

  await document.populate('agent')

  return res.json(successResponse(document.format(req.user!.roles ?? [])))
}

export default createContract
