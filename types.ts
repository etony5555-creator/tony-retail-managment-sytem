

// FIX: Removed circular self-import of 'Page' to resolve conflicting declaration errors.
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

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export type BorrowStatus = 'Unpaid' | 'Partially Paid' | 'Paid';

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
  status: TaskStatus;
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

export interface BorrowRecord {
  id: number;
  lender: string;
  amount: number;
  amountPaid: number;
  date: string;
  dueDate: string;
  status: BorrowStatus;
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
  updateCustomer: (customer: Customer) => void;
  addStockItem: (item: Omit<StockItem, 'id'>) => void;
  updateStockItem: (item: StockItem) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addWholesaler: (wholesaler: Omit<Wholesaler, 'id'>) => void;
  updateWholesaler: (wholesaler: Wholesaler) => void;
  addBodaDriver: (driver: Omit<BodaDriver, 'id' | 'available'>) => void;
  updateBodaDriver: (driver: BodaDriver) => void;
  addBorrow: (borrow: Omit<BorrowRecord, 'id' | 'amountPaid' | 'status'>) => void;
  updateBorrow: (borrow: BorrowRecord) => void;
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  updateTaskStatus: (taskId: number, status: TaskStatus) => void;
  setShopName: (name: string) => void;
  setLogo: (logo: string | null) => void;
  toggleDarkMode: () => void;
}