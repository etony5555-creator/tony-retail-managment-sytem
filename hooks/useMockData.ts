// Fix: Implement the useMockData hook to provide initial data.
import { useState } from 'react';
import { Customer, StockItem, Transaction, TransactionType, BorrowRecord, Wholesaler, BodaDriver, Task } from '../types';

const generateId = () => `id_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

const initialCustomers: Customer[] = [
  { id: generateId(), name: 'John Doe', phone: '0771234567', creditLimit: 500000, creditUsed: 150000 },
  { id: generateId(), name: 'Jane Smith', phone: '0781234567', creditLimit: 1000000, creditUsed: 800000 },
  { id: generateId(), name: 'Peter Jones', phone: '0751234567', creditLimit: 200000, creditUsed: 0 },
];

const initialStock: StockItem[] = [
  { id: generateId(), name: 'Sugar', quantity: 50, price: 4000, lowStockThreshold: 10 },
  { id: generateId(), name: 'Soap', quantity: 100, price: 2500, lowStockThreshold: 20 },
  { id: generateId(), name: 'Cooking Oil', quantity: 5, price: 8000, lowStockThreshold: 5 },
  { id: generateId(), name: 'Rice', quantity: 25, price: 5000, lowStockThreshold: 10 },
];

const initialTransactions: Transaction[] = [
  { id: generateId(), description: 'Stock purchase', amount: 200000, date: '2023-10-25', type: TransactionType.EXPENSE },
  { id: generateId(), description: 'Daily sales', amount: 350000, date: '2023-10-25', type: TransactionType.INCOME },
  { id: generateId(), description: 'Rent payment', amount: 500000, date: '2023-10-24', type: TransactionType.EXPENSE },
  { id: generateId(), description: 'Customer payment', amount: 100000, date: '2023-10-23', type: TransactionType.INCOME },
];

const initialBorrows: BorrowRecord[] = [
    { id: generateId(), lender: 'Family Friend', amount: 1000000, amountPaid: 250000, date: '2023-09-01', dueDate: '2024-03-01', status: 'Partially Paid' },
    { id: generateId(), lender: 'Bank Loan', amount: 5000000, amountPaid: 5000000, date: '2023-01-15', dueDate: '2023-07-15', status: 'Paid' },
];

const initialWholesalers: Wholesaler[] = [
    { id: generateId(), name: 'Kampala General Supplies', contact: '0701234567', productCategory: 'Groceries' },
    { id: generateId(), name: 'Mukwano Industries', contact: '0711234567', productCategory: 'Soap & Oil' },
];

const initialBodaDrivers: BodaDriver[] = [
    { id: generateId(), name: 'Musoke', phone: '0791234567', available: true },
    { id: generateId(), name: 'Okello', phone: '0761234567', available: false },
];

const initialTasks: Task[] = [
    { id: generateId(), title: 'Restock sugar', dueDate: '2023-10-28', status: 'Pending' },
    { id: generateId(), title: 'Pay electricity bill', dueDate: '2023-10-30', status: 'In Progress' },
    { id: generateId(), title: 'Follow up with Jane Smith', dueDate: '2023-10-26', status: 'Completed' },
];

export const useMockData = () => {
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
    const [stock, setStock] = useState<StockItem[]>(initialStock);
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [borrows, setBorrows] = useState<BorrowRecord[]>(initialBorrows);
    const [wholesalers, setWholesalers] = useState<Wholesaler[]>(initialWholesalers);
    const [bodaDrivers, setBodaDrivers] = useState<BodaDriver[]>(initialBodaDrivers);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    // Functions to modify data will be in AppContext, this hook just provides the state.
    return {
        customers, setCustomers,
        stock, setStock,
        transactions, setTransactions,
        borrows, setBorrows,
        wholesalers, setWholesalers,
        bodaDrivers, setBodaDrivers,
        tasks, setTasks
    };
};
