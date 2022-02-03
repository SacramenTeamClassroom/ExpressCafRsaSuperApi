import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export BasRevenue, { schema } from './model'

const router = new Router()
const { codeInsee, AllocatairesRessortissants, PersonnesBasRevenus } = schema.tree

/**
 * @api {post} /basRevenues Create bas revenue
 * @apiName CreateBasRevenue
 * @apiGroup BasRevenue
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam codeInsee Bas revenue's codeInsee.
 * @apiParam AllocatairesRessortissants Bas revenue's AllocatairesRessortissants.
 * @apiParam PersonnesBasRevenus Bas revenue's PersonnesBasRevenus.
 * @apiSuccess {Object} basRevenue Bas revenue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bas revenue not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ codeInsee, AllocatairesRessortissants, PersonnesBasRevenus }),
  create)

/**
 * @api {get} /basRevenues Retrieve bas revenues
 * @apiName RetrieveBasRevenues
 * @apiGroup BasRevenue
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of bas revenues.
 * @apiSuccess {Object[]} rows List of bas revenues.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /basRevenues/:id Retrieve bas revenue
 * @apiName RetrieveBasRevenue
 * @apiGroup BasRevenue
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} basRevenue Bas revenue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bas revenue not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /basRevenues/:id Update bas revenue
 * @apiName UpdateBasRevenue
 * @apiGroup BasRevenue
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam codeInsee Bas revenue's codeInsee.
 * @apiParam AllocatairesRessortissants Bas revenue's AllocatairesRessortissants.
 * @apiParam PersonnesBasRevenus Bas revenue's PersonnesBasRevenus.
 * @apiSuccess {Object} basRevenue Bas revenue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bas revenue not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ codeInsee, AllocatairesRessortissants, PersonnesBasRevenus }),
  update)

/**
 * @api {delete} /basRevenues/:id Delete bas revenue
 * @apiName DeleteBasRevenue
 * @apiGroup BasRevenue
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Bas revenue not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
