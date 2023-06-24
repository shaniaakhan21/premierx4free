import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile } from '@models/agent-profile.model'
import ContractModel, { Contract } from '@models/contract.model'
import { DocumentType } from '@typegoose/typegoose'
import mongoose from 'mongoose'

export type ReferralClient = {
  level: number
  commission: number
  agent: AgentProfile
}

async function getReferralClients(me: DocumentType<AgentProfile>) {
  let referralClients: ReferralClient[] = []

  const lv1 = (await me?.getSubordinates()) ?? []

  referralClients = [
    ...referralClients,
    ...lv1.map((agent) => ({
      commission: process.env.REF_LV_1 ? parseInt(process.env.REF_LV_1, 10) : 2,
      level: 1,
      agent
    }))
  ]

  const lv2 = (await Promise.all(lv1.map((agent) => agent.getSubordinates()))).flat() ?? []

  referralClients = [
    ...referralClients,
    ...lv2.map((agent) => ({
      commission: process.env.REF_LV_2 ? parseInt(process.env.REF_LV_2, 10) : 1,
      level: 2,
      agent
    }))
  ]

  return referralClients
}

async function getSummary(me: DocumentType<AgentProfile>, referrals: ReferralClient[], from: Date, to: Date) {
  const ids: (mongoose.Types.ObjectId | string)[] = []
  me.companies?.map((c) => ids.push(c._id!.toString()))
  referrals.map((r) => r.agent.companies?.map((c) => ids.push(c._id!.toString())))
  const contracts = await ContractModel.aggregate<Contract>([
    {
      $match: {
        $and: [
          {
            company: {
              $in: ids
            }
          },
          {
            $or: [
              {
                start: {
                  $gte: from,
                  $lte: to
                }
              },
              {
                end: {
                  $gte: from,
                  $lte: to
                }
              }
            ]
          }
        ]
      }
    },
    {
      $lookup: {
        from: 'agentProfiles',
        localField: 'agent',
        foreignField: '_id',
        as: 'agent'
      }
    },
    {
      $unwind: {
        path: '$agent'
      }
    },
    {
      $unwind: '$months'
    },
    {
      $match: {
        $or: [
          {
            'months.start': {
              $gte: from,
              $lte: to
            }
          },
          {
            'months.end': {
              $gte: from,
              $lte: to
            }
          }
        ]
      }
    }
  ])

  const indexedReferrals = referrals.reduce<{ [key: string]: number }>(
    (acc, cur) => ({ ...acc, [cur.agent._id!.toString()]: cur.level }),
    {}
  )

  return {
    referrals: contracts
      .filter((c) => c && (c.agent as AgentProfile)?._id!.toString() !== me._id.toString())
      .map((c) => ({ ...c, level: indexedReferrals[(c.agent as AgentProfile)?._id!.toString()] })),
    directs: contracts.filter((c) => c && (c.agent as AgentProfile)?._id!.toString() === me._id.toString())
  }
}

const dashboard: CustomRequestHandler<{ from: string; to: string }> = async (req, res) => {
  const me = await AgentProfileModel.findByUserId(req.user!.subject)
  if (!me) throw new Error('Agent not found')
  if (!req.params.from) throw new Error('From date is required')
  if (!req.params.to) throw new Error('To date is required')
  const from = new Date(req.params.from)
  const to = new Date(req.params.to)
  if (from > to) throw new Error('From date must be before to date')

  const referrals = await getReferralClients(me)
  const summary = await getSummary(me, referrals, from, to)
  res.json(successResponse({ referrals, directs: me.companies, summary }))
}

export default dashboard
