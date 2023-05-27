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

export type AggregatedSearchResponse = {
  count: number
  data: SearchResponseRow[]
}

export enum SearchBy {
  All = 'all',
  Name = 'name',
  ContactNo = 'contactNo',
  CompanyName = 'companies.name',
  Email = 'user.email',
  ContactPersonName = 'companies.contactPersonName',
  ContactPersonPhone = 'companies.contactPersonPhone',
  Comment = 'companies.comment'
}

const searchContacts: CustomRequestHandler<
  { skip?: string; limit?: string },
  SuccessResponse<AggregatedSearchResponse>,
  any,
  { q: string; by?: SearchBy }
> = async (req, res) => {
  // if (!req.query.q) throw new Error('Query is required')
  if (req.query.by && Object.values(SearchBy).indexOf(req.query.by) === -1) throw new Error('Invalid search by')
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
    ...(req.query.q
      ? [
          {
            $match:
              req.query.by && req.query.by !== SearchBy.All
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
          }
        ]
      : []),
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
    },
    {
      $unwind: '$contracts'
    },
    {
      $facet: {
        count: [
          {
            $group: {
              _id: null,
              count: { $sum: 1 }
            }
          }
        ],
        data: [
          {
            $group: {
              _id: '$_id',
              documents: { $first: '$$ROOT' }
            }
          },
          ...(req.params?.skip ? [{ $skip: parseInt(req.params?.skip ?? '0', 10) }] : []),
          ...(req.params?.limit ? [{ $limit: parseInt(req.params?.limit ?? '10', 10) }] : [])
        ]
      }
    },
    {
      $project: {
        count: { $arrayElemAt: ['$count.count', 0] },
        data: '$data.documents'
      }
    }
  ]

  const data = await AgentProfileModel.aggregate<AggregatedSearchResponse>(query)
  res.json(successResponse(data?.[0]))
}

export default searchContacts
