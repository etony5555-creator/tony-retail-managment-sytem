import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, BodaDriver } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const BodaDrivers: React.FC = () => {
  const { bodaDrivers, addBodaDriver } = useContext(AppContext) as AppContextType;
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
              {bodaDrivers.map(driver => (
                <tr key={driver.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                  <td className="p-3 font-medium text-white">{driver.name}</td>
                  <td className="p-3 font-mono">{driver.phone}</td>
                  <td className="p-3">
                    {driver.available ? (
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200/70">
                        Available
                      </span>
                    ) : (
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200/70">
                        On Trip
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <Button variant="secondary" className="text-xs py-1 px-2">
                      Call
                    </Button>
                  </td>
                </tr>
              ))}
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