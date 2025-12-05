import { ExternalLink, CheckCircle, XCircle, AlertCircle, Mail, Building } from 'lucide-react';
import type { CompanyResult } from '../types';

interface ResultsTableProps {
  results: CompanyResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  if (results.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full min-w-max">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Statut
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Entrée
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Nom Entreprise
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Industrie
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Adresse
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Région
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Effectif
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Lien Annuaire
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-4 whitespace-nowrap">
                {result.status === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {result.status === 'not_found' && (
                  <XCircle className="w-5 h-5 text-orange-500" />
                )}
                {result.status === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                <div className="flex items-center gap-2">
                  {result.typeEntree === 'email' ? (
                    <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  ) : (
                    <Building className="w-4 h-4 text-green-500 flex-shrink-0" />
                  )}
                  <span className="truncate" title={result.entreeOriginale}>
                    {result.entreeOriginale}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                {result.nomEntreprise || '-'}
              </td>
              <td className="px-4 py-4 text-sm max-w-xs">
                {result.industrie ? (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    result.industrie === 'To be qualified'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {result.industrie}
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 max-w-md">
                {result.adressePostale || '-'}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                {result.region || '-'}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                {result.effectif || '-'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                {result.lienAnnuaire && result.status === 'success' ? (
                  <a
                    href={result.lienAnnuaire}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="mr-1">Voir</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
