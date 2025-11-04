import React, { useState, useEffect, useContext } from 'react';
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
import { Page, type AppContextType } from './types';
import { AppContext } from './context/AppContext';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const context = useContext(AppContext);

  // Notification Effect
  useEffect(() => {
    if (!context) return;
    const { tasks, markReminderAsSent } = context as AppContextType;

    // Request notification permission when the app loads
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }

    const checkReminders = () => {
      if (Notification.permission !== 'granted') return;

      const now = new Date();
      tasks.forEach(task => {
        if (
          task.status !== 'Completed' &&
          task.reminderTime &&
          !task.reminderSent
        ) {
          const reminderDateTime = new Date(`${task.dueDate}T${task.reminderTime}:00`);
          
          if (reminderDateTime <= now) {
            new Notification('Task Reminder', {
              body: `Don't forget: "${task.title}" is due!`,
            });
            markReminderAsSent(task.id);
          }
        }
      });
    };

    // Check for reminders every 30 seconds
    const intervalId = setInterval(checkReminders, 30000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [context]);

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