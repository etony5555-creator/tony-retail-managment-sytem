
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import useMockData from '../hooks/useMockData';
import type { AppContextType, Customer, StockItem, Transaction } from '../types';

export const AppContext = createContext<AppContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const mockData = useMockData();
  const [customers, setCustomers] = useState<Customer[]>(mockData.customers);
  const [stock, setStock] = useState<StockItem[]>(mockData.stock);
  const [transactions, setTransactions] = useState<Transaction[]>(mockData.transactions);
  const [shopName, setShopName] = useState<string>('My Shop');
  const [logo, setLogo] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addCustomer = (customerData: Omit<Customer, 'id' | 'debt' | 'lastSeen'>) => {
    const newCustomer: Customer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      name: customerData.name,
      debt: 0,
      lastSeen: new Date().toISOString().split('T')[0],
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const addStockItem = (itemData: Omit<StockItem, 'id'>) => {
    const newItem: StockItem = {
      id: Math.max(...stock.map(s => s.id), 0) + 1,
      ...itemData,
    };
    setStock(prev => [...prev, newItem]);
  };

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      id: Math.max(...transactions.map(t => t.id), 0) + 1,
      ...transactionData,
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  
  const value: AppContextType = {
    ...mockData,
    customers,
    stock,
    transactions,
    shopName,
    logo,
    darkMode,
    addCustomer,
    addStockItem,
    addTransaction,
    setShopName,
    setLogo,
    toggleDarkMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
