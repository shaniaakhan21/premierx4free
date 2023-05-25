import { Roles } from '@helpers/access'
import ErrorHandler from '@helpers/errorHandler'
import { transactional } from '@helpers/global'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

import createContract from './create'
import deleteContract from './delete'
import getContacts from './get'
import searchContacts from './search'

const contractRouter = express.Router()

contractRouter.put('', AuthenticateToken([Roles.Admin]), ErrorHandler(transactional(createContract)))
contractRouter.patch('', AuthenticateToken([Roles.Admin]), ErrorHandler(transactional(createContract)))
contractRouter.get('', AuthenticateToken([Roles.Admin]), ErrorHandler(getContacts))
contractRouter.delete('', AuthenticateToken([Roles.Admin]), ErrorHandler(deleteContract))
contractRouter.get('/search/:limit?/:skip?', AuthenticateToken([Roles.Admin]), ErrorHandler(searchContacts))
export default contractRouter
