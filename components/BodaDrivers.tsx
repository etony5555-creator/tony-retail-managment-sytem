
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../types';
import Card from './common/Card';
import Button from './common/Button';

const BodaDrivers: React.FC = () => {
  const { bodaDrivers } = useContext(AppContext) as AppContextType;

  return (
    <Card className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-white">Boda Boda Riders</h2>
        <Button>Add Driver</Button>
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
  );
};

export default BodaDrivers;
