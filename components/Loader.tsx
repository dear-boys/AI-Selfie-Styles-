import React from 'react';
import { Translations } from '../en';

interface LoaderProps {
  t: Translations;
}

export const Loader: React.FC<LoaderProps> = ({ t }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-white">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-lg font-medium tracking-wide">{t.loaderText}</p>
    </div>
  );
};
