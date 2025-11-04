
export enum Page {
  Home = 'Dashboard',
  Customers = 'Customers',
  Stock = 'Stock',
  Finance = 'Finance',
  Borrow = 'Borrow',
  Wholesalers = 'Wholesalers',
  BodaDrivers = 'Boda Drivers',
  Settings = 'Settings',
}

export enum TransactionType {
  INCOME = 'Income',
  EXPENSE = 'Expense',
}

export interface Customer {
  id: number;
  name: string;
  debt: number;
  lastSeen: string;
}

export interface StockItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  lowStockThreshold: number;
}

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface Wholesaler {
  id: number;
  name: string;
  contact: string;
  productCategory: string;
}

export interface BodaDriver {
  id: number;
  name: string;
  phone: string;
  available: boolean;
}

export interface BusinessInsight {
  title: string;
  suggestion: string;
}

export interface AppContextType {
  customers: Customer[];
  stock: StockItem[];
  transactions: Transaction[];
  tasks: Task[];
  wholesalers: Wholesaler[];
  bodaDrivers: BodaDriver[];
  shopName: string;
  logo: string | null;
  darkMode: boolean;
  addCustomer: (customer: Omit<Customer, 'id' | 'debt' | 'lastSeen'>) => void;
  addStockItem: (item: Omit<StockItem, 'id'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  setShopName: (name: string) => void;
  setLogo: (logo: string | null) => void;
  toggleDarkMode: () => void;
}
