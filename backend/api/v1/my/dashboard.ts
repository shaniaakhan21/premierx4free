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
      commission: process.env.REF_LV_1 ? parseInt(process.env.REF_LV_1, 10) : 6,
      agent
    }))
  ]

  const lv2 = (await Promise.all(lv1.map((agent) => agent.getSubordinates()))).flat() ?? []

  referralClients = [
    ...referralClients,
    ...lv2.map((agent) => ({
      commission: process.env.REF_LV_2 ? parseInt(process.env.REF_LV_2, 10) : 5,
      agent
    }))
  ]

  const lv3 = (await Promise.all(lv2.map((agent) => agent.getSubordinates()))).flat() ?? []

  referralClients = [
    ...referralClients,
    ...lv3.map((agent) => ({
      commission: process.env.REF_LV_3 ? parseInt(process.env.REF_LV_3, 10) : 2,
      agent
    }))
  ]

  const lv4 = (await Promise.all(lv3.map((agent) => agent.getSubordinates()))).flat() ?? []

  referralClients = [
    ...referralClients,
    ...lv4.map((agent) => ({
      commission: process.env.REF_LV_4 ? parseInt(process.env.REF_LV_4, 10) : 1,
      agent
    }))
  ]

  res.json(successResponse(referralClients))
}

export default dashboard
