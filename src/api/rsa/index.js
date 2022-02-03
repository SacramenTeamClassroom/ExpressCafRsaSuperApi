import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Rsa, { schema } from './model'

const router = new Router()
const { codeInsee, commune, nbAllocataires } = schema.tree

/**
 * @api {post} /rsa Create rsa
 * @apiName CreateRsa
 * @apiGroup Rsa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam codeInsee Rsa's codeInsee.
 * @apiParam commune Rsa's commune.
 * @apiParam nbAllocataires Rsa's nbAllocataires.
 * @apiSuccess {Object} rsa Rsa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rsa not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ codeInsee, commune, nbAllocataires }),
  create)

/**
 * @api {get} /rsa Retrieve rsas
 * @apiName RetrieveRsas
 * @apiGroup Rsa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of rsas.
 * @apiSuccess {Object[]} rows List of rsas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /rsa/:id Retrieve rsa
 * @apiName RetrieveRsa
 * @apiGroup Rsa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} rsa Rsa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rsa not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /rsa/:id Update rsa
 * @apiName UpdateRsa
 * @apiGroup Rsa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam codeInsee Rsa's codeInsee.
 * @apiParam commune Rsa's commune.
 * @apiParam nbAllocataires Rsa's nbAllocataires.
 * @apiSuccess {Object} rsa Rsa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rsa not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ codeInsee, commune, nbAllocataires }),
  update)

/**
 * @api {delete} /rsa/:id Delete rsa
 * @apiName DeleteRsa
 * @apiGroup Rsa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Rsa not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
