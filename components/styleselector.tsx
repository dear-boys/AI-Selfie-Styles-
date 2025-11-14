
import React from 'react';
import { StyleOption } from '../types';

interface StyleSelectorProps {
  title: string;
  options: StyleOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ title, options, selectedValue, onValueChange, disabled = false }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">{title}</label>
      <div className={`
        flex space-x-2 space-x-reverse -mx-1 px-1
        overflow-x-auto pb-2
        scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => !disabled && onValueChange(option.value)}
            disabled={disabled}
            className={`
              px-4 py-2 rounded-full transition-all duration-200 text-sm whitespace-nowrap flex-shrink-0 border
              ${selectedValue === option.value
                ? 'bg-indigo-500 border-indigo-400 text-white font-semibold'
                : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
      <style>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #4B5563 #1F2937;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1F2937;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #4B5563;
          border-radius: 3px;
        }
        html[dir="rtl"] .space-x-reverse {
          --tw-space-x-reverse: 1;
        }
      `}</style>
    </div>
  );
};
