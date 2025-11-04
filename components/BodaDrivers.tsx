import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, BodaDriver } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const BodaDrivers: React.FC = () => {
  const { bodaDrivers, addBodaDriver, updateBodaDriver } = useContext(AppContext) as AppContextType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Omit<BodaDriver, 'id' | 'available'>>({
    name: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.phone) {
      addBodaDriver(newItem);
      setIsModalOpen(false);
      setNewItem({ name: '', phone: '' });
    }
  };

  const EmptyState = () => (
    <tr>
        <td colSpan={4} className="text-center p-8 text-gray-500">
            <div className="flex flex-col items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h2a1 1 0 001-1V7a1 1 0 00-1-1h-2" /></svg>
                <span>No Boda Boda drivers added yet.</span>
            </div>
        </td>
    </tr>
  );


  return (
    <>
      <Card className="animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl text-white">Boda Boda Riders</h2>
          <Button onClick={() => setIsModalOpen(true)}>Add Driver</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-border text-sm text-gray-400">
                <th className="p-3">Name</th>
                <th className="p-3">Phone Number</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bodaDrivers.length > 0 ? bodaDrivers.map(driver => (
                <tr key={driver.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                  <td className="p-3 font-medium text-white">{driver.name}</td>
                  <td className="p-3 font-mono">{driver.phone}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => updateBodaDriver({ ...driver, available: !driver.available })}
                      className={`text-xs font-semibold w-24 text-center py-1 px-2 uppercase rounded-full transition-colors ${
                        driver.available 
                        ? 'text-green-100 bg-green-600/70 hover:bg-green-500/70' 
                        : 'text-yellow-100 bg-yellow-500/70 hover:bg-yellow-400/70'
                      }`}
                    >
                        {driver.available ? 'Available' : 'On Trip'}
                    </button>
                  </td>
                  <td className="p-3">
                    <Button as="a" href={`tel:${driver.phone}`} variant="secondary" className="text-xs py-1 px-2">
                      Call
                    </Button>
                  </td>
                </tr>
              )) : <EmptyState />}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Boda Driver">
        <form onSubmit={handleAddItem} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Driver Name</label>
            <input type="text" name="name" value={newItem.name} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
            <input type="text" name="phone" value={newItem.phone} onChange={handleInputChange} required className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-white focus:ring-2 focus:ring-glow-cyan outline-none" />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save Driver</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default BodaDrivers;
