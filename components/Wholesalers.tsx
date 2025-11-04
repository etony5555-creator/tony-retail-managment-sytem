
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../types';
import Card from './common/Card';
import Button from './common/Button';

const Wholesalers: React.FC = () => {
  const { wholesalers } = useContext(AppContext) as AppContextType;

  return (
    <Card className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-white">Wholesalers & Suppliers</h2>
        <Button>Add Wholesaler</Button>
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
            {wholesalers.map(wholesaler => (
              <tr key={wholesaler.id} className="border-b border-dark-border hover:bg-dark-border/50 transition-colors">
                <td className="p-3 font-medium text-white">{wholesaler.name}</td>
                <td className="p-3 font-mono">{wholesaler.contact}</td>
                <td className="p-3">{wholesaler.productCategory}</td>
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
  );
};

export default Wholesalers;
