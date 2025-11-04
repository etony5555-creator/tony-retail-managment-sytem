
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import LogoUploader from './common/LogoUploader';

const Settings: React.FC = () => {
  const { shopName, setShopName } = useContext(AppContext) as AppContextType;

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <Card>
        <h2 className="text-xl font-bold mb-4 text-white">Shop Settings</h2>
        <div className="space-y-4">
            <div>
                <label htmlFor="shopName" className="block text-sm font-medium text-gray-400 mb-1">
                    Shop Name
                </label>
                <input
                    type="text"
                    id="shopName"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan focus:border-glow-cyan outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                    Shop Logo
                </label>
                <LogoUploader />
            </div>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-bold mb-4 text-white">System Preferences</h2>
        <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                    Default Currency
                </label>
                <input
                    type="text"
                    value="UGX (Ugandan Shilling)"
                    disabled
                    className="w-full bg-dark-bg/50 border border-dark-border rounded-lg p-2 text-gray-400 cursor-not-allowed"
                />
            </div>
        </div>
      </Card>

      <div className="flex justify-end">
          <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default Settings;
