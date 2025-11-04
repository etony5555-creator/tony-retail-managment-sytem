import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, Theme } from '../types';
import { themes } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import LogoUploader from './common/LogoUploader';

const ThemeSwatch: React.FC<{ theme: Theme; isActive: boolean; onClick: () => void; }> = ({ theme, isActive, onClick }) => {
    const style = {
        '--bg': `hsl(${theme.colors['--color-dark-bg']})`,
        '--card': `hsl(${theme.colors['--color-dark-card']})`,
        '--border': `hsl(${theme.colors['--color-dark-border']})`,
        '--accent': `hsl(${theme.colors['--color-glow-cyan']})`,
    } as React.CSSProperties;

    return (
        <button
            onClick={onClick}
            className={`w-full p-2 rounded-lg border-2 transition-all ${isActive ? 'border-glow-cyan' : 'border-transparent hover:border-dark-border'}`}
            style={style}
        >
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ background: `linear-gradient(45deg, var(--accent), var(--card))` }} />
                <div className="text-left">
                    <p className="font-semibold text-sm text-white">{theme.name}</p>
                    <p className="text-xs text-gray-400">Click to apply</p>
                </div>
            </div>
        </button>
    );
};

const Settings: React.FC = () => {
    const { shopName, setShopName, theme, setTheme } = useContext(AppContext) as AppContextType;
    const [name, setName] = useState(shopName);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setShopName(name);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <Card>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-dark-border pb-2">Shop Settings</h2>
                <div className="space-y-6">
                    {/* Shop Name */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-full md:w-1/3">
                             <label htmlFor="shopName" className="block text-sm font-medium text-gray-400 mb-1">
                                Shop Name
                            </label>
                            <p className="text-xs text-gray-500">This name appears on the sidebar and headers.</p>
                        </div>
                        <div className="w-full md:w-2/3">
                            <input
                                id="shopName"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none"
                            />
                        </div>
                    </div>

                    {/* Logo Uploader */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 border-t border-dark-border pt-6">
                         <div className="w-full md:w-1/3">
                             <label className="block text-sm font-medium text-gray-400 mb-1">
                                Shop Logo
                            </label>
                             <p className="text-xs text-gray-500">Upload a logo for your shop.</p>
                        </div>
                        <div className="w-full md:w-2/3">
                            <LogoUploader />
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-dark-border flex justify-end">
                    <Button onClick={handleSave} className="w-28">
                        {isSaved ? 'Saved!' : 'Save Settings'}
                    </Button>
                </div>
            </Card>

            <Card>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-dark-border pb-2">Theme Customization</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {themes.map(t => (
                        <ThemeSwatch 
                            key={t.id} 
                            theme={t} 
                            isActive={t.id === theme.id} 
                            onClick={() => setTheme(t)}
                        />
                    ))}
                 </div>
            </Card>
        </div>
    );
};

export default Settings;
