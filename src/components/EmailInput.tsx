import { ClipboardPaste } from 'lucide-react';
import { useState } from 'react';
import type { CompanyInput } from '../types';

interface LeadInputProps {
  onLeadsSubmitted: (companies: CompanyInput[]) => void;
  isProcessing: boolean;
}

export function LeadInput({ onLeadsSubmitted, isProcessing }: LeadInputProps) {
  const [leadText, setLeadText] = useState('');

  const handleSubmit = () => {
    if (!leadText.trim()) {
      alert('Veuillez entrer au moins un email ou nom d\'entreprise');
      return;
    }

    const lines = leadText.split('\n').map(line => line.trim()).filter(line => line);
    const companies: CompanyInput[] = lines.map(input => ({ input }));

    if (companies.length === 0) {
      alert('Aucune entrée valide trouvée');
      return;
    }

    onLeadsSubmitted(companies);
    setLeadText('');
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <label htmlFor="lead-input" className="block text-sm font-medium text-gray-700 mb-2">
          <ClipboardPaste className="inline w-4 h-4 mr-1" />
          Collez vos emails ou noms d'entreprises (un par ligne)
        </label>
        <textarea
          id="lead-input"
          value={leadText}
          onChange={(e) => setLeadText(e.target.value)}
          disabled={isProcessing}
          className={`w-full h-48 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            isProcessing
              ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
              : 'bg-white border-gray-300 hover:border-blue-400'
          }`}
          placeholder="baptiste.benet@keyrus.com&#10;Keyrus&#10;contact@societe.fr&#10;Carrefour"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isProcessing || !leadText.trim()}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
          isProcessing || !leadText.trim()
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
        }`}
      >
        {isProcessing ? 'Traitement en cours...' : 'Enrichir les données'}
      </button>
    </div>
  );
}
