import { useState } from 'react';
import { Download, Building2 } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { LeadInput } from './components/EmailInput';
import { ResultsTable } from './components/ResultsTable';
import { searchCompanyByInput } from './services/apiService';
import { exportToExcel } from './utils/excelUtils';
import type { CompanyInput, CompanyResult } from './types';

function App() {
  const [results, setResults] = useState<CompanyResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const handleFileLoaded = async (companies: CompanyInput[]) => {
    setIsProcessing(true);
    setProgress({ current: 0, total: companies.length });
    setResults([]);

    try {
      const searchResults: CompanyResult[] = [];

      for (let i = 0; i < companies.length; i++) {
        const companyInput = companies[i];
        const result = await searchCompanyByInput(companyInput);
        searchResults.push(result);

        setProgress({ current: i + 1, total: companies.length });
        setResults([...searchResults]);

        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error('Erreur lors du traitement:', error);
      alert('Une erreur est survenue lors du traitement des entreprises.');
    } finally {
      setIsProcessing(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  const handleExport = () => {
    if (results.length > 0) {
      exportToExcel(results);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="w-12 h-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">
                Enrichissement Entreprises
              </h1>
            </div>
            <p className="text-lg text-gray-600">
              Importez un fichier Excel ou saisissez emails et noms d'entreprises pour enrichir vos données
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Import Excel</h2>
              <FileUpload onFileLoaded={handleFileLoaded} isProcessing={isProcessing} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Copier-Coller</h2>
              <LeadInput onLeadsSubmitted={handleFileLoaded} isProcessing={isProcessing} />
            </div>
          </div>

          {isProcessing && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Traitement en cours...
                </span>
                <span className="text-sm text-gray-600">
                  {progress.current} / {progress.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {!isProcessing && results.length === 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-blue-800">
                Importez un fichier Excel ou saisissez vos emails / noms d'entreprises pour commencer l'enrichissement
              </p>
            </div>
          )}


          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Résultats ({results.length} entreprise{results.length > 1 ? 's' : ''})
                </h2>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Exporter en Excel
                </button>
              </div>

              <ResultsTable results={results} />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2">Statistiques</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700">Trouvées: </span>
                        <span className="font-semibold text-blue-900">
                          {results.filter(r => r.status === 'success').length}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-700">Non trouvées: </span>
                        <span className="font-semibold text-blue-900">
                          {results.filter(r => r.status === 'not_found').length}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-700">Erreurs: </span>
                        <span className="font-semibold text-blue-900">
                          {results.filter(r => r.status === 'error').length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
