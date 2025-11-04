import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Stock from './components/Stock';
import Finance from './components/Finance';
import Settings from './components/Settings';
import Header from './components/Header';
import Borrow from './components/Borrow';
import Wholesalers from './components/Wholesalers';
import BodaDrivers from './components/BodaDrivers';
import Tasks from './components/Tasks';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case Page.Home:
        return <Dashboard setActivePage={setActivePage} />;
      case Page.Customers:
        return <Customers />;
      case Page.Stock:
        return <Stock />;
      case Page.Finance:
        return <Finance />;
      case Page.Borrow:
        return <Borrow />;
      case Page.Wholesalers:
        return <Wholesalers />;
      case Page.BodaDrivers:
        return <BodaDrivers />;
      case Page.Tasks:
        return <Tasks />;
      case Page.Settings:
        return <Settings />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-gray-200 font-sans">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
       {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title={activePage} onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;