import { Roles } from '@helpers/access'
import ErrorHandler from '@helpers/errorHandler'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

import get from './get'
import getAll from './getAllAgents'
import getProfile from './getProfile'
import searchAgents from './search'

const agentRouter = express.Router()

agentRouter.get('/search/:limit?/:skip?', AuthenticateToken([Roles.Admin]), ErrorHandler(searchAgents))
agentRouter.get('/:id', AuthenticateToken([Roles.Admin, Roles.Agent]), ErrorHandler(get))
agentRouter.get('/data/getAll', AuthenticateToken([Roles.Admin, Roles.Agent]), ErrorHandler(getAll))
agentRouter.get('/profile/:id', AuthenticateToken([Roles.Admin, Roles.Agent]), ErrorHandler(getProfile))

export default agentRouter
