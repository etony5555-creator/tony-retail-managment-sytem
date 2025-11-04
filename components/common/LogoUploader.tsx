
import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import type { AppContextType } from '../../types';
import Button from './Button';

const LogoUploader: React.FC = () => {
  const { logo, setLogo } = useContext(AppContext) as AppContextType;
  const [preview, setPreview] = useState<string | null>(logo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setLogo(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="w-20 h-20 rounded-full bg-dark-bg border-2 border-dark-border flex items-center justify-center overflow-hidden">
        {preview ? (
          <img src={preview} alt="Shop Logo" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 text-xs text-center">No Logo</span>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <Button onClick={handleUploadClick} variant="secondary">
        Upload Logo
      </Button>
    </div>
  );
};

export default LogoUploader;
