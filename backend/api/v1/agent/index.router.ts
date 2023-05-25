import { Roles } from '@helpers/access'
import ErrorHandler from '@helpers/errorHandler'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

import get from './get'
import getAll from './getAllAgents'

const agentRouter = express.Router()

agentRouter.get('/:id', AuthenticateToken([Roles.Admin, Roles.Agent]), ErrorHandler(get))
agentRouter.get('/data/getAll', AuthenticateToken([Roles.Admin, Roles.Agent]), ErrorHandler(getAll))

export default agentRouter
