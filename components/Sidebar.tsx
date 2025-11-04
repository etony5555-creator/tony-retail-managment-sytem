import React, { useContext } from 'react';
import { Page } from '../types';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../types';

// Icons for sidebar items
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.978 5.978 0 0112 13a5.979 5.979 0 012.121.303m-2.121-.303a4 4 0 100-5.292m0 5.292a4 4 0 010-5.292" /></svg>;
const ArchiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
const CashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ArrowCircleRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TruckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h2a1 1 0 001-1V7a1 1 0 00-1-1h-2" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293a1 1 0 010 1.414L5.414 8l2.293 2.293a1 1 0 11-1.414 1.414L4 9.414l-2.293 2.293a1 1 0 11-1.414-1.414L2.586 8 0.293 5.707a1 1 0 011.414-1.414L4 6.586l2.293-2.293a1 1 0 011.414 0z" /></svg>;
const ClipboardCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;


const navItems = [
  { page: Page.Home, icon: <HomeIcon /> },
  { page: Page.Customers, icon: <UsersIcon /> },
  { page: Page.Stock, icon: <ArchiveIcon /> },
  { page: Page.Finance, icon: <CashIcon /> },
  { page: Page.Borrow, icon: <ArrowCircleRightIcon /> },
  { page: Page.Wholesalers, icon: <GlobeIcon /> },
  { page: Page.BodaDrivers, icon: <TruckIcon /> },
  { page: Page.Tasks, icon: <ClipboardCheckIcon /> },
  { page: Page.Settings, icon: <CogIcon /> },
];

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, setIsOpen }) => {
  const { shopName, logo } = useContext(AppContext) as AppContextType;

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <aside className={`w-64 bg-white/30 dark:bg-dark-card/50 backdrop-blur-lg border-r border-gray-200 dark:border-dark-border flex flex-col p-4 space-y-4 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative fixed inset-y-0 left-0 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center space-x-3 p-2">
        <div className="w-12 h-12 rounded-full bg-dark-bg border-2 border-dark-border flex items-center justify-center overflow-hidden flex-shrink-0">
            {logo ? (
                <img src={logo} alt="Shop Logo" className="w-full h-full object-cover" />
            ) : (
                <span className="text-glow-cyan text-xl font-bold">{shopName.charAt(0)}</span>
            )}
        </div>
        <h1 className="text-lg font-bold text-gray-800 dark:text-white truncate">{shopName}</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.page}>
              <button
                onClick={() => handleNavClick(item.page)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                  activePage === item.page
                    ? 'bg-glow-cyan/80 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-border'
                }`}
              >
                {item.icon}
                <span>{item.page}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-2 border-t border-dark-border">
          <p className="text-xs text-center text-gray-500">Shop Manager v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;