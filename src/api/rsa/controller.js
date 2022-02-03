import { success, notFound } from '../../services/response/'
import { Rsa } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Rsa.create(body)
    .then((rsa) => rsa.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Rsa.count(query)
    .then(count => Rsa.find(query, select, cursor)
      .then((rsas) => ({
        count,
        rows: rsas.map((rsa) => rsa.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Rsa.findById(params.id)
    .then(notFound(res))
    .then((rsa) => rsa ? rsa.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Rsa.findById(params.id)
    .then(notFound(res))
    .then((rsa) => rsa ? Object.assign(rsa, body).save() : null)
    .then((rsa) => rsa ? rsa.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Rsa.findById(params.id)
    .then(notFound(res))
    .then((rsa) => rsa ? rsa.remove() : null)
    .then(success(res, 204))
    .catch(next)
