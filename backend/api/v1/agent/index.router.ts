import { Roles } from '@helpers/access'
import ErrorHandler from '@helpers/errorHandler'
import { transactional } from '@helpers/global'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

import get from './get'
import getProfile from './getProfile'
import searchAgents from './search'
import update from './update'

const agentRouter = express.Router()

agentRouter.get('/search/:limit?/:skip?', AuthenticateToken([Roles.Admin]), ErrorHandler(searchAgents))
agentRouter.get('/:id', AuthenticateToken([Roles.Admin, Roles.Agent]), ErrorHandler(get))
agentRouter.patch('/', AuthenticateToken([Roles.Admin]), ErrorHandler(transactional(update)))
agentRouter.get('/profile/:id', AuthenticateToken([Roles.Admin, Roles.Agent]), ErrorHandler(getProfile))

export default agentRouter
