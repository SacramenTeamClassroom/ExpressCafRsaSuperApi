import { success, notFound } from '../../services/response/'
import { BasRevenue } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  BasRevenue.create(body)
    .then((basRevenue) => basRevenue.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  BasRevenue.count(query)
    .then(count => BasRevenue.find(query, select, cursor)
      .then((basRevenues) => ({
        count,
        rows: basRevenues.map((basRevenue) => basRevenue.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  BasRevenue.findById(params.id)
    .then(notFound(res))
    .then((basRevenue) => basRevenue ? basRevenue.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  BasRevenue.findById(params.id)
    .then(notFound(res))
    .then((basRevenue) => basRevenue ? Object.assign(basRevenue, body).save() : null)
    .then((basRevenue) => basRevenue ? basRevenue.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  BasRevenue.findById(params.id)
    .then(notFound(res))
    .then((basRevenue) => basRevenue ? basRevenue.remove() : null)
    .then(success(res, 204))
    .catch(next)
