export type Industry =
  | 'Agriculture / Livestock / Seafood'
  | 'Banking'
  | 'Chemicals'
  | 'Communication / Media & Entertainment / Telecom'
  | 'Construction'
  | 'Consulting / IT Services'
  | 'CPG (Consumer Packaged Goods)'
  | 'Education'
  | 'Energy / Utilities'
  | 'Finance / Real Estate'
  | 'Food / Beverages'
  | 'Healthcare / Medical Services'
  | 'Hotels / Restaurants'
  | 'Insurance / Mutual Health Insurance'
  | 'Luxury'
  | 'Manufacturing / Industry'
  | 'Not For Profit'
  | 'Pharmaceutics'
  | 'Public administration & government'
  | 'Retail'
  | 'Tech / Software'
  | 'Transportation, Logistics & Storage'
  | 'To be qualified';

interface NafMapping {
  industry: Industry;
  description: string;
}

const NAF_DIVISION_MAP: Record<string, NafMapping> = {
  '01': { industry: 'Agriculture / Livestock / Seafood', description: 'Culture et production animale' },
  '02': { industry: 'Agriculture / Livestock / Seafood', description: 'Sylviculture et exploitation forestière' },
  '03': { industry: 'Agriculture / Livestock / Seafood', description: 'Pêche et aquaculture' },

  '05': { industry: 'Energy / Utilities', description: 'Extraction de houille et de lignite' },
  '06': { industry: 'Energy / Utilities', description: 'Extraction d\'hydrocarbures' },
  '07': { industry: 'Manufacturing / Industry', description: 'Extraction de minerais métalliques' },
  '08': { industry: 'Manufacturing / Industry', description: 'Autres industries extractives' },
  '09': { industry: 'Manufacturing / Industry', description: 'Services de soutien aux industries extractives' },

  '10': { industry: 'Food / Beverages', description: 'Industries alimentaires' },
  '11': { industry: 'Food / Beverages', description: 'Fabrication de boissons' },
  '12': { industry: 'CPG (Consumer Packaged Goods)', description: 'Fabrication de produits à base de tabac' },
  '13': { industry: 'Manufacturing / Industry', description: 'Fabrication de textiles' },
  '14': { industry: 'Manufacturing / Industry', description: 'Industrie de l\'habillement' },
  '15': { industry: 'Luxury', description: 'Industrie du cuir et de la chaussure' },
  '16': { industry: 'Manufacturing / Industry', description: 'Travail du bois' },
  '17': { industry: 'Manufacturing / Industry', description: 'Industrie du papier et du carton' },
  '18': { industry: 'Manufacturing / Industry', description: 'Imprimerie et reproduction' },
  '19': { industry: 'Energy / Utilities', description: 'Cokéfaction et raffinage' },
  '20': { industry: 'Chemicals', description: 'Industrie chimique' },
  '21': { industry: 'Pharmaceutics', description: 'Industrie pharmaceutique' },
  '22': { industry: 'Manufacturing / Industry', description: 'Fabrication de produits en caoutchouc et en plastique' },
  '23': { industry: 'Manufacturing / Industry', description: 'Fabrication d\'autres produits minéraux non métalliques' },
  '24': { industry: 'Manufacturing / Industry', description: 'Métallurgie' },
  '25': { industry: 'Manufacturing / Industry', description: 'Fabrication de produits métalliques' },
  '26': { industry: 'Tech / Software', description: 'Fabrication de produits informatiques, électroniques et optiques' },
  '27': { industry: 'Manufacturing / Industry', description: 'Fabrication d\'équipements électriques' },
  '28': { industry: 'Manufacturing / Industry', description: 'Fabrication de machines et équipements' },
  '29': { industry: 'Manufacturing / Industry', description: 'Industrie automobile' },
  '30': { industry: 'Manufacturing / Industry', description: 'Fabrication d\'autres matériels de transport' },
  '31': { industry: 'Manufacturing / Industry', description: 'Fabrication de meubles' },
  '32': { industry: 'CPG (Consumer Packaged Goods)', description: 'Autres industries manufacturières' },
  '33': { industry: 'Manufacturing / Industry', description: 'Réparation et installation de machines et d\'équipements' },

  '35': { industry: 'Energy / Utilities', description: 'Production et distribution d\'électricité, de gaz' },
  '36': { industry: 'Energy / Utilities', description: 'Captage, traitement et distribution d\'eau' },
  '37': { industry: 'Energy / Utilities', description: 'Collecte et traitement des eaux usées' },
  '38': { industry: 'Energy / Utilities', description: 'Collecte, traitement et élimination des déchets' },
  '39': { industry: 'Energy / Utilities', description: 'Dépollution et autres services de gestion des déchets' },

  '41': { industry: 'Construction', description: 'Construction de bâtiments' },
  '42': { industry: 'Construction', description: 'Génie civil' },
  '43': { industry: 'Construction', description: 'Travaux de construction spécialisés' },

  '45': { industry: 'Retail', description: 'Commerce et réparation d\'automobiles et de motocycles' },
  '46': { industry: 'Retail', description: 'Commerce de gros' },
  '47': { industry: 'Retail', description: 'Commerce de détail' },

  '49': { industry: 'Transportation, Logistics & Storage', description: 'Transports terrestres et transport par conduites' },
  '50': { industry: 'Transportation, Logistics & Storage', description: 'Transports par eau' },
  '51': { industry: 'Transportation, Logistics & Storage', description: 'Transports aériens' },
  '52': { industry: 'Transportation, Logistics & Storage', description: 'Entreposage et services auxiliaires des transports' },
  '53': { industry: 'Transportation, Logistics & Storage', description: 'Activités de poste et de courrier' },

  '55': { industry: 'Hotels / Restaurants', description: 'Hébergement' },
  '56': { industry: 'Hotels / Restaurants', description: 'Restauration' },

  '58': { industry: 'Communication / Media & Entertainment / Telecom', description: 'Édition' },
  '59': { industry: 'Communication / Media & Entertainment / Telecom', description: 'Production de films cinématographiques, vidéo et programmes de télévision' },
  '60': { industry: 'Communication / Media & Entertainment / Telecom', description: 'Programmation et diffusion' },
  '61': { industry: 'Communication / Media & Entertainment / Telecom', description: 'Télécommunications' },
  '62': { industry: 'Tech / Software', description: 'Programmation, conseil et autres activités informatiques' },
  '63': { industry: 'Tech / Software', description: 'Services d\'information' },

  '64': { industry: 'Banking', description: 'Activités des services financiers' },
  '65': { industry: 'Insurance / Mutual Health Insurance', description: 'Assurance' },
  '66': { industry: 'Finance / Real Estate', description: 'Activités auxiliaires de services financiers et d\'assurance' },

  '68': { industry: 'Finance / Real Estate', description: 'Activités immobilières' },

  '69': { industry: 'Consulting / IT Services', description: 'Activités juridiques et comptables' },
  '70': { industry: 'Consulting / IT Services', description: 'Activités des sièges sociaux ; conseil de gestion' },
  '71': { industry: 'Consulting / IT Services', description: 'Activités d\'architecture et d\'ingénierie' },
  '72': { industry: 'Tech / Software', description: 'Recherche-développement scientifique' },
  '73': { industry: 'Communication / Media & Entertainment / Telecom', description: 'Publicité et études de marché' },
  '74': { industry: 'Consulting / IT Services', description: 'Autres activités spécialisées, scientifiques et techniques' },
  '75': { industry: 'Consulting / IT Services', description: 'Activités vétérinaires' },

  '77': { industry: 'Manufacturing / Industry', description: 'Activités de location et location-bail' },
  '78': { industry: 'Consulting / IT Services', description: 'Activités liées à l\'emploi' },
  '79': { industry: 'Hotels / Restaurants', description: 'Activités des agences de voyage' },
  '80': { industry: 'Consulting / IT Services', description: 'Enquêtes et sécurité' },
  '81': { industry: 'Consulting / IT Services', description: 'Services relatifs aux bâtiments' },
  '82': { industry: 'Consulting / IT Services', description: 'Activités administratives et autres activités de soutien aux entreprises' },

  '84': { industry: 'Public administration & government', description: 'Administration publique' },

  '85': { industry: 'Education', description: 'Enseignement' },

  '86': { industry: 'Healthcare / Medical Services', description: 'Activités pour la santé humaine' },
  '87': { industry: 'Healthcare / Medical Services', description: 'Hébergement médico-social et social' },
  '88': { industry: 'Healthcare / Medical Services', description: 'Action sociale sans hébergement' },

  '90': { industry: 'Communication / Media & Entertainment / Telecom', description: 'Activités créatives, artistiques et de spectacle' },
  '91': { industry: 'Communication / Media & Entertainment / Telecom', description: 'Bibliothèques, archives, musées' },
  '92': { industry: 'Communication / Media & Entertainment / Telecom', description: 'Organisation de jeux de hasard et d\'argent' },
  '93': { industry: 'Communication / Media & Entertainment / Telecom', description: 'Activités sportives, récréatives et de loisirs' },

  '94': { industry: 'Not For Profit', description: 'Activités des organisations associatives' },
  '95': { industry: 'Retail', description: 'Réparation d\'ordinateurs et de biens personnels' },
  '96': { industry: 'Consulting / IT Services', description: 'Autres services personnels' },

  '97': { industry: 'Consulting / IT Services', description: 'Activités des ménages en tant qu\'employeurs' },
  '98': { industry: 'To be qualified', description: 'Activités indifférenciées des ménages' },
  '99': { industry: 'Public administration & government', description: 'Activités des organisations et organismes extraterritoriaux' },
};

export function mapNafToIndustry(nafCode: string): Industry {
  if (!nafCode || nafCode.trim() === '') {
    return 'To be qualified';
  }

  const cleanCode = nafCode.trim().replace(/\./g, '');

  const division = cleanCode.substring(0, 2);

  const mapping = NAF_DIVISION_MAP[division];

  if (mapping) {
    console.log(`📊 Code NAF ${nafCode} (division ${division}) → ${mapping.industry}`);
    return mapping.industry;
  }

  console.log(`⚠️ Code NAF ${nafCode} non mappé → To be qualified`);
  return 'To be qualified';
}

export function getIndustryDescription(nafCode: string): string {
  if (!nafCode || nafCode.trim() === '') {
    return '';
  }

  const cleanCode = nafCode.trim().replace(/\./g, '');
  const division = cleanCode.substring(0, 2);
  const mapping = NAF_DIVISION_MAP[division];

  return mapping ? mapping.description : '';
}
