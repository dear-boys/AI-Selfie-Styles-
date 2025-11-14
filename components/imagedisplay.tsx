import React from 'react';
import { Translations } from '../en';

interface ImageDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  t: Translations;
}

interface ImageCardProps {
    title: string;
    imageUrl: string | null;
    isPlaceholder?: boolean;
    isEmpty?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ title, imageUrl, isPlaceholder = false, isEmpty = false }) => (
    <div className="w-full">
        <h3 className="text-center text-lg font-medium text-gray-400 mb-2">{title}</h3>
        <div className={`aspect-square w-full rounded-xl border border-gray-700 bg-gray-800 flex items-center justify-center ${isPlaceholder ? 'animate-pulse' : ''}`}>
            {imageUrl ? (
                <img src={imageUrl} alt={title} className="object-contain w-full h-full rounded-xl" />
            ) : (
                <div className={`text-gray-500 ${isEmpty ? 'opacity-50' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path>
                    </svg>
                </div>
            )}
        </div>
    </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, generatedImage, t }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ImageCard title={t.original} imageUrl={originalImage} isEmpty={!originalImage} />
      <ImageCard title={t.generated} imageUrl={generatedImage} isPlaceholder={!!originalImage && !generatedImage}/>
    </div>
  );
};
