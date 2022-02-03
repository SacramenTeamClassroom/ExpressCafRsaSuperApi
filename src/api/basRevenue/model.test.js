import { BasRevenue } from '.'

let basRevenue

beforeEach(async () => {
  basRevenue = await BasRevenue.create({ codeInsee: 'test', AllocatairesRessortissants: 'test', PersonnesBasRevenus: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = basRevenue.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(basRevenue.id)
    expect(view.codeInsee).toBe(basRevenue.codeInsee)
    expect(view.AllocatairesRessortissants).toBe(basRevenue.AllocatairesRessortissants)
    expect(view.PersonnesBasRevenus).toBe(basRevenue.PersonnesBasRevenus)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = basRevenue.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(basRevenue.id)
    expect(view.codeInsee).toBe(basRevenue.codeInsee)
    expect(view.AllocatairesRessortissants).toBe(basRevenue.AllocatairesRessortissants)
    expect(view.PersonnesBasRevenus).toBe(basRevenue.PersonnesBasRevenus)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
