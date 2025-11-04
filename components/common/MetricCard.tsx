
import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  currency?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, currency }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const startValue = 0;
    const duration = 1500;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = startValue + progress * (value - startValue);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                startTime = null; // Reset animation on re-enter
                animationFrameId = requestAnimationFrame(animate);
                observer.disconnect();
            }
        },
        { threshold: 0.5 }
    );
    
    if (cardRef.current) {
        observer.observe(cardRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if(cardRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(cardRef.current);
      }
    };
  }, [value]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val).replace('UGX', 'UGX ');
  };

  return (
    <div ref={cardRef}>
        <Card className="flex items-center space-x-4">
          <div className="p-3 bg-dark-bg rounded-full text-glow-cyan">
            {icon}
          </div>
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">
              {currency ? formatCurrency(displayValue) : Math.round(displayValue)}
            </p>
          </div>
        </Card>
    </div>
  );
};

export default MetricCard;