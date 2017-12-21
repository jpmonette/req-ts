import REQ from '../';

let client = new REQ();

describe('REQ Search', () => {

  beforeEach(() => {
    client = new REQ();
  })

  it('should return 25 search results', async () => {
    let companies = await client.search({ keywords: 'Bombardier' });
    expect(companies.ListeEntreprises.length).toBe(25);
  });

  it('should return 25 search results on second page', async () => {
    await client.search({ keywords: 'Bombardier' });
    let companies = await client.search({ keywords: 'Bombardier', page: 1 });
    expect(companies.ListeEntreprises.length).toBe(25);
  });

});

describe('REQ NEQ', () => {

  it('should return a company record', async () => {
    let company = await client.getNEQ('1143920115');
    expect(company.SectionInformationsGenerales.SousSecIdentification.NEQ).toBe('1143920115');
  });

});