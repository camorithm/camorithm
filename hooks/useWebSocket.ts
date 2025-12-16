import { useEffect, useState, useCallback } from 'react';

/**
 * WebSocket Hook for Real-time Market Data
 * 
 * Usage:
 * const { price, connected, error } = useWebSocket('EURUSD');
 */

interface MarketData {
  symbol: string;
  bid: number;
  ask: number;
  timestamp: number;
}

interface UseWebSocketReturn {
  price: number;
  bid: number;
  ask: number;
  connected: boolean;
  error: string | null;
  reconnect: () => void;
}

export const useWebSocket = (symbol: string): UseWebSocketReturn => {
  const [price, setPrice] = useState<number>(0);
  const [bid, setBid] = useState<number>(0);
  const [ask, setAsk] = useState<number>(0);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const connect = useCallback(() => {
    try {
      // TODO: Replace with your actual WebSocket URL
      const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'wss://stream.example.com/market';
      
      const socket = new WebSocket(wsUrl);
      
      socket.onopen = () => {
        console.log(`WebSocket connected for ${symbol}`);
        setConnected(true);
        setError(null);
        
        // Subscribe to symbol
        socket.send(JSON.stringify({
          action: 'subscribe',
          symbol,
          channel: 'price'
        }));
      };
      
      socket.onmessage = (event) => {
        try {
          const data: MarketData = JSON.parse(event.data);
          
          if (data.symbol === symbol) {
            setPrice(data.bid);
            setBid(data.bid);
            setAsk(data.ask);
          }
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };
      
      socket.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('Connection error');
        setConnected(false);
      };
      
      socket.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        setConnected(false);
        
        // Attempt to reconnect after 5 seconds
        if (event.code !== 1000) { // 1000 = normal closure
          setTimeout(() => {
            console.log('Attempting to reconnect...');
            connect();
          }, 5000);
        }
      };
      
      setWs(socket);
      
    } catch (err) {
      console.error('Failed to connect WebSocket:', err);
      setError(err instanceof Error ? err.message : 'Connection failed');
    }
  }, [symbol]);

  const reconnect = useCallback(() => {
    if (ws) {
      ws.close();
    }
    connect();
  }, [ws, connect]);

  useEffect(() => {
    connect();
    
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [symbol, connect]);

  return { 
    price, 
    bid,
    ask,
    connected, 
    error,
    reconnect
  };
};

/**
 * Alternative: Use polling instead of WebSocket
 * This is more compatible and doesn't require WebSocket setup
 */
export const usePollingPrice = (symbol: string, intervalMs: number = 5000): UseWebSocketReturn => {
  const [price, setPrice] = useState<number>(0);
  const [bid, setBid] = useState<number>(0);
  const [ask, setAsk] = useState<number>(0);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      const response = await fetch(`/api/forex-rates?symbols=${symbol.substring(0, 3)}&base=${symbol.substring(3, 6)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch price');
      }
      
      const data = await response.json();
      
      if (data.success && data.rates) {
        const rate = Object.values(data.rates)[0] as number;
        const calculatedPrice = 1 / rate;
        const spread = symbol.includes('JPY') ? 0.02 : 0.0002;
        
        setBid(calculatedPrice - spread);
        setAsk(calculatedPrice + spread);
        setPrice(calculatedPrice);
        setConnected(true);
        setError(null);
      }
    } catch (err) {
      console.error('Failed to fetch price:', err);
      setError(err instanceof Error ? err.message : 'Fetch failed');
      setConnected(false);
    }
  }, [symbol]);

  const reconnect = useCallback(() => {
    fetchPrice();
  }, [fetchPrice]);

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, intervalMs);
    
    return () => {
      clearInterval(interval);
    };
  }, [symbol, intervalMs, fetchPrice]);

  return {
    price,
    bid,
    ask,
    connected,
    error,
    reconnect
  };
};

/**
 * Example Usage in Component:
 * 
 * // Using WebSocket (requires WebSocket server)
 * const { price, connected } = useWebSocket('EURUSD');
 * 
 * // Using polling (works out of the box)
 * const { price, connected } = usePollingPrice('EURUSD', 5000);
 * 
 * return (
 *   <div>
 *     {connected ? (
 *       <span>Price: {price.toFixed(4)}</span>
 *     ) : (
 *       <span>Connecting...</span>
 *     )}
 *   </div>
 * );
 */