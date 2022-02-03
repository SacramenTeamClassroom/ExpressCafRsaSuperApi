import { Rsa } from '.'

let rsa

beforeEach(async () => {
  rsa = await Rsa.create({ codeInsee: 'test', commune: 'test', nbAllocataires: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = rsa.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rsa.id)
    expect(view.codeInsee).toBe(rsa.codeInsee)
    expect(view.commune).toBe(rsa.commune)
    expect(view.nbAllocataires).toBe(rsa.nbAllocataires)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = rsa.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rsa.id)
    expect(view.codeInsee).toBe(rsa.codeInsee)
    expect(view.commune).toBe(rsa.commune)
    expect(view.nbAllocataires).toBe(rsa.nbAllocataires)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
