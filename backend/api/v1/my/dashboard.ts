import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile } from '@models/agent-profile.model'

export type ReferralClient = {
  commission: number
  agent: AgentProfile
}

const dashboard: CustomRequestHandler<{ level: string }> = async (req, res) => {
  const me = await AgentProfileModel.findByUserId(req.user!.subject)

  let referralClients: ReferralClient[] = []

  const lv1 = (await me?.getSubordinates()) ?? []

  referralClients = [
    ...referralClients,
    ...lv1.map((agent) => ({
      commission: process.env.REF_LV_1 ? parseInt(process.env.REF_LV_1, 10) : 2,
      agent
    }))
  ]

  const lv2 = (await Promise.all(lv1.map((agent) => agent.getSubordinates()))).flat() ?? []

  referralClients = [
    ...referralClients,
    ...lv2.map((agent) => ({
      commission: process.env.REF_LV_2 ? parseInt(process.env.REF_LV_2, 10) : 1,
      agent
    }))
  ]

  res.json(successResponse(referralClients))
}

export default dashboard
