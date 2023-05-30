import { CustomRequestHandler } from '@helpers/errorHandler'
import { AggregatedFacetedResponse, generateFacetCountQuery } from '@helpers/mongoDB'
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
  SuccessResponse<AggregatedFacetedResponse<SearchResponseRow>>,
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
    ...(req.query.q && req.query.q !== ''
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
                    $or: Object.values(SearchBy).map((field) => ({
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
      $sort: {
        createdAt: -1,
        'companies.createdAt': -1,
        'contracts.createdAt': -1
      }
    },
    ...generateFacetCountQuery(
      req.params.skip ? parseInt(req.params.skip, 10) : undefined,
      req.params.limit ? parseInt(req.params.limit, 10) : undefined
    )
  ]

  const data = await AgentProfileModel.aggregate<AggregatedFacetedResponse<SearchResponseRow>>(query)
  res.json(successResponse(data?.[0]))
}

export default searchContacts
