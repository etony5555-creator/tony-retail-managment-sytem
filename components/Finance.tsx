import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, Transaction } from '../types';
import { TransactionType } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const Finance: React.FC = () => {
  const { transactions, addTransaction } = useContext(AppContext) as AppContextType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<TransactionType>(TransactionType.INCOME);
  
  const initialFormState = { description: '', amount: '', date: new Date().toISOString().split('T')[0] };
  const [formState, setFormState] = useState(initialFormState);

  const openModal = (type: TransactionType) => {
    setModalType(type);
    setFormState(initialFormState);
    setIsModalOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === 'amount' && value && !/^\d*$/.test(value)) return;
      setFormState(prev => ({...prev, [name]: value }));
  };
  
  const handleAddTransaction = (e: React.FormEvent) => {
      e.preventDefault();
      if(formState.description && Number(formState.amount) > 0) {
          addTransaction({ 
              description: formState.description,
              amount: Number(formState.amount),
              date: formState.date,
              type: modalType 
          });
          setIsModalOpen(false);
      }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'UGX',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(val).replace('UGX', 'UGX ');
  };
  
  const EmptyState = () => (
    <tr>
        <td colSpan={4} className="text-center p-8 text-gray-500">
            <div className="flex flex-col items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span>No transactions recorded yet.</span>
            </div>
        </td>
    </tr>
  );

  return (
    <>
    <Card className="animate-fade-in">
        <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-white">Financial Ledger</h2>
            <div className="space-x-2">
                <Button onClick={() => openModal(TransactionType.INCOME)}>Add Income</Button>
                <Button variant="secondary" onClick={() => openModal(TransactionType.EXPENSE)}>Add Expense</Button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-dark-border text-sm text-gray-400">
                        <th className="p-3">Date</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Type</th>
                        <th className="p-3 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? [...transactions].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(transaction => (
                        <tr key={transaction.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                            <td className="p-3 text-gray-400">{transaction.date}</td>
                            <td className="p-3 font-medium text-white">{transaction.description}</td>
                            <td className="p-3">
                                <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                                    transaction.type === TransactionType.INCOME 
                                    ? 'text-green-100 bg-green-600/70' 
                                    : 'text-red-100 bg-red-600/80'
                                }`}>
                                    {transaction.type}
                                </span>
                            </td>
                            <td className={`p-3 text-right font-mono ${
                                transaction.type === TransactionType.INCOME ? 'text-green-400' : 'text-red-400'
                            }`}>
                                {formatCurrency(transaction.amount)}
                            </td>
                        </tr>
                    )) : <EmptyState />}
                </tbody>
            </table>
        </div>
    </Card>

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Add ${modalType}`}>
        <form onSubmit={handleAddTransaction} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                <input type="date" name="date" value={formState.date} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <input type="text" name="description" value={formState.description} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Amount (UGX)</label>
                <input type="text" inputMode="numeric" name="amount" value={formState.amount} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Save Transaction</Button>
            </div>
        </form>
    </Modal>
    </>
  );
};

export default Finance;
