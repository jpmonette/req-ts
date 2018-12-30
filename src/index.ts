import { REQRequestOptions, SearchOptions, REQSearchResponse } from "./typings";

const BASE_URL =
  "https://www.registreentreprises.gouv.qc.ca/RQAnonymeGR/GR/GR03/GR03A2_20A_PIU_RechEntMob_PC/ServiceCommunicationInterne.asmx";

const REFERER_URL =
  "https://www.registreentreprises.gouv.qc.ca/RQAnonymeGR/GR/GR03/GR03A2_20A_PIU_RechEntMob_PC/index.html";

export default class REQ {
  sessionKey: string | undefined;
  cookie: string | undefined;

  async getNEQ(neq: string) {
    let request = this.newRequest("POST", "/ObtenirEtatsRensEntreprise", {
      Id: neq,
    });
    return await this.do(request);
  }

  async search(options: SearchOptions): Promise<REQSearchResponse> {
    let request = this.newRequest("POST", "/ObtenirListeEntreprises", {
      Domaine: options.domain || null,
      Etendue: options.etendue || null,
      PageCourante: options.page || 0,
      Texte: options.keywords,
      Type: options.type || null,
      UtilisateurAccepteConditionsUtilisation: true,
    });
    return await this.do(request);
  }

  newRequest(method: string, url: string, criterias: REQRequestOptions): Request {
    const headers: Headers = new Headers();

    headers.set("Content-Type", "application/json; charset=UTF-8");
    headers.set("Referer", REFERER_URL);
    headers.set("User-Agent", "req");

    if (this.cookie) {
      headers.set("Cookie", this.cookie);
    }

    let body = {
      critere: {
        UtilisateurAccepteConditionsUtilisation: true,
        CleSession: this.sessionKey || null,
      },
    };

    Object.assign(body.critere, criterias);

    let request = new Request(BASE_URL + url, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    return request;
  }

  async do(request: Request) {
    let response: Response = await fetch(request);
    let body = await response.json();

    let cookieHeader = response.headers.get("set-cookie");
    this.cookie = cookieHeader ? cookieHeader.split(" ")[0] : undefined;
    this.sessionKey = body.d.CleSession;

    return body.d;
  }
}
