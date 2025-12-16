'use client';

import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  autosize?: boolean;
  interval?: string;
  timezone?: string;
  style?: string;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  allow_symbol_change?: boolean;
  container_id?: string;
}

export const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol = 'FX:EURUSD',
  theme = 'dark',
  autosize = true,
  interval = 'D',
  timezone = 'Etc/UTC',
  style = '1',
  locale = 'en',
  toolbar_bg = '#f1f3f6',
  enable_publishing = false,
  allow_symbol_change = true,
  container_id = 'tradingview_chart'
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Clear any existing widget
    container.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined' && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          autosize,
          symbol,
          interval,
          timezone,
          theme,
          style,
          locale,
          toolbar_bg,
          enable_publishing,
          allow_symbol_change,
          container_id,
          // Advanced options
          hide_side_toolbar: false,
          withdateranges: true,
          hide_top_toolbar: false,
          save_image: true,
          studies: [
            'STD;SMA'
          ],
          show_popup_button: true,
          popup_width: '1000',
          popup_height: '650'
        });
      }
    };

    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, theme, interval, autosize, timezone, style, locale, toolbar_bg, enable_publishing, allow_symbol_change, container_id]);

  return (
    <div 
      className="tradingview-widget-container" 
      ref={container}
      style={{ height: '100%', width: '100%' }}
    >
      <div 
        id={container_id} 
        style={{ height: 'calc(100% - 32px)', width: '100%' }}
      />
      <div className="tradingview-widget-copyright">
        <a 
          href={`https://www.tradingview.com/symbols/${symbol.replace('FX:', '')}/`}
          rel="noopener noreferrer" 
          target="_blank"
        >
          <span className="blue-text">{symbol} Chart</span>
        </a> by TradingView
      </div>
    </div>
  );
};

// Usage example:
// <TradingViewWidget symbol="FX:EURUSD" theme="dark" interval="15" />