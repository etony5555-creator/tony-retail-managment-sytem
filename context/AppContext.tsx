import React, { createContext, useState, useEffect, ReactNode } from 'react';
import useMockData from '../hooks/useMockData';
import type { AppContextType, Customer, StockItem, Transaction, Wholesaler, BodaDriver, BorrowRecord, Task } from '../types';

export const AppContext = createContext<AppContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const mockData = useMockData();
  const [customers, setCustomers] = useState<Customer[]>(mockData.customers);
  const [stock, setStock] = useState<StockItem[]>(mockData.stock);
  const [transactions, setTransactions] = useState<Transaction[]>(mockData.transactions);
  const [wholesalers, setWholesalers] = useState<Wholesaler[]>(mockData.wholesalers);
  const [bodaDrivers, setBodaDrivers] = useState<BodaDriver[]>(mockData.bodaDrivers);
  const [borrows, setBorrows] = useState<BorrowRecord[]>(mockData.borrows);
  const [tasks, setTasks] = useState<Task[]>(mockData.tasks);
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

  const addWholesaler = (wholesalerData: Omit<Wholesaler, 'id'>) => {
    const newWholesaler: Wholesaler = {
      id: Math.max(...wholesalers.map(w => w.id), 0) + 1,
      ...wholesalerData,
    };
    setWholesalers(prev => [...prev, newWholesaler]);
  };

  const addBodaDriver = (driverData: Omit<BodaDriver, 'id' | 'available'>) => {
    const newDriver: BodaDriver = {
      id: Math.max(...bodaDrivers.map(d => d.id), 0) + 1,
      ...driverData,
      available: true,
    };
    setBodaDrivers(prev => [...prev, newDriver]);
  };
  
  const addBorrow = (borrowData: Omit<BorrowRecord, 'id' | 'status'>) => {
    const newBorrow: BorrowRecord = {
      id: Math.max(...borrows.map(b => b.id), 0) + 1,
      ...borrowData,
      status: 'Unpaid',
    };
    setBorrows(prev => [...prev, newBorrow]);
  };

  const addTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      ...taskData,
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (taskId: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  
  const value: AppContextType = {
    customers,
    stock,
    transactions,
    tasks,
    wholesalers,
    bodaDrivers,
    borrows,
    shopName,
    logo,
    darkMode,
    addCustomer,
    addStockItem,
    addTransaction,
    addWholesaler,
    addBodaDriver,
    addBorrow,
    addTask,
    toggleTask,
    setShopName,
    setLogo,
    toggleDarkMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};