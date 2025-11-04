import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, Wholesaler } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const Wholesalers: React.FC = () => {
  const { wholesalers, addWholesaler, updateWholesaler } = useContext(AppContext) as AppContextType;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Wholesaler | null>(null);
  
  const initialFormState = { name: '', contact: '', productCategory: '' };
  const [formState, setFormState] = useState(initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (e: React.FormEvent) => {
      e.preventDefault();
      if (formState.name && formState.contact && formState.productCategory) {
          addWholesaler(formState);
          setIsAddModalOpen(false);
          setFormState(initialFormState);
      }
  };
  
  const handleEditClick = (item: Wholesaler) => {
      setEditingItem(item);
      setFormState({
          name: item.name,
          contact: item.contact,
          productCategory: item.productCategory,
      });
      setIsEditModalOpen(true);
  };
  
  const handleUpdateItem = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingItem) {
          updateWholesaler({ ...editingItem, ...formState });
          setIsEditModalOpen(false);
          setEditingItem(null);
          setFormState(initialFormState);
      }
  };
  
  const EmptyState = () => (
    <tr>
        <td colSpan={4} className="text-center p-8 text-gray-500">
            <div className="flex flex-col items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293a1 1 0 010 1.414L5.414 8l2.293 2.293a1 1 0 11-1.414 1.414L4 9.414l-2.293 2.293a1 1 0 11-1.414-1.414L2.586 8 0.293 5.707a1 1 0 011.414-1.414L4 6.586l2.293-2.293a1 1 0 011.414 0z" /></svg>
                <span>No wholesalers added yet.</span>
            </div>
        </td>
    </tr>
  );

  const renderModal = (title: string, onSubmit: (e: React.FormEvent) => void, buttonText: string) => (
      <Modal isOpen={isAddModalOpen || isEditModalOpen} onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} title={title}>
          <form onSubmit={onSubmit} className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Wholesaler Name</label>
                  <input type="text" name="name" value={formState.name} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Contact Number</label>
                  <input type="text" name="contact" value={formState.contact} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Product Category</label>
                  <input type="text" name="productCategory" value={formState.productCategory} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
              </div>
              <div className="flex justify-end">
                  <Button type="submit">{buttonText}</Button>
              </div>
          </form>
      </Modal>
  );

  return (
    <>
      <Card className="animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl text-white">Wholesalers & Suppliers</h2>
          <Button onClick={() => { setFormState(initialFormState); setIsAddModalOpen(true); }}>Add Wholesaler</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-border text-sm text-gray-400">
                <th className="p-3">Name</th>
                <th className="p-3">Contact Number</th>
                <th className="p-3">Product Category</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wholesalers.length > 0 ? wholesalers.map(wholesaler => (
                <tr key={wholesaler.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                  <td className="p-3 font-medium text-white">{wholesaler.name}</td>
                  <td className="p-3 font-mono">{wholesaler.contact}</td>
                  <td className="p-3">{wholesaler.productCategory}</td>
                  <td className="p-3 flex gap-2">
                    <Button as="a" href={`tel:${wholesaler.contact}`} variant="secondary" className="text-xs py-1 px-2">
                      Call
                    </Button>
                    <Button variant="secondary" className="text-xs py-1 px-2" onClick={() => handleEditClick(wholesaler)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              )) : <EmptyState />}
            </tbody>
          </table>
        </div>
      </Card>

      {isAddModalOpen && renderModal("Add New Wholesaler", handleAddItem, "Save Wholesaler")}
      {isEditModalOpen && renderModal("Edit Wholesaler", handleUpdateItem, "Save Changes")}
    </>
  );
};

export default Wholesalers;
