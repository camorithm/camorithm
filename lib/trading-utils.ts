// Trading Calculation Utilities

export interface TradeCalculation {
  pipValue: number;
  pips: number;
  profit: number;
  profitPercent: number;
  marginRequired: number;
  riskRewardRatio?: number;
}

/**
 * Get pip size for a given symbol
 */
export const getPipSize = (symbol: string): number => {
  // JPY pairs have 2 decimal places (0.01), others have 4 (0.0001)
  return symbol.includes('JPY') ? 0.01 : 0.0001;
};

/**
 * Calculate pip value per standard lot
 */
export const getPipValue = (symbol: string, accountCurrency: string = 'USD'): number => {
  const baseCurrency = symbol.substring(0, 3);
  const quoteCurrency = symbol.substring(3, 6);
  
  // For pairs where USD is the quote currency, pip value is $10/lot
  if (quoteCurrency === accountCurrency) {
    return 10;
  }
  
  // For JPY pairs, pip value is different
  if (quoteCurrency === 'JPY') {
    return 10; // Approximate, would need current USDJPY rate for exact
  }
  
  // For other pairs, would need conversion rate
  return 10; // Simplified
};

/**
 * Calculate profit/loss for a position
 */
export const calculateProfitLoss = (
  symbol: string,
  type: 'buy' | 'sell',
  openPrice: number,
  currentPrice: number,
  volume: number,
  accountCurrency: string = 'USD'
): TradeCalculation => {
  const pipSize = getPipSize(symbol);
  const pipValue = getPipValue(symbol, accountCurrency);
  
  let pips: number;
  if (type === 'buy') {
    pips = (currentPrice - openPrice) / pipSize;
  } else {
    pips = (openPrice - currentPrice) / pipSize;
  }
  
  const profit = pips * pipValue * volume;
  const contractSize = 100000; // Standard lot
  const positionValue = volume * contractSize;
  const profitPercent = (profit / positionValue) * 100;
  
  const leverage = 100; // Typical leverage
  const marginRequired = positionValue / leverage;
  
  return {
    pipValue,
    pips,
    profit,
    profitPercent,
    marginRequired
  };
};

/**
 * Calculate risk/reward ratio
 */
export const calculateRiskReward = (
  entryPrice: number,
  stopLoss: number,
  takeProfit: number,
  type: 'buy' | 'sell'
): number => {
  if (!stopLoss || !takeProfit) return 0;
  
  let risk: number;
  let reward: number;
  
  if (type === 'buy') {
    risk = entryPrice - stopLoss;
    reward = takeProfit - entryPrice;
  } else {
    risk = stopLoss - entryPrice;
    reward = entryPrice - takeProfit;
  }
  
  return reward / risk;
};

/**
 * Calculate position size based on risk percentage
 */
export const calculatePositionSize = (
  accountBalance: number,
  riskPercent: number,
  entryPrice: number,
  stopLoss: number,
  symbol: string
): number => {
  const riskAmount = accountBalance * (riskPercent / 100);
  const pipSize = getPipSize(symbol);
  const pipValue = getPipValue(symbol);
  
  const pipsToSL = Math.abs((entryPrice - stopLoss) / pipSize);
  const riskPerLot = pipsToSL * pipValue;
  
  const positionSize = riskAmount / riskPerLot;
  
  // Round to 2 decimal places
  return Math.round(positionSize * 100) / 100;
};

/**
 * Calculate margin level
 */
export const calculateMarginLevel = (
  equity: number,
  usedMargin: number
): number => {
  if (usedMargin === 0) return 0;
  return (equity / usedMargin) * 100;
};

/**
 * Format currency with appropriate decimals
 */
export const formatPrice = (price: number, symbol: string): string => {
  const decimals = symbol.includes('JPY') ? 2 : 4;
  return price.toFixed(decimals);
};

/**
 * Calculate swap/overnight interest (simplified)
 */
export const calculateSwap = (
  symbol: string,
  type: 'buy' | 'sell',
  volume: number,
  days: number = 1
): number => {
  // This is highly simplified - real swap rates vary by broker and change daily
  const swapRates: { [key: string]: { buy: number; sell: number } } = {
    EURUSD: { buy: -2.5, sell: 0.5 },
    GBPUSD: { buy: -3.0, sell: 1.0 },
    USDJPY: { buy: 1.5, sell: -4.0 },
    // Add more as needed
  };
  
  const rate = swapRates[symbol]?.[type] || 0;
  return rate * volume * days;
};

/**
 * Validate order parameters
 */
export const validateOrder = (params: {
  symbol: string;
  volume: number;
  stopLoss?: number;
  takeProfit?: number;
  entryPrice: number;
  type: 'buy' | 'sell';
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (params.volume <= 0) {
    errors.push('Volume must be greater than 0');
  }
  
  if (params.volume > 100) {
    errors.push('Volume exceeds maximum allowed');
  }
  
  if (params.stopLoss) {
    if (params.type === 'buy' && params.stopLoss >= params.entryPrice) {
      errors.push('Stop loss must be below entry price for buy orders');
    }
    if (params.type === 'sell' && params.stopLoss <= params.entryPrice) {
      errors.push('Stop loss must be above entry price for sell orders');
    }
  }
  
  if (params.takeProfit) {
    if (params.type === 'buy' && params.takeProfit <= params.entryPrice) {
      errors.push('Take profit must be above entry price for buy orders');
    }
    if (params.type === 'sell' && params.takeProfit >= params.entryPrice) {
      errors.push('Take profit must be below entry price for sell orders');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};