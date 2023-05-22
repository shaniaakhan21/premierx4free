import { ClassTransformerRoles } from '@helpers/access'
import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile } from '@models/agent-profile.model'
import { DocumentType } from '@typegoose/typegoose'
import { instanceToPlain, plainToInstance } from 'class-transformer'

const subordinates: CustomRequestHandler<{ level: string }> = async (req, res) => {
  const me = await AgentProfileModel.findByUserId(req.user!.subject)

  const level = parseInt(req.params.level, 10) || 1

  if (level < 1) throw new Error('Invalid level')

  const formatAgentDocument = (agent: DocumentType<AgentProfile>) => {
    const options = {
      groups: [ClassTransformerRoles.Referrer, ...(req.user!.roles ?? [])],
      enableCircularCheck: true
    }
    return instanceToPlain(plainToInstance(AgentProfile, agent.toJSON(), options), options)
  }

  async function getSubordinates(agent: DocumentType<AgentProfile>, l: number): Promise<Record<string, any>[]> {
    console.log('getSubordinates', agent.agentId, l)
    const ss = await agent.getSubordinates()
    if (l === 1) {
      return ss.map((s) => {
        const f = formatAgentDocument(s)
        console.log('formatAgentDocument', s, f)
        return f
      })
    }
    const subordinatesWithSubordinates = await Promise.all(
      ss.map(async (s) => {
        return { ...formatAgentDocument(s), subordinates: await getSubordinates(s, l - 1) }
      })
    )
    return subordinatesWithSubordinates
  }

  const subordinatesList = await getSubordinates(me!, level)

  res.json(successResponse(subordinatesList))
}

export default subordinates
