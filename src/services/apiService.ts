import type { ApiCompanyResponse, CompanyResult, CompanyInput } from '../types';
import { analyzeInput, extractCompanyNameFromDomain, extractDomainFromEmail, isPersonalEmailDomain } from '../utils/emailUtils';
import { getRegionFromPostalCode } from '../utils/regionUtils';
import { mapNafToIndustry } from '../utils/industryUtils';

const API_BASE_URL = 'https://recherche-entreprises.api.gouv.fr';

const EFFECTIF_MAP: Record<string, string> = {
  '00': 'Non renseigné',
  '01': '1 ou 2 salariés',
  '02': '3 à 5 salariés',
  '03': '6 à 9 salariés',
  '11': '10 à 19 salariés',
  '12': '20 à 49 salariés',
  '21': '50 à 99 salariés',
  '22': '100 à 199 salariés',
  '31': '200 à 249 salariés',
  '32': '250 à 499 salariés',
  '41': '500 à 999 salariés',
  '42': '1000 à 1999 salariés',
  '51': '2000 à 4999 salariés',
  '52': '5000 à 9999 salariés',
  '53': '10000 salariés et plus',
  'NN': 'Non renseigné',
};

function formatEffectif(trancheEffectif?: string): string {
  if (!trancheEffectif) return 'Non renseigné';
  return EFFECTIF_MAP[trancheEffectif] || trancheEffectif;
}

function formatAddress(siege: any): string {
  const parts: string[] = [];

  if (siege.numero_voie) parts.push(siege.numero_voie);
  if (siege.type_voie) parts.push(siege.type_voie);
  if (siege.libelle_voie) parts.push(siege.libelle_voie);
  if (siege.complement_adresse) parts.push(siege.complement_adresse);

  const addressLine = parts.join(' ').trim();

  if (addressLine && siege.code_postal && (siege.ville || siege.libelle_commune)) {
    return `${addressLine}, ${siege.code_postal} ${siege.ville || siege.libelle_commune}`;
  } else if (siege.code_postal && (siege.ville || siege.libelle_commune)) {
    return `${siege.code_postal} ${siege.ville || siege.libelle_commune}`;
  }

  return addressLine || '';
}

async function searchAPI(searchTerm: string): Promise<ApiCompanyResponse | null> {
  try {
    console.log(`🔍 Recherche API avec: "${searchTerm}"`);
    const response = await fetch(
      `${API_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}&page=1&per_page=1`
    );

    if (!response.ok) {
      console.log(`❌ Erreur API: ${response.status}`);
      return null;
    }

    const data: ApiCompanyResponse = await response.json();
    console.log(`✅ Résultats trouvés: ${data.total_results}`);
    return data;
  } catch (error) {
    console.error('❌ Erreur lors de la recherche:', error);
    return null;
  }
}

export async function searchCompanyByInput(companyInput: CompanyInput): Promise<CompanyResult> {
  const { input, companyName: providedCompanyName } = companyInput;
  const analysis = analyzeInput(input);
  const { type, searchTerm, originalInput } = analysis;

  console.log(`\n🚀 Recherche pour: "${originalInput}" (type: ${type})`);

  if (type === 'email') {
    const domain = extractDomainFromEmail(originalInput);
    if (isPersonalEmailDomain(domain)) {
      console.log(`📧 Email personnel détecté (${domain})`);

      if (!providedCompanyName || !providedCompanyName.trim()) {
        console.log(`⚠️ Aucun nom d'entreprise fourni pour l'email personnel - retour de résultat vide`);
        return {
          entreeOriginale: originalInput,
          typeEntree: type,
          domaine: domain,
          nomEntreprise: '',
          siren: '',
          siret: '',
          activitePrincipale: '',
          libelleActivitePrincipale: '',
          industrie: '',
          adressePostale: '',
          codePostal: '',
          ville: '',
          region: '',
          effectif: '',
          lienAnnuaire: '',
          status: 'not_found',
          errorMessage: 'Email personnel sans nom d\'entreprise',
        };
      }

      console.log(`✅ Nom d'entreprise fourni: "${providedCompanyName}" - recherche en cours`);
    }
  }

  try {
    let data: ApiCompanyResponse | null = null;
    let finalSearchTerm = searchTerm;

    if (type === 'email' && providedCompanyName && providedCompanyName.trim()) {
      console.log(`🔍 Recherche avec le nom d'entreprise fourni: "${providedCompanyName}"`);
      data = await searchAPI(providedCompanyName);
      finalSearchTerm = providedCompanyName;
    } else {
      data = await searchAPI(searchTerm);

      if (type === 'email' && (!data || data.total_results === 0)) {
        const companyName = extractCompanyNameFromDomain(searchTerm);
        console.log(`🔄 Tentative de fallback avec le nom extrait: "${companyName}"`);

        const fallbackData = await searchAPI(companyName);
        if (fallbackData && fallbackData.total_results > 0) {
          data = fallbackData;
          finalSearchTerm = companyName;
          console.log(`✨ Succès avec le fallback!`);
        }
      }
    }

    if (!data) {
      return {
        entreeOriginale: originalInput,
        typeEntree: type,
        domaine: type === 'email' ? searchTerm : '',
        nomEntreprise: '',
        siren: '',
        siret: '',
        activitePrincipale: '',
        libelleActivitePrincipale: '',
        industrie: 'To be qualified',
        adressePostale: '',
        codePostal: '',
        ville: '',
        region: '',
        effectif: '',
        lienAnnuaire: '',
        status: 'error',
        errorMessage: 'Erreur lors de la requête API',
      };
    }

    if (data.total_results === 0 || !data.results || data.results.length === 0) {
      return {
        entreeOriginale: originalInput,
        typeEntree: type,
        domaine: type === 'email' ? searchTerm : '',
        nomEntreprise: '',
        siren: '',
        siret: '',
        activitePrincipale: '',
        libelleActivitePrincipale: '',
        industrie: 'To be qualified',
        adressePostale: '',
        codePostal: '',
        ville: '',
        region: '',
        effectif: '',
        lienAnnuaire: '',
        status: 'not_found',
        errorMessage: 'Entreprise non trouvée',
      };
    }

    const company = data.results[0];
    const siren = company.siren;
    const siege = company.siege;
    const codePostal = siege?.code_postal || '';
    const ville = siege?.ville || siege?.libelle_commune || '';
    const region = getRegionFromPostalCode(codePostal);
    const adressePostale = formatAddress(siege);
    const activitePrincipale = siege?.activite_principale || '';
    const industrie = mapNafToIndustry(activitePrincipale);

    console.log(`🎉 Entreprise trouvée: ${company.nom_complet || company.nom_raison_sociale}`);

    return {
      entreeOriginale: originalInput,
      typeEntree: type,
      domaine: type === 'email' ? searchTerm : '',
      nomEntreprise: company.nom_complet || company.nom_raison_sociale || '',
      siren: siren,
      siret: siege?.siret || '',
      activitePrincipale,
      libelleActivitePrincipale: siege?.libelle_activite_principale || '',
      industrie,
      adressePostale,
      codePostal,
      ville,
      region,
      effectif: formatEffectif(company.tranche_effectif_salarie),
      lienAnnuaire: `https://annuaire-entreprises.data.gouv.fr/entreprise/${siren}`,
      status: 'success',
    };
  } catch (error) {
    console.error('❌ Erreur globale:', error);
    return {
      entreeOriginale: originalInput,
      typeEntree: type,
      domaine: type === 'email' ? searchTerm : '',
      nomEntreprise: '',
      siren: '',
      siret: '',
      activitePrincipale: '',
      libelleActivitePrincipale: '',
      industrie: 'To be qualified',
      adressePostale: '',
      codePostal: '',
      ville: '',
      region: '',
      effectif: '',
      lienAnnuaire: '',
      status: 'error',
      errorMessage: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}
