export interface CompanyInput {
  input: string;
  companyName?: string;
}

export interface CompanyResult {
  entreeOriginale: string;
  typeEntree: 'email' | 'company_name';
  domaine: string;
  nomEntreprise: string;
  siren: string;
  siret: string;
  activitePrincipale: string;
  libelleActivitePrincipale: string;
  industrie: string;
  adressePostale: string;
  codePostal: string;
  ville: string;
  region: string;
  effectif: string;
  lienAnnuaire: string;
  status: 'success' | 'error' | 'not_found';
  errorMessage?: string;
}

export interface ApiCompanyResponse {
  results: Array<{
    nom_complet: string;
    nom_raison_sociale: string;
    siren: string;
    siege: {
      siret: string;
      activite_principale: string;
      libelle_activite_principale: string;
      code_postal?: string;
      ville?: string;
      libelle_commune?: string;
      adresse?: string;
      complement_adresse?: string;
      numero_voie?: string;
      type_voie?: string;
      libelle_voie?: string;
    };
    tranche_effectif_salarie?: string;
    nombre_etablissements?: number;
  }>;
  total_results: number;
}
