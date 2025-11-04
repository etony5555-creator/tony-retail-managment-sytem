import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, Customer } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const Customers: React.FC = () => {
  const { customers, addCustomer, updateCustomer } = useContext(AppContext) as AppContextType;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editForm, setEditForm] = useState({ name: '', debt: '' });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCustomerName.trim()) {
      addCustomer({ name: newCustomerName.trim() });
      setNewCustomerName('');
      setIsAddModalOpen(false);
    }
  };
  
  const handleUpdateCustomer = (e: React.FormEvent) => {
      e.preventDefault();
      if(selectedCustomer) {
          updateCustomer({
              ...selectedCustomer,
              name: editForm.name,
              debt: Number(editForm.debt) || 0
          });
          setIsEditModalOpen(false);
      }
  };

  const handleEditClick = (customer: Customer) => {
      setSelectedCustomer(customer);
      setEditForm({ name: customer.name, debt: String(customer.debt) });
      setIsEditModalOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === 'debt' && value && !/^\d*$/.test(value)) return;
      setEditForm(prev => ({...prev, [name]: value }));
  };


  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.978 5.978 0 0112 13a5.979 5.979 0 012.121.303m-2.121-.303a4 4 0 100-5.292m0 5.292a4 4 0 010-5.292" /></svg>
                <span>No customers found. Try adding one!</span>
            </div>
        </td>
    </tr>
  );

  return (
    <>
      <Card className="animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              <h2 className="font-bold text-xl text-white">Customer Management</h2>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <input
                    id="search-customer"
                    type="text"
                    placeholder="Search by name..."
                    aria-label="Search customers by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-auto bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan focus:border-glow-cyan outline-none"
                />
                <Button onClick={() => setIsAddModalOpen(true)}>Add Customer</Button>
              </div>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left">
                  <thead>
                      <tr className="border-b border-dark-border text-sm text-gray-400">
                          <th scope="col" className="p-3">Name</th>
                          <th scope="col" className="p-3">Debt</th>
                          <th scope="col" className="p-3">Last Seen</th>
                          <th scope="col" className="p-3">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredCustomers.length > 0 ? filteredCustomers.map(customer => (
                          <tr key={customer.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                              <td className="p-3 font-medium text-white">{customer.name}</td>
                              <td className={`p-3 font-mono ${customer.debt > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                  {formatCurrency(customer.debt)}
                              </td>
                              <td className="p-3">{customer.lastSeen}</td>
                              <td className="p-3">
                                  <Button 
                                    variant="secondary" 
                                    className="text-xs py-1 px-2" 
                                    onClick={() => handleEditClick(customer)}
                                    aria-label={`View or edit details for ${customer.name}`}
                                  >
                                      View / Edit
                                  </Button>
                              </td>
                          </tr>
                      )) : <EmptyState />}
                  </tbody>
              </table>
          </div>
      </Card>
      
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Customer" titleId="add-customer-title">
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

      {selectedCustomer && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Customer" titleId="edit-customer-title">
            <form onSubmit={handleUpdateCustomer} className="space-y-4">
                <div>
                    <label htmlFor="edit-customer-name" className="block text-sm font-medium text-gray-400 mb-1">Customer Name</label>
                    <input id="edit-customer-name" type="text" name="name" value={editForm.name} onChange={handleEditFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
                 <div>
                    <label htmlFor="edit-customer-debt" className="block text-sm font-medium text-gray-400 mb-1">Debt (UGX)</label>
                    <input id="edit-customer-debt" type="text" inputMode="numeric" name="debt" value={editForm.debt} onChange={handleEditFormChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                </div>
            </form>
        </Modal>
      )}
    </>
  );
};

export default Customers;