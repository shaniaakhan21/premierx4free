import { CustomRequestHandler } from '@helpers/errorHandler'
import { SuccessResponse, successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile, AgentProfileCompany } from '@models/agent-profile.model'
import { Contract } from '@models/contract.model'
import { User } from '@models/user.model'
import { PipelineStage } from 'mongoose'

export type SearchResponseRow = AgentProfile & {
  user: User
  companies: AgentProfileCompany
  contracts: Contract[]
}

export type SearchBy =
  | 'name'
  | 'contactNo'
  | 'companies.name'
  | 'user.email'
  | 'companies.contactPersonName'
  | 'companies.contactPersonPhone'
  | 'companies.comment'

const searchContacts: CustomRequestHandler<
  { skip?: string; limit?: string },
  SuccessResponse<SearchResponseRow[]>,
  any,
  { q: string; by?: SearchBy }
> = async (req, res) => {
  if (!req.query.q) throw new Error('Query is required')
  const query: PipelineStage[] = [
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'agentProfile',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $unwind: '$companies'
    },
    {
      $match: req.query.by
        ? {
            [req.query.by]: {
              $regex: new RegExp(`.*${req.query.q}.*`, 'i')
            }
          }
        : {
            $or: [
              'name',
              'contactNo',
              'companies.name',
              'user.email',
              'companies.contactPersonName',
              'companies.contactPersonPhone',
              'companies.comment'
            ].map((field) => ({
              [field]: {
                $regex: new RegExp(`.*${req.query.q}.*`, 'i')
              }
            }))
          }
    },
    {
      $lookup: {
        from: 'contract',
        let: { agent: '$_id', company: '$companies._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$agent', '$$agent'] }, { $eq: ['$company', { $toString: '$$company' }] }]
              }
            }
          }
        ],
        as: 'contracts'
      }
    }
  ]

  if (req.params?.limit) {
    if (req.params?.skip)
      query.push({
        $skip: parseInt(req.params?.skip ?? '0', 10)
      })
    query.push({
      $limit: parseInt(req.params?.limit ?? '10', 10)
    })
  }

  const data = await AgentProfileModel.aggregate<SearchResponseRow>(query)
  res.json(successResponse(data))
}

export default searchContacts
