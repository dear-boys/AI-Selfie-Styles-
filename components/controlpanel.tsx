import React from 'react';
import { StyleSelector } from './StyleSelector';
import { getStyleCategories } from '../constants';
import { SelectedOptions } from '../types';
import { Translations } from '../en';
import { ImageUploader } from './ImageUploader';
import { Loader } from './Loader';

interface ControlPanelProps {
  t: Translations;
  selectedOptions: SelectedOptions;
  onOptionChange: (newOptions: SelectedOptions) => void;
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  originalImage: string | null;
  onImageUpload: (imageDataUrl: string) => void;
  generatedImage: string | null;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  t,
  selectedOptions, 
  onOptionChange, 
  customPrompt,
  onCustomPromptChange,
  onGenerate, 
  isGenerating, 
  originalImage,
  onImageUpload,
  generatedImage
}) => {
  const handleSelectChange = (key: keyof SelectedOptions, value: string) => {
    onOptionChange({ ...selectedOptions, [key]: value });
  };
  
  const isImageUploaded = !!originalImage;
  const styleCategories = getStyleCategories(t);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 h-full flex flex-col">
      
      <ImageUploader onImageUpload={onImageUpload} originalImage={originalImage} t={t}/>

      <div className={`transition-opacity duration-500 mt-6 ${!isImageUploaded ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <div>
          <h2 className="text-xl font-semibold text-gray-200">{t.customizeImage}</h2>
          <p className="text-sm text-gray-400 mt-1">{t.customizeImageDesc}</p>
        </div>
        
        <div className="flex-grow space-y-6 mt-6">
          {styleCategories.map((category) => (
            <StyleSelector
              key={category.key}
              title={category.title}
              options={category.options}
              selectedValue={selectedOptions[category.key]}
              onValueChange={(value) => handleSelectChange(category.key, value)}
              disabled={customPrompt.trim().length > 0}
            />
          ))}

          <div className="relative pt-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center">
                  <span className="bg-gray-800 px-2 text-sm text-gray-400 rounded-full">{t.or}</span>
              </div>
          </div>
          
          <div>
              <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-300 mb-1">
                  {t.customPromptLabel}
              </label>
              <textarea
                  id="custom-prompt"
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder:text-gray-400"
                  placeholder={t.customPromptPlaceholder}
                  value={customPrompt}
                  onChange={(e) => onCustomPromptChange(e.target.value)}
              />
          </div>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating || !isImageUploaded}
        className="w-full mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t.generating}
          </>
        ) : (
          t.generateImage
        )}
      </button>

      <div className="w-full aspect-video rounded-lg flex items-center justify-center bg-gray-900/50 mt-8 border border-gray-700">
        {isGenerating ? (
            <Loader t={t} />
        ) : generatedImage ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
                <div className="flex-grow w-full h-full relative">
                    <img src={generatedImage} alt={t.generated} className="w-full h-full object-contain rounded-lg"/>
                </div>
                <a 
                    href={generatedImage} 
                    download="styled-selfie.png"
                    className="flex-shrink-0 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-white/20 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    {t.download}
                </a>
            </div>
        ) : (
            <div className="text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm font-medium">{t.generatedImagePlaceholder}</p>
            </div>
        )}
      </div>

    </div>
  );
};