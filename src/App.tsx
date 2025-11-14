
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { Loader } from './components/Loader';
import { editImage } from './services/geminiService';
import { SelectedOptions } from './types';
import { DEFAULT_SELECTED_OPTIONS } from './constants';
import { Toast } from './components/Toast';
import { en } from './en';
import { fa } from './fa';

const locales = { en, fa };

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(DEFAULT_SELECTED_OPTIONS);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [language, setLanguage] = useState<'en' | 'fa'>('en');

  const t = useMemo(() => locales[language], [language]);

  const handleImageUpload = (imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setGeneratedImage(null);
    setError(null);
  };

  const constructPrompt = (options: SelectedOptions, custom: string): string => {
    if (custom.trim()) {
      return `Based on the provided image of a person, please generate a new image that preserves their facial features and identity as closely as possible. Apply the following description: "${custom.trim()}"`;
    }

    const changes: string[] = [];

    if (options.posture !== 'None') {
        changes.push(`change their posture to a ${options.posture} pose`);
    }
    if (options.hairstyle !== 'None') {
        changes.push(`give them ${options.hairstyle} hair`);
    }
    if (options.outfit !== 'None') {
        changes.push(`dress them in a ${options.outfit}`);
    }
    if (options.headwear !== 'None') {
        changes.push(`have them wear ${options.headwear}`);
    }
    if (options.footwear !== 'None') {
        changes.push(`have them wear ${options.footwear}`);
    }
    if (options.environment !== 'None') {
        changes.push(`place them in a ${options.environment} setting`);
    }
    if (options.effect !== 'None') {
        changes.push(`apply a ${options.effect} visual effect to the image`);
    }

    if (changes.length === 0) {
      return "Slightly enhance the quality of the provided photo, keeping the person's facial features and identity intact. Make it look like a professional photograph.";
    }

    const promptIntro = "Based on the provided image of a person, please generate a new image that preserves their facial features and identity as closely as possible. Apply the following modifications to create a natural and high-quality photograph: ";
    
    return promptIntro + changes.join(', ') + ".";
  };


  const handleGenerate = useCallback(async () => {
    if (!originalImage) {
      setError(t.error_upload);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const prompt = constructPrompt(selectedOptions, customPrompt);
      const base64Data = originalImage.split(',')[1];
      const mimeType = originalImage.split(';')[0].split(':')[1];
      
      const newImageBase64 = await editImage(base64Data, mimeType, prompt);
      setGeneratedImage(`data:image/png;base64,${newImageBase64}`);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message === 'API_KEY_MISSING') {
        setError(t.error_api_key);
      } else {
        setError(t.error_generate);
      }
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedOptions, customPrompt, t]);
  
  const resetApp = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setIsLoading(false);
    setError(null);
    setSelectedOptions(DEFAULT_SELECTED_OPTIONS);
    setCustomPrompt('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <Header onReset={resetApp} t={t} language={language} setLanguage={setLanguage} />
      <main className="w-full max-w-4xl mx-auto mt-6">
        <ControlPanel
          t={t}
          selectedOptions={selectedOptions}
          onOptionChange={setSelectedOptions}
          customPrompt={customPrompt}
          onCustomPromptChange={setCustomPrompt}
          onGenerate={handleGenerate}
          isGenerating={isLoading}
          originalImage={originalImage}
          onImageUpload={handleImageUpload}
          generatedImage={generatedImage}
        />
      </main>
      {error && <Toast message={error} onDismiss={() => setError(null)} />}
    </div>
  );
};

export default App;
