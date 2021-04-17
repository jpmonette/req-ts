import "isomorphic-fetch";
import REQ from "../";

const client = new REQ();

describe("REQ Search", () => {
  beforeEach(() => {
    client = new REQ();
  });

  it("should return 25 search results", async (done) => {
    const companies = await client.search({ keywords: "Bombardier" });
    expect(companies.ListeEntreprises.length).toBe(25);
    done();
  });

  it("should return 25 search results on second page", async (done) => {
    await client.search({ keywords: "Bombardier" });
    const companies = await client.search({ keywords: "Bombardier", page: 1 });
    expect(companies.ListeEntreprises.length).toBe(25);
    done();
  });
});

describe("REQ NEQ", () => {
  it("should return a company record", async (done) => {
    const company = await client.getNEQ("1143920115");
    expect(company.SectionInformationsGenerales.SousSecIdentification.NEQ).toBe("1143920115");
    done();
  });
});
