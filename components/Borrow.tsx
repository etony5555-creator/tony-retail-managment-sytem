
import React from 'react';
import Card from './common/Card';
import Button from './common/Button';

const Borrow: React.FC = () => {
  return (
    <Card className="animate-fade-in">
        <h2 className="font-bold text-xl text-white mb-4">Borrow & Loan Management</h2>
        <div className="text-center text-gray-400 p-8 border-2 border-dashed border-dark-border rounded-lg">
            <p className="mb-4">This feature is under development.</p>
            <p className="text-sm">Here you will be able to manage money borrowed from suppliers or loans taken for your business.</p>
            <div className="mt-6">
                <Button disabled>Request Loan</Button>
            </div>
        </div>
    </Card>
  );
};

export default Borrow;
