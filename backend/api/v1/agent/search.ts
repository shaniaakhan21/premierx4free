import { CustomRequestHandler } from '@helpers/errorHandler'
import { AggregatedFacetedResponse, generateFacetCountQuery } from '@helpers/mongoDB'
import { SuccessResponse, successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile } from '@models/agent-profile.model'
import { User } from '@models/user.model'
import { PipelineStage } from 'mongoose'

export type SearchResponseRow = AgentProfile & {
  user: User
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

const searchAgents: CustomRequestHandler<
  { skip?: string; limit?: string },
  SuccessResponse<AggregatedFacetedResponse<SearchResponseRow>>,
  any,
  { q: string; by?: SearchBy; picker?: string }
> = async (req, res) => {
  if (!req.query.picker && !req.query.q) throw new Error('Query is required')
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
    },
    ...(req.query.picker
      ? [
          {
            $project: {
              _id: 1,
              name: 1,
              agentId: 1,
              companies: 1
            }
          }
        ]
      : []),
    ...generateFacetCountQuery(
      req.params.skip ? parseInt(req.params.skip, 10) : undefined,
      req.params.limit ? parseInt(req.params.limit, 10) : undefined
    )
  ]

  const data = await AgentProfileModel.aggregate<AggregatedFacetedResponse<SearchResponseRow>>(query)
  res.json(successResponse(data?.[0]))
}

export default searchAgents
