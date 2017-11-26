declare module 'req' {

  export interface ListeEntreprises {
    ID: string;
    NumeroDossier: string;
    Nom: string;
    AdressePrimaire: string;
    Statut: string;
    DateChangementEtat: string;
    StatutDuNom: string;
    DateInitiale: string;
    DateFinale: string;
  }

  export interface REQSearchResponse {
    PageCourante: number;
    NombrePages: number;
    ListeEntreprises: Array<ListeEntreprises>;
    TotalEnregistrements: number;
    CleSession: string;
    TypeResultat: string;
    Message: string;
  }

  export interface REQRequest {
    critere: REQRequestOptions;
  }

  export interface REQRequestOptions {
    CleSession?: string;
    Domaine?: number | null;
    Etendue?: number | null;
    Id?: string;
    PageCourante?: number;
    Texte?: string;
    Type?: number | null;
    UtilisateurAccepteConditionsUtilisation?: boolean;
  }

  export interface SearchOptions {
    domain?: number;
    type?: number;
    etendue?: number;
    page?: number;
    keywords: string;
  }
}
