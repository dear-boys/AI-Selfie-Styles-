import React from 'react';
import { Translations } from '../en';

interface HeaderProps {
    onReset: () => void;
    t: Translations;
    language: 'en' | 'fa';
    setLanguage: (lang: 'en' | 'fa') => void;
}

const LanguageSwitcher: React.FC<Pick<HeaderProps, 'language' | 'setLanguage'>> = ({ language, setLanguage }) => (
    <div className="flex space-x-2 border border-gray-600 rounded-full p-1 text-sm">
        <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-full transition-colors ${language === 'en' ? 'bg-indigo-500' : 'hover:bg-gray-700'}`}
        >
            EN
        </button>
        <button
            onClick={() => setLanguage('fa')}
            className={`px-3 py-1 rounded-full transition-colors ${language === 'fa' ? 'bg-indigo-500' : 'hover:bg-gray-700'}`}
        >
            FA
        </button>
    </div>
);


export const Header: React.FC<HeaderProps> = ({ onReset, t, language, setLanguage }) => {
  return (
    <header className="w-full max-w-7xl mx-auto flex justify-between items-center pb-4 border-b border-gray-700">
      <div className="flex items-center gap-4">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                Make Me Shine
            </h1>
            <a 
              href="https://t.me/Emin_h_m" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-gray-400 mt-1 hover:text-indigo-400 transition-colors underline"
            >
                {t.credit}
            </a>
            <p className="text-xs text-gray-500">{t.poweredBy}</p>
        </div>
      </div>
      <button 
        onClick={onReset}
        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
        title={t.startOver}
      >
        <span>{t.startOver}</span>
      </button>
    </header>
  );
};