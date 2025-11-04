
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-dark-card/50 dark:bg-dark-card/70 backdrop-blur-sm border border-dark-border rounded-xl shadow-lg transition-all duration-300 hover:shadow-glow-cyan/50 hover:border-glow-cyan/50 p-4 md:p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
