
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { Loader } from './components/Loader';
import { editImage, getApiKeyError } from './services/geminiService';
import { SelectedOptions } from './types';
import { DEFAULT_SELECTED_OPTIONS } from './constants';
import { Toast } from './components/Toast';

  const t = useMemo(() => locales[language], [language]);

  useEffect(() => {
    const apiKeyError = getApiKeyError();
    if (apiKeyError) {
      setError(apiKeyError);
    }
  }, []);

  const handleImageUpload = (imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setGeneratedImage(null);
