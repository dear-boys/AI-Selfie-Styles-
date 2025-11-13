import React, { useCallback, useState } from 'react';
import { Translations } from '../en';

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
  originalImage: string | null;
  t: Translations;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImage, t }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          onImageUpload(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  if (originalImage) {
    return (
        <div className="relative group w-full aspect-video rounded-lg overflow-hidden">
            <img src={originalImage} alt="Uploaded selfie" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-md font-medium"
                >
                    {t.changeImage}
                </button>
                <input ref={fileInputRef} id="file-upload-hidden" name="file-upload-hidden" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} />
            </div>
        </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-video border-2 border-dashed rounded-xl flex flex-col justify-center items-center text-center p-4 transition-colors duration-300 ${isDragging ? 'border-indigo-400 bg-gray-800' : 'border-gray-600 hover:border-gray-500'}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
        <div className="flex flex-col items-center gap-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p className="text-base font-semibold">{t.dragAndDrop}</p>
            <p className="text-xs">{t.or}</p>
            <label htmlFor="file-upload" className="cursor-pointer bg-indigo-600 text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-indigo-700 transition-colors">
                {t.browseFiles}
            </label>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} />
            <p className="text-xs text-gray-500 mt-1">{t.supportedFormats}</p>
        </div>
    </div>
  );
};
