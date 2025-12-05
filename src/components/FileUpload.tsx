import { Upload } from 'lucide-react';
import type { CompanyInput } from '../types';
import { parseExcelFile } from '../utils/excelUtils';

interface FileUploadProps {
  onFileLoaded: (companies: CompanyInput[]) => void;
  isProcessing: boolean;
}

export function FileUpload({ onFileLoaded, isProcessing }: FileUploadProps) {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const companies = await parseExcelFile(file);
      onFileLoaded(companies);
    } catch (error) {
      alert('Erreur lors de la lecture du fichier Excel. Assurez-vous que le fichier est au bon format.');
      console.error(error);
    }

    event.target.value = '';
  };

  return (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
          isProcessing
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
            : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={`w-12 h-12 mb-4 ${isProcessing ? 'text-gray-400' : 'text-blue-500'}`} />
          <p className={`mb-2 text-sm ${isProcessing ? 'text-gray-400' : 'text-gray-700'}`}>
            <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
          </p>
          <p className={`text-xs ${isProcessing ? 'text-gray-400' : 'text-gray-500'}`}>
            Fichier Excel (.xlsx, .xls) avec emails ou noms d'entreprises dans la première colonne
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
      </label>
    </div>
  );
}
