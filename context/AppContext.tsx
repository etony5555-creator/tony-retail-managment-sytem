import React, { createContext, useState, useEffect, useMemo } from 'react';
import type { AppContextType, Customer, StockItem, Transaction, BorrowRecord, Wholesaler, BodaDriver, Task, TaskStatus, Theme } from '../types';
import { themes } from '../types';
import { useMockData } from '../hooks/useMockData';

export const AppContext = createContext<AppContextType | null>(null);

const generateId = () => `id_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    customers, setCustomers,
    stock, setStock,
    transactions, setTransactions,
    borrows, setBorrows,
    wholesalers, setWholesalers,
    bodaDrivers, setBodaDrivers,
    tasks, setTasks
  } = useMockData();
  
  const [shopName, setShopName] = useState(() => localStorage.getItem('shopName') || 'My Duka');
  const [logo, setLogo] = useState<string | null>(() => localStorage.getItem('shopLogo') || null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    // FIX: Explicitly cast the parsed object to the Theme type to ensure type safety.
    return savedTheme ? JSON.parse(savedTheme) as Theme : themes[0];
  });

  // Persist settings to localStorage
  useEffect(() => { localStorage.setItem('shopName', shopName); }, [shopName]);
  useEffect(() => {
    if (logo) { localStorage.setItem('shopLogo', logo); } 
    else { localStorage.removeItem('shopLogo'); }
  }, [logo]);
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) { document.documentElement.classList.add('dark'); }
    else { document.documentElement.classList.remove('dark'); }
  }, [darkMode]);
  
  // THEME ENGINE EFFECT
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const setTheme = (newTheme: Theme) => setThemeState(newTheme);

  // Derived Financial Data
  const totalRevenue = useMemo(() => transactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0), [transactions]);
  const totalExpenses = useMemo(() => transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0), [transactions]);
  const netProfit = useMemo(() => totalRevenue - totalExpenses, [totalRevenue, totalExpenses]);
  const totalStockValue = useMemo(() => stock.reduce((sum, item) => sum + (item.quantity * item.price), 0), [stock]);
  const totalDebt = useMemo(() => borrows.reduce((sum, b) => sum + (b.amount - b.amountPaid), 0), [borrows]);
  const totalCreditExtended = useMemo(() => customers.reduce((sum, c) => sum + c.creditUsed, 0), [customers]);

  // CRUD Functions
  const addCustomer = (customer: Omit<Customer, 'id' | 'creditUsed'>) => setCustomers(prev => [...prev, { ...customer, id: generateId(), creditUsed: 0 }]);
  const updateCustomer = (updatedCustomer: Customer) => setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
  const addStockItem = (item: Omit<StockItem, 'id'>) => setStock(prev => [...prev, { ...item, id: generateId() }]);
  const updateStockItem = (updatedItem: StockItem) => setStock(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => setTransactions(prev => [...prev, { ...transaction, id: generateId() }]);
  const addBorrow = (borrow: Omit<BorrowRecord, 'id' | 'amountPaid' | 'status'>) => setBorrows(prev => [...prev, { ...borrow, id: generateId(), amountPaid: 0, status: 'Unpaid' }]);
  const updateBorrow = (updatedBorrow: BorrowRecord) => {
    if(updatedBorrow.amountPaid >= updatedBorrow.amount) updatedBorrow.status = 'Paid';
    else if (updatedBorrow.amountPaid > 0) updatedBorrow.status = 'Partially Paid';
    else updatedBorrow.status = 'Unpaid';
    setBorrows(prev => prev.map(b => b.id === updatedBorrow.id ? updatedBorrow : b));
  };
  const addWholesaler = (wholesaler: Omit<Wholesaler, 'id'>) => setWholesalers(prev => [...prev, { ...wholesaler, id: generateId() }]);
  const updateWholesaler = (updatedWholesaler: Wholesaler) => setWholesalers(prev => prev.map(w => w.id === updatedWholesaler.id ? updatedWholesaler : w));
  const addBodaDriver = (driver: Omit<BodaDriver, 'id' | 'available'>) => setBodaDrivers(prev => [...prev, { ...driver, id: generateId(), available: true }]);
  const updateBodaDriver = (updatedDriver: BodaDriver) => setBodaDrivers(prev => prev.map(d => d.id === updatedDriver.id ? updatedDriver : d));
  
  const addTask = (task: Omit<Task, 'id' | 'status' | 'reminderSent'>) => {
    const newTask: Task = { ...task, id: generateId(), status: 'Pending', reminderSent: false };
    setTasks(prev => [...prev, newTask]);
  };
  const updateTaskStatus = (id: string, status: TaskStatus) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  const updateTask = (updatedTask: Task) => setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  const markReminderAsSent = (id: string) => setTasks(prev => prev.map(t => t.id === id ? { ...t, reminderSent: true } : t));


  const value: AppContextType = {
    customers, setCustomers,
    stock, setStock,
    transactions, setTransactions,
    borrows, setBorrows,
    wholesalers, setWholesalers,
    bodaDrivers, setBodaDrivers,
    tasks, setTasks,
    shopName, setShopName,
    logo, setLogo,
    darkMode, toggleDarkMode,
    theme, setTheme,
    totalRevenue, totalExpenses, netProfit, totalStockValue, totalDebt, totalCreditExtended,
    addCustomer, updateCustomer,
    addStockItem, updateStockItem,
    addTransaction,
    addBorrow, updateBorrow,
    addWholesaler, updateWholesaler,
    addBodaDriver, updateBodaDriver,
    addTask, updateTaskStatus, updateTask, markReminderAsSent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};