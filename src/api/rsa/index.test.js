import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Rsa } from '.'

const app = () => express(apiRoot, routes)

let userSession, rsa

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  rsa = await Rsa.create({})
})

test('POST /rsa 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, codeInsee: 'test', commune: 'test', nbAllocataires: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.codeInsee).toEqual('test')
  expect(body.commune).toEqual('test')
  expect(body.nbAllocataires).toEqual('test')
})

test('POST /rsa 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rsa 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /rsa 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rsa/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${rsa.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(rsa.id)
})

test('GET /rsa/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${rsa.id}`)
  expect(status).toBe(401)
})

test('GET /rsa/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /rsa/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${rsa.id}`)
    .send({ access_token: userSession, codeInsee: 'test', commune: 'test', nbAllocataires: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(rsa.id)
  expect(body.codeInsee).toEqual('test')
  expect(body.commune).toEqual('test')
  expect(body.nbAllocataires).toEqual('test')
})

test('PUT /rsa/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${rsa.id}`)
  expect(status).toBe(401)
})

test('PUT /rsa/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, codeInsee: 'test', commune: 'test', nbAllocataires: 'test' })
  expect(status).toBe(404)
})

test('DELETE /rsa/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${rsa.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /rsa/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${rsa.id}`)
  expect(status).toBe(401)
})

test('DELETE /rsa/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
