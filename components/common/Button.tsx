import React from 'react';

// FIX: Changed props to a discriminated union to support both button and anchor elements type-safely.
// This allows for passing `href` when `as="a"`, and button-specific attributes when `as="button"`.
type ButtonAsButton = {
  as?: 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = {
  as: 'a';
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
} & (ButtonAsButton | ButtonAsAnchor);

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold text-white transition-all duration-150 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg active:scale-95 inline-block text-center';
  
  const variantClasses = {
    primary: 'bg-glow-cyan hover:bg-cyan-400 shadow-lg active:shadow-md active:translate-y-px border-b-4 border-cyan-700 active:border-b-2',
    secondary: 'bg-dark-border hover:bg-gray-600 shadow-lg active:shadow-md active:translate-y-px border-b-4 border-gray-700 active:border-b-2',
  };
  
  // FIX: Type-safe rendering based on `as` prop. The component signature was changed
  // to not destructure `as` and `className` to allow for type narrowing.
  if (props.as === 'a') {
    const { as, className, ...rest } = props;
    const finalClassName = `${baseClasses} ${variantClasses[variant]} ${className || ''}`;
    return (
      <a className={finalClassName} {...rest}>
        {children}
      </a>
    );
  }

  const { as, className, ...rest } = props;
  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${className || ''}`;
  return (
    <button className={finalClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
