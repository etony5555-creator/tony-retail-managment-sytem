// Fix: Create the Dashboard component.
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
// FIX: The 'Page' enum is used as a value, so it must be imported as such, not as a type.
import { Page, type AppContextType } from '../types';
import MetricCard from './common/MetricCard';
import Card from './common/Card';
import Button from './common/Button';

// Icons for metrics
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const TrendingDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>;
const CashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ArchiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.978 5.978 0 0112 13a5.979 5.979 0 012.121.303m-2.121-.303a4 4 0 100-5.292m0 5.292a4 4 0 010-5.292" /></svg>;
const ExclamationCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


interface DashboardProps {
    setActivePage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
    const { 
        totalRevenue, 
        totalExpenses, 
        netProfit, 
        totalStockValue, 
        totalDebt, 
        totalCreditExtended,
        stock,
        tasks
    } = useContext(AppContext) as AppContextType;

    const lowStockItems = stock.filter(item => item.quantity <= item.lowStockThreshold);
    const pendingTasks = tasks.filter(task => task.status !== 'Completed');

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard title="Total Revenue" value={totalRevenue} icon={<TrendingUpIcon />} currency="UGX" />
                <MetricCard title="Total Expenses" value={totalExpenses} icon={<TrendingDownIcon />} currency="UGX" />
                <MetricCard title="Net Profit" value={netProfit} icon={<CashIcon />} currency="UGX" />
                <MetricCard title="Total Stock Value" value={totalStockValue} icon={<ArchiveIcon />} currency="UGX" />
                <MetricCard title="Outstanding Debt" value={totalDebt} icon={<ExclamationCircleIcon />} currency="UGX" />
                <MetricCard title="Credit to Customers" value={totalCreditExtended} icon={<UsersIcon />} currency="UGX" />
            </div>

            {/* Quick Actions & Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold text-lg text-white">Low Stock Items ({lowStockItems.length})</h2>
                        <Button variant="secondary" className="text-sm py-1 px-3" onClick={() => setActivePage(Page.Stock)}>View Stock</Button>
                    </div>
                    {lowStockItems.length > 0 ? (
                        <ul className="space-y-2 text-sm">
                            {lowStockItems.slice(0, 3).map(item => (
                                <li key={item.id} className="flex justify-between p-2 rounded bg-dark-bg/50">
                                    <span>{item.name}</span>
                                    <span className="font-mono text-red-400">{item.quantity} left</span>
                                </li>
                            ))}
                            {lowStockItems.length > 3 && <li className="text-center text-gray-400">...and {lowStockItems.length - 3} more</li>}
                        </ul>
                    ) : <p className="text-gray-400 text-sm">No items are running low on stock.</p>}
                </Card>

                <Card>
                     <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold text-lg text-white">Pending Tasks ({pendingTasks.length})</h2>
                        <Button variant="secondary" className="text-sm py-1 px-3" onClick={() => setActivePage(Page.Tasks)}>View Tasks</Button>
                    </div>
                     {pendingTasks.length > 0 ? (
                        <ul className="space-y-2 text-sm">
                            {pendingTasks.slice(0, 3).map(task => (
                                <li key={task.id} className="p-2 rounded bg-dark-bg/50">
                                    <p>{task.title}</p>
                                    <p className="text-xs text-gray-400">Due: {task.dueDate}</p>
                                </li>
                            ))}
                             {pendingTasks.length > 3 && <li className="text-center text-gray-400">...and {pendingTasks.length - 3} more</li>}
                        </ul>
                    ) : <p className="text-gray-400 text-sm">All tasks are completed!</p>}
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
