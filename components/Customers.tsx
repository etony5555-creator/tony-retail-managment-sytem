import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const Customers: React.FC = () => {
  const { customers, addCustomer } = useContext(AppContext) as AppContextType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCustomerName.trim()) {
      addCustomer({ name: newCustomerName.trim() });
      setNewCustomerName('');
      setIsModalOpen(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'UGX',
    }).format(val).replace('UGX', 'UGX ');
  };

  return (
    <>
      <Card className="animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              <h2 className="font-bold text-xl text-white">Customer Management</h2>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-auto bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan focus:border-glow-cyan outline-none"
                />
                <Button onClick={() => setIsModalOpen(true)}>Add Customer</Button>
              </div>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left">
                  <thead>
                      <tr className="border-b border-dark-border text-sm text-gray-400">
                          <th className="p-3">Name</th>
                          <th className="p-3">Debt</th>
                          <th className="p-3">Last Seen</th>
                          <th className="p-3">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredCustomers.map(customer => (
                          <tr key={customer.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                              <td className="p-3 font-medium text-white">{customer.name}</td>
                              <td className={`p-3 font-mono ${customer.debt > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                  {formatCurrency(customer.debt)}
                              </td>
                              <td className="p-3">{customer.lastSeen}</td>
                              <td className="p-3">
                                  <Button variant="secondary" className="text-xs py-1 px-2">
                                      View
                                  </Button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </Card>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Customer">
        <form onSubmit={handleAddCustomer} className="space-y-4">
            <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-400 mb-1">
                    Customer Name
                </label>
                <input
                    type="text"
                    id="customerName"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    required
                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan focus:border-glow-cyan outline-none"
                />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Save Customer</Button>
            </div>
        </form>
      </Modal>
    </>
  );
};

export default Customers;
