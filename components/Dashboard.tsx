import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, BusinessInsight, Page } from '../types';
import Card from './common/Card';
import MetricCard from './common/MetricCard';
import { getBusinessInsights } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


// Icons
const CurrencyDollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>;
const ExclamationCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const UserGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.28-1.254-.738-1.666M7 15a4 4 0 100-8 4 4 0 000 8z" /></svg>;
const ClipboardListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const LightBulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;

interface DashboardProps {
  setActivePage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
  const { customers, transactions, tasks, stock } = useContext(AppContext) as AppContextType;
  const [insights, setInsights] = useState<BusinessInsight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [errorInsights, setErrorInsights] = useState<string | null>(null);

  const stats = useMemo(() => {
    const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    const profit = totalIncome - totalExpense;
    const pendingDebt = customers.reduce((sum, c) => sum + c.debt, 0);
    const customersWithDebt = customers.filter(c => c.debt > 0);
    return { profit, pendingDebt, customersWithDebt };
  }, [customers, transactions]);
  
  const chartData = useMemo(() => {
    const monthlyData: { [key: string]: number } = {};
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short' });
      if (!monthlyData[month]) monthlyData[month] = 0;
      monthlyData[month] += t.type === 'Income' ? t.amount : -t.amount;
    });

    return Object.entries(monthlyData)
      .map(([name, profit]) => ({ name, profit }))
      .reverse(); // simple sort for demo
  }, [transactions]);


  const fetchInsights = () => {
    setLoadingInsights(true);
    setErrorInsights(null);
    getBusinessInsights(customers, stock, transactions)
      .then(setInsights)
      .catch(err => setErrorInsights(err.message))
      .finally(() => setLoadingInsights(false));
  };
  
  useEffect(() => {
    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard title="Monthly Profit/Loss" value={stats.profit} icon={<CurrencyDollarIcon />} currency="UGX" />
        <MetricCard title="Pending Debt" value={stats.pendingDebt} icon={<ExclamationCircleIcon />} currency="UGX" />
        <MetricCard title="Customers with Debt" value={stats.customersWithDebt.length} icon={<UserGroupIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <h2 className="font-bold text-lg mb-4 text-white">Shop Growth (Profit)</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D' }} />
                        <Line type="monotone" dataKey="profit" stroke="#00A9FF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <Card>
          <h2 className="font-bold text-lg mb-4 text-white">Customers with Debt</h2>
          <ul className="space-y-3">
            {stats.customersWithDebt.slice(0, 4).map(c => (
              <li key={c.id} className="flex justify-between items-center text-sm">
                <span>{c.name}</span>
                <span className="font-mono text-red-400">UGX {c.debt.toFixed(2)}</span>
              </li>
            ))}
          </ul>
           {stats.customersWithDebt.length > 4 && (
            <button onClick={() => setActivePage('Customers' as Page)} className="text-sm text-glow-cyan mt-4 block text-left w-full hover:underline">
              View All Customers
            </button>
           )}
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-white flex items-center"><LightBulbIcon /> <span className="ml-2">AI Business Insights</span></h2>
            <button onClick={fetchInsights} disabled={loadingInsights} className="text-xs text-gray-400 hover:text-white disabled:opacity-50">
                {loadingInsights ? 'Generating...' : 'Regenerate'}
            </button>
          </div>
          {loadingInsights && <div className="text-center p-4">Loading insights...</div>}
          {errorInsights && <div className="text-center p-4 text-red-400">{errorInsights}</div>}
          {!loadingInsights && !errorInsights && (
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="p-3 bg-dark-bg/50 rounded-lg animate-slide-in" style={{animationDelay: `${index * 100}ms`}}>
                  <h3 className="font-semibold text-glow-cyan">{insight.title}</h3>
                  <p className="text-sm text-gray-300">{insight.suggestion}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

         <Card>
          <h2 className="font-bold text-lg mb-4 text-white">Pending Tasks</h2>
          <ul className="space-y-3">
            {tasks.filter(t => !t.completed).slice(0,3).map(task => (
              <li key={task.id} className="flex items-start space-x-3 text-sm">
                <ClipboardListIcon />
                <span>{task.title}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => setActivePage('Tasks' as Page)} className="text-sm text-glow-cyan mt-4 block text-left w-full hover:underline">
            View All Tasks
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;