export enum Page {
  Home = 'Dashboard',
  Customers = 'Customers',
  Stock = 'Stock',
  Finance = 'Finance',
  Borrow = 'Borrow',
  Wholesalers = 'Wholesalers',
  BodaDrivers = 'Boda Drivers',
  Tasks = 'Tasks',
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

export interface BorrowRecord {
  id: number;
  lender: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'Paid' | 'Unpaid';
}


export interface AppContextType {
  customers: Customer[];
  stock: StockItem[];
  transactions: Transaction[];
  tasks: Task[];
  wholesalers: Wholesaler[];
  bodaDrivers: BodaDriver[];
  borrows: BorrowRecord[];
  shopName: string;
  logo: string | null;
  darkMode: boolean;
  addCustomer: (customer: Omit<Customer, 'id' | 'debt' | 'lastSeen'>) => void;
  addStockItem: (item: Omit<StockItem, 'id'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addWholesaler: (wholesaler: Omit<Wholesaler, 'id'>) => void;
  addBodaDriver: (driver: Omit<BodaDriver, 'id' | 'available'>) => void;
  addBorrow: (borrow: Omit<BorrowRecord, 'id' | 'status'>) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  toggleTask: (taskId: number) => void;
  setShopName: (name: string) => void;
  setLogo: (logo: string | null) => void;
  toggleDarkMode: () => void;
}