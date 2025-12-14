'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PricePoint {
  time: number;
  price: number;
}

interface MiniChartProps {
  symbol: string;
  basePrice?: number;
  dataPoints?: number;
  updateInterval?: number;
  height?: number;
}

export const MiniPriceChart: React.FC<MiniChartProps> = ({
  symbol,
  basePrice = 100,
  dataPoints = 30,
  updateInterval = 2000,
  height = 60,
}) => {
  const [data, setData] = useState<PricePoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState(basePrice);

  // Initialize data
  useEffect(() => {
    const initialData: PricePoint[] = [];
    let price = basePrice;

    for (let i = 0; i < dataPoints; i++) {
      price += (Math.random() - 0.5) * (basePrice * 0.001);
      initialData.push({
        time: Date.now() - (dataPoints - i) * updateInterval,
        price,
      });
    }

    setData(initialData);
    setCurrentPrice(price);
  }, [basePrice, dataPoints, updateInterval]);

  // Update data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newPrice = prev[prev.length - 1].price + (Math.random() - 0.5) * (basePrice * 0.001);
        const newPoint = {
          time: Date.now(),
          price: newPrice,
        };
        
        setCurrentPrice(newPrice);
        
        // Keep only last N points
        const updated = [...prev.slice(1), newPoint];
        return updated;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [basePrice, updateInterval]);

  if (data.length === 0) return null;

  const firstPrice = data[0].price;
  const lastPrice = data[data.length - 1].price;
  const change = lastPrice - firstPrice;
  const changePercent = (change / firstPrice) * 100;
  const isPositive = change >= 0;
  const isFlat = Math.abs(changePercent) < 0.01;

  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));

  return (
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-4 hover:border-blue-500/30 transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-slate-500 mb-1">{symbol}</div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
            {currentPrice.toFixed(5)}
          </div>
        </div>
        
        <div className={`flex items-center gap-1 text-sm font-bold ${
          isFlat ? 'text-slate-500' :
          isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {isFlat ? <Minus size={14} /> : isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-900 text-white px-2 py-1 rounded text-xs font-mono">
                    {payload[0].value?.toFixed(5)}
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isFlat ? '#64748b' : isPositive ? '#22c55e' : '#ef4444'}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Range */}
      <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
        <span>L: {minPrice.toFixed(5)}</span>
        <span>H: {maxPrice.toFixed(5)}</span>
      </div>
    </div>
  );
};

// Grid of Mini Charts
export const MiniChartsGrid: React.FC<{
  symbols?: Array<{ name: string; basePrice: number }>;
}> = ({ 
  symbols = [
    { name: 'EURUSD', basePrice: 1.0824 },
    { name: 'GBPUSD', basePrice: 1.2640 },
    { name: 'XAUUSD', basePrice: 2042.50 },
    { name: 'BTCUSD', basePrice: 42105.00 },
    { name: 'US30', basePrice: 36200.50 },
    { name: 'NAS100', basePrice: 16400.20 },
  ]
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {symbols.map(({ name, basePrice }) => (
        <MiniPriceChart
          key={name}
          symbol={name}
          basePrice={basePrice}
          dataPoints={30}
          updateInterval={2000}
          height={60}
        />
      ))}
    </div>
  );
};