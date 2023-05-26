import { CustomRequestHandler } from '@helpers/errorHandler'
import { SuccessResponse, successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile } from '@models/agent-profile.model'
import { User } from '@models/user.model'
import { PipelineStage } from 'mongoose'

export type SearchResponseRow = AgentProfile & {
  user: User
}

export type SearchBy =
  | 'name'
  | 'contactNo'
  | 'companies.name'
  | 'user.email'
  | 'companies.contactPersonName'
  | 'companies.contactPersonPhone'
  | 'companies.comment'

const searchAgents: CustomRequestHandler<
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

export default searchAgents
