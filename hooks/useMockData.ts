
import { useState } from 'react';
import type { Customer, StockItem, Transaction, Task, Wholesaler, BodaDriver } from '../types';
import { TransactionType } from '../types';

const useMockData = () => {
  const [customers] = useState<Customer[]>([
    { id: 1, name: 'der', debt: 70.00, lastSeen: '2024-07-20' },
    { id: 2, name: 'tedd', debt: 40.00, lastSeen: '2024-07-21' },
    { id: 3, name: 'Alice', debt: 0, lastSeen: '2024-07-22' },
    { id: 4, name: 'Bob', debt: 150.50, lastSeen: '2024-07-18' },
  ]);

  const [stock] = useState<StockItem[]>([
    { id: 1, name: 'Sugar', quantity: 50, price: 5000, lowStockThreshold: 20 },
    { id: 2, name: 'Soap', quantity: 15, price: 3000, lowStockThreshold: 10 },
    { id: 3, name: 'Bread', quantity: 30, price: 6000, lowStockThreshold: 15 },
    { id: 4, name: 'Cooking Oil', quantity: 25, price: 8000, lowStockThreshold: 10 },
  ]);

  const [transactions] = useState<Transaction[]>([
    { id: 1, description: 'Sale of Sugar', amount: 50000, type: TransactionType.INCOME, date: '2024-07-22' },
    { id: 2, description: 'Restock Soap', amount: 30000, type: TransactionType.EXPENSE, date: '2024-07-21' },
    { id: 3, description: 'Daily Sales', amount: 450000, type: TransactionType.INCOME, date: '2024-07-22' },
    { id: 4, description: 'Rent', amount: 200000, type: TransactionType.EXPENSE, date: '2024-07-01' },
    { id: 5, description: 'Utility Bill', amount: 75000, type: TransactionType.EXPENSE, date: '2024-07-15' },
  ]);

  const [tasks] = useState<Task[]>([
    { id: 1, title: 'Call wholesaler for sugar restock', completed: false, dueDate: '2024-07-25' },
    { id: 2, title: 'Follow up with tedd on debt', completed: false, dueDate: '2024-07-24' },
    { id: 3, title: 'Monthly profit report', completed: true, dueDate: '2024-07-05' },
  ]);

  const [wholesalers] = useState<Wholesaler[]>([
    { id: 1, name: 'Kampala General Supplies', contact: '077-123-4567', productCategory: 'Groceries' },
    { id: 2, name: 'Bakers Choice Ltd', contact: '078-765-4321', productCategory: 'Bakery' },
  ]);

  const [bodaDrivers] = useState<BodaDriver[]>([
    { id: 1, name: 'James', phone: '075-111-2222', available: true },
    { id: 2, name: 'Peter', phone: '079-333-4444', available: false },
  ]);
  
  return { customers, stock, transactions, tasks, wholesalers, bodaDrivers };
};

export default useMockData;
