import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { BasRevenue } from '.'

const app = () => express(apiRoot, routes)

let userSession, basRevenue

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  basRevenue = await BasRevenue.create({})
})

test('POST /basRevenues 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, codeInsee: 'test', AllocatairesRessortissants: 'test', PersonnesBasRevenus: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.codeInsee).toEqual('test')
  expect(body.AllocatairesRessortissants).toEqual('test')
  expect(body.PersonnesBasRevenus).toEqual('test')
})

test('POST /basRevenues 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /basRevenues 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /basRevenues 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /basRevenues/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${basRevenue.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(basRevenue.id)
})

test('GET /basRevenues/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${basRevenue.id}`)
  expect(status).toBe(401)
})

test('GET /basRevenues/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /basRevenues/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${basRevenue.id}`)
    .send({ access_token: userSession, codeInsee: 'test', AllocatairesRessortissants: 'test', PersonnesBasRevenus: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(basRevenue.id)
  expect(body.codeInsee).toEqual('test')
  expect(body.AllocatairesRessortissants).toEqual('test')
  expect(body.PersonnesBasRevenus).toEqual('test')
})

test('PUT /basRevenues/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${basRevenue.id}`)
  expect(status).toBe(401)
})

test('PUT /basRevenues/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, codeInsee: 'test', AllocatairesRessortissants: 'test', PersonnesBasRevenus: 'test' })
  expect(status).toBe(404)
})

// test('DELETE /basRevenues/:id 204 (user)', async () => {
//   const { status } = await request(app())
//     .delete(`${apiRoot}/${basRevenue.id}`)
//     .query({ access_token: userSession })
//   expect(status).toBe(204)
// })

// test('DELETE /basRevenues/:id 401', async () => {
//   const { status } = await request(app())
//     .delete(`${apiRoot}/${basRevenue.id}`)
//   expect(status).toBe(401)
// })

test('DELETE /basRevenues/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
