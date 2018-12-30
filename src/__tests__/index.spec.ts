import "isomorphic-fetch";
import REQ from "../";

let client = new REQ();

describe("REQ Search", () => {
  beforeEach(() => {
    client = new REQ();
  });

  it("should return 25 search results", async (done) => {
    let companies = await client.search({ keywords: "Bombardier" });
    expect(companies.ListeEntreprises.length).toBe(25);
    done();
  });

  it("should return 25 search results on second page", async (done) => {
    await client.search({ keywords: "Bombardier" });
    let companies = await client.search({ keywords: "Bombardier", page: 1 });
    expect(companies.ListeEntreprises.length).toBe(25);
    done();
  });
});

describe("REQ NEQ", () => {
  it("should return a company record", async (done) => {
    let company = await client.getNEQ("1143920115");
    expect(company.SectionInformationsGenerales.SousSecIdentification.NEQ).toBe("1143920115");
    done();
  });
});
