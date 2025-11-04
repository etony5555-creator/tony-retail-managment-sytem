// Fix: Implement the type definitions.
import type { Dispatch, SetStateAction } from 'react';

export enum Page {
    Home = 'Dashboard',
    Customers = 'Customers',
    Stock = 'Stock',
    Finance = 'Finance',
    Borrow = 'Borrowing',
    Wholesalers = 'Wholesalers',
    BodaDrivers = 'Boda Drivers',
    Tasks = 'Tasks',
    Settings = 'Settings',
}

export enum TransactionType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export type BorrowStatus = 'Paid' | 'Partially Paid' | 'Unpaid';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Customer {
    id: string;
    name: string;
    phone: string;
    creditLimit: number;
    creditUsed: number;
}

export interface StockItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    lowStockThreshold: number;
}

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string; // YYYY-MM-DD
    type: TransactionType;
}

export interface BorrowRecord {
    id: string;
    lender: string;
    amount: number;
    amountPaid: number;
    date: string; // YYYY-MM-DD
    dueDate: string; // YYYY-MM-DD
    status: BorrowStatus;
}

export interface Wholesaler {
    id: string;
    name: string;
    contact: string;
    productCategory: string;
}

export interface BodaDriver {
    id: string;
    name: string;
    phone: string;
    available: boolean;
}

export interface Task {
    id: string;
    title: string;
    dueDate: string; // YYYY-MM-DD
    status: TaskStatus;
    reminderTime?: string; // HH:MM
    reminderSent?: boolean;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    '--color-dark-bg': string;       // e.g., '222 88% 10%'
    '--color-dark-card': string;     // e.g., '222 88% 12%'
    '--color-dark-border': string;   // e.g., '222 88% 20%'
    '--color-glow-cyan': string;     // e.g., '180 100% 50%'
  };
}

export const themes: Theme[] = [
  { id: 'default', name: 'Cyberpunk Cyan', colors: { '--color-dark-bg': '222 88% 8%', '--color-dark-card': '222 88% 12%', '--color-dark-border': '222 88% 20%', '--color-glow-cyan': '180 100% 50%' }},
  { id: 'sunset', name: 'Sunset Orange', colors: { '--color-dark-bg': '22 68% 8%', '--color-dark-card': '22 68% 12%', '--color-dark-border': '22 68% 20%', '--color-glow-cyan': '30 100% 55%' }},
  { id: 'galaxy', name: 'Galaxy Purple', colors: { '--color-dark-bg': '265 68% 8%', '--color-dark-card': '265 68% 12%', '--color-dark-border': '265 68% 20%', '--color-glow-cyan': '250 100% 65%' }},
  { id: 'emerald', name: 'Emerald Green', colors: { '--color-dark-bg': '150 68% 8%', '--color-dark-card': '150 68% 12%', '--color-dark-border': '150 68% 20%', '--color-glow-cyan': '140 100% 55%' }},
];

export interface AppContextType {
    // State
    customers: Customer[];
    stock: StockItem[];
    transactions: Transaction[];
    borrows: BorrowRecord[];
    wholesalers: Wholesaler[];
    bodaDrivers: BodaDriver[];
    tasks: Task[];
    shopName: string;
    logo: string | null;
    darkMode: boolean;
    theme: Theme;

    // Setters
    setCustomers: Dispatch<SetStateAction<Customer[]>>;
    setStock: Dispatch<SetStateAction<StockItem[]>>;
    setTransactions: Dispatch<SetStateAction<Transaction[]>>;
    setBorrows: Dispatch<SetStateAction<BorrowRecord[]>>;
    setWholesalers: Dispatch<SetStateAction<Wholesaler[]>>;
    setBodaDrivers: Dispatch<SetStateAction<BodaDriver[]>>;
    setTasks: Dispatch<SetStateAction<Task[]>>;
    setShopName: Dispatch<SetStateAction<string>>;
    setLogo: Dispatch<SetStateAction<string | null>>;
    toggleDarkMode: () => void;
    setTheme: (theme: Theme) => void;
    
    // Derived Financial Data
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    totalStockValue: number;
    totalDebt: number;
    totalCreditExtended: number;

    // CRUD Functions
    addCustomer: (customer: Omit<Customer, 'id' | 'creditUsed'>) => void;
    updateCustomer: (customer: Customer) => void;
    addStockItem: (item: Omit<StockItem, 'id'>) => void;
    updateStockItem: (item: StockItem) => void;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    addBorrow: (borrow: Omit<BorrowRecord, 'id' | 'amountPaid' | 'status'>) => void;
    updateBorrow: (borrow: BorrowRecord) => void;
    addWholesaler: (wholesaler: Omit<Wholesaler, 'id'>) => void;
    updateWholesaler: (wholesaler: Wholesaler) => void;
    addBodaDriver: (driver: Omit<BodaDriver, 'id' | 'available'>) => void;
    updateBodaDriver: (driver: BodaDriver) => void;
    addTask: (task: Omit<Task, 'id' | 'status' | 'reminderSent'>) => void;
    updateTaskStatus: (id: string, status: TaskStatus) => void;
    updateTask: (task: Task) => void;
    markReminderAsSent: (id: string) => void;
}