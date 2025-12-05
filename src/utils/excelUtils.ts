import * as XLSX from 'xlsx';
import type { CompanyInput, CompanyResult } from '../types';

function findCompanyNameColumn(row: Record<string, unknown>): string | null {
  const companyNameKeys = [
    'company name',
    'companyname',
    'company',
    'entreprise',
    'nom entreprise',
    'nom_entreprise',
    'societe',
    'société',
    'organization',
    'organisation',
  ];

  const keys = Object.keys(row).map(k => k.toLowerCase().trim());

  for (const companyKey of companyNameKeys) {
    const foundKey = keys.find(k => k === companyKey || k.includes(companyKey));
    if (foundKey) {
      const originalKey = Object.keys(row).find(k => k.toLowerCase().trim() === foundKey);
      if (originalKey) {
        return originalKey;
      }
    }
  }

  return null;
}

export function parseExcelFile(file: File): Promise<CompanyInput[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

        if (jsonData.length === 0) {
          resolve([]);
          return;
        }

        const firstRow = jsonData[0];
        const companyNameColumnKey = findCompanyNameColumn(firstRow);

        const companies: CompanyInput[] = jsonData
          .map((row) => {
            const firstValue = Object.values(row)[0];
            if (typeof firstValue === 'string' && firstValue.trim()) {
              const input = firstValue.trim();
              let companyName: string | undefined;

              if (companyNameColumnKey) {
                const companyValue = row[companyNameColumnKey];
                if (typeof companyValue === 'string' && companyValue.trim()) {
                  companyName = companyValue.trim();
                }
              }

              return { input, companyName };
            }
            return null;
          })
          .filter((item): item is CompanyInput => item !== null);

        console.log(`📊 Fichier parsé: ${companies.length} entrées, colonne entreprise: ${companyNameColumnKey ? 'Oui' : 'Non'}`);

        resolve(companies);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
    reader.readAsBinaryString(file);
  });
}

export function exportToExcel(results: CompanyResult[], fileName: string = 'entreprises_enrichies.xlsx') {
  const worksheet = XLSX.utils.json_to_sheet(
    results.map((result) => ({
      'Entrée Originale': result.entreeOriginale,
      'Type': result.typeEntree === 'email' ? 'Email' : 'Nom entreprise',
      'Domaine': result.domaine || '-',
      'Nom Entreprise': result.nomEntreprise,
      'SIREN': result.siren,
      'SIRET': result.siret,
      'Code NAF/APE': result.activitePrincipale,
      'Industrie': result.industrie,
      'Industrie (Libellé)': result.libelleActivitePrincipale,
      'Adresse Postale': result.adressePostale,
      'Ville': result.ville,
      'Code Postal': result.codePostal,
      'Région': result.region,
      'Effectif Salarié': result.effectif,
      'Lien Annuaire': result.lienAnnuaire,
      'Statut': result.status === 'success' ? 'Trouvé' : result.status === 'not_found' ? 'Non trouvé' : 'Erreur',
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Entreprises');

  XLSX.writeFile(workbook, fileName);
}
