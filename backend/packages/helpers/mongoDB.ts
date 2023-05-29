import { PipelineStage } from 'mongoose'

export type AggregatedFacetedResponse<T> = {
  count: number
  data: T[]
}

export function generateFacetCountQuery(skip?: number, limit?: number): PipelineStage[] {
  return [
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
              _id: '$contracts._id',
              agent_id: { $first: '$_id' },
              documents: { $first: '$$ROOT' }
            }
          },
          {
            $project: {
              _id: '$agent_id',
              documents: '$documents'
            }
          },
          {
            $sort: {
              'documents.contracts._id': -1
            }
          },
          ...(skip ? [{ $skip: skip }] : []),
          ...(limit ? [{ $limit: limit }] : [])
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
}
