import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  as?: 'button' | 'a';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', as = 'button', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold text-white transition-all duration-150 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg active:scale-95 inline-block text-center';
  
  const variantClasses = {
    primary: 'bg-glow-cyan hover:bg-cyan-400 shadow-lg active:shadow-md active:translate-y-px border-b-4 border-cyan-700 active:border-b-2',
    secondary: 'bg-dark-border hover:bg-gray-600 shadow-lg active:shadow-md active:translate-y-px border-b-4 border-gray-700 active:border-b-2',
  };
  
  const Component = as;

  return (
    <Component className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Button;
