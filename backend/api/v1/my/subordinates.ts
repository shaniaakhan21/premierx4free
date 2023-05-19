import { ClassTransformerRoles } from '@helpers/access'
import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import AgentProfileModel, { AgentProfile } from '@models/agent-profile.model'
import { DocumentType } from '@typegoose/typegoose'
import { instanceToPlain } from 'class-transformer'

const subordinates: CustomRequestHandler<{ level: string }> = async (req, res) => {
  const me = await AgentProfileModel.findByUserId(req.user!.subject)

  const level = parseInt(req.params.level, 10) || 1

  if (level < 1) throw new Error('Invalid level')

  const formatAgentDocument = (agent: DocumentType<AgentProfile>) =>
    instanceToPlain(agent.toJSON(), {
      groups: [ClassTransformerRoles.Referrer, ...(req.user!.roles ?? [])]
    })

  async function getSubordinates(agent: DocumentType<AgentProfile>, l: number): Promise<Record<string, any>[]> {
    const ss = await agent.getSubordinates()
    if (l === 1) {
      return ss.map(formatAgentDocument)
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
