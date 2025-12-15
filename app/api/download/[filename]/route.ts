// File: app/api/download/[filename]/route.ts
// Serve EA files for download
// Fixed for Next.js 15+ (params are now async)

import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }  // ← Now a Promise
) {
  // Await the params (Next.js 15+ requirement)
  const { filename } = await params;

  // Only allow downloading EA files
  if (!filename.match(/^PropFirmSync\.(mq4|mq5)$/)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  try {
    const content = filename.endsWith('.mq4') ? MT4_EA_CONTENT : MT5_EA_CONTENT;
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}

// MT4 EA Content (from PropFirmSync.mq4)
const MT4_EA_CONTENT = `//+------------------------------------------------------------------+
//|                                           PropFirmSync.mq4       |
//|                                  PropFirm Trade Sync EA          |
//|                                  Syncs trades to your dashboard  |
//+------------------------------------------------------------------+
#property copyright "PropFirm"
#property link      "https://your-site.vercel.app"
#property version   "1.00"
#property strict

// Input parameters
input string API_URL = "https://your-site.vercel.app/api/mt4/sync"; // Your API endpoint
input string API_KEY = "your-api-key-here"; // Your API key from dashboard
input int    SYNC_INTERVAL = 60; // Sync every 60 seconds
input bool   SYNC_HISTORY = true; // Sync historical trades on first run

// Global variables
datetime lastSyncTime = 0;
bool firstRun = true;

//+------------------------------------------------------------------+
//| Expert initialization function                                     |
//+------------------------------------------------------------------+
int OnInit()
{
   Print("PropFirm Sync EA Started");
   Print("API URL: ", API_URL);
   Print("Sync Interval: ", SYNC_INTERVAL, " seconds");
   
   // Test connection
   if(TestConnection())
   {
      Print("✓ Connection to API successful!");
      
      // Sync historical trades if enabled
      if(SYNC_HISTORY && firstRun)
      {
         Print("Syncing historical trades...");
         SyncHistoricalTrades();
      }
   }
   else
   {
      Print("✗ Failed to connect to API. Check your API_URL and API_KEY.");
      return(INIT_FAILED);
   }
   
   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                   |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   Print("PropFirm Sync EA Stopped");
}

//+------------------------------------------------------------------+
//| Expert tick function                                               |
//+------------------------------------------------------------------+
void OnTick()
{
   // Check if it's time to sync
   if(TimeCurrent() - lastSyncTime >= SYNC_INTERVAL)
   {
      SyncTrades();
      lastSyncTime = TimeCurrent();
   }
}

//+------------------------------------------------------------------+
//| Test API connection                                                |
//+------------------------------------------------------------------+
bool TestConnection()
{
   string headers = "Content-Type: application/json\\r\\nX-API-Key: " + API_KEY + "\\r\\n";
   char post[];
   char result[];
   string resultHeaders;
   
   int res = WebRequest(
      "GET",
      API_URL,
      headers,
      5000, // 5 second timeout
      post,
      result,
      resultHeaders
   );
   
   if(res == 200)
   {
      string response = CharArrayToString(result);
      Print("Connection test response: ", response);
      return true;
   }
   else
   {
      Print("Connection test failed. Error code: ", res);
      Print("Make sure ", API_URL, " is added to allowed URLs in Tools -> Options -> Expert Advisors");
      return false;
   }
}

//+------------------------------------------------------------------+
//| Sync current open and closed trades                               |
//+------------------------------------------------------------------+
void SyncTrades()
{
   int total = OrdersTotal();
   
   // Sync open trades
   for(int i = 0; i < total; i++)
   {
      if(OrderSelect(i, SELECT_BY_POS, MODE_TRADES))
      {
         SendTradeToAPI(OrderTicket(), false);
      }
   }
   
   // Sync recently closed trades (last 100)
   int historyTotal = OrdersHistoryTotal();
   int startPos = MathMax(0, historyTotal - 100);
   
   for(int i = startPos; i < historyTotal; i++)
   {
      if(OrderSelect(i, SELECT_BY_POS, MODE_HISTORY))
      {
         SendTradeToAPI(OrderTicket(), true);
      }
   }
   
   firstRun = false;
}

//+------------------------------------------------------------------+
//| Sync historical trades (first run only)                           |
//+------------------------------------------------------------------+
void SyncHistoricalTrades()
{
   int total = OrdersHistoryTotal();
   int synced = 0;
   
   Print("Found ", total, " historical trades");
   
   for(int i = 0; i < total; i++)
   {
      if(OrderSelect(i, SELECT_BY_POS, MODE_HISTORY))
      {
         if(SendTradeToAPI(OrderTicket(), true))
         {
            synced++;
         }
         
         // Progress update every 10 trades
         if(synced % 10 == 0)
         {
            Print("Synced ", synced, " / ", total, " trades...");
         }
      }
   }
   
   Print("Historical sync complete! Synced ", synced, " trades.");
}

//+------------------------------------------------------------------+
//| Send trade data to API                                            |
//+------------------------------------------------------------------+
bool SendTradeToAPI(int ticket, bool isClosed)
{
   if(!OrderSelect(ticket, SELECT_BY_TICKET))
   {
      Print("Failed to select order: ", ticket);
      return false;
   }
   
   // Build JSON payload
   string json = "{";
   json += "\\"ticket\\":" + IntegerToString(OrderTicket()) + ",";
   json += "\\"symbol\\":\\"" + OrderSymbol() + "\\",";
   json += "\\"type\\":" + IntegerToString(OrderType()) + ",";
   json += "\\"lots\\":" + DoubleToString(OrderLots(), 2) + ",";
   json += "\\"open_price\\":" + DoubleToString(OrderOpenPrice(), 5) + ",";
   json += "\\"open_time\\":\\"" + TimeToString(OrderOpenTime(), TIME_DATE|TIME_SECONDS) + "\\",";
   
   if(isClosed)
   {
      json += "\\"close_price\\":" + DoubleToString(OrderClosePrice(), 5) + ",";
      json += "\\"close_time\\":\\"" + TimeToString(OrderCloseTime(), TIME_DATE|TIME_SECONDS) + "\\",";
   }
   else
   {
      json += "\\"close_price\\":null,";
      json += "\\"close_time\\":null,";
   }
   
   json += "\\"profit\\":" + DoubleToString(OrderProfit(), 2) + ",";
   json += "\\"commission\\":" + DoubleToString(OrderCommission(), 2) + ",";
   json += "\\"swap\\":" + DoubleToString(OrderSwap(), 2) + ",";
   json += "\\"comment\\":\\"" + OrderComment() + "\\",";
   json += "\\"magic_number\\":" + IntegerToString(OrderMagicNumber());
   json += "}";
   
   // Prepare HTTP request
   string headers = "Content-Type: application/json\\r\\nX-API-Key: " + API_KEY + "\\r\\n";
   char post[];
   char result[];
   string resultHeaders;
   
   StringToCharArray(json, post, 0, StringLen(json));
   
   // Send request
   int res = WebRequest(
      "POST",
      API_URL,
      headers,
      5000, // 5 second timeout
      post,
      result,
      resultHeaders
   );
   
   if(res == 200)
   {
      string response = CharArrayToString(result);
      // Print("Trade ", ticket, " synced: ", response);
      return true;
   }
   else
   {
      Print("Failed to sync trade ", ticket, ". Error code: ", res);
      return false;
   }
}

//+------------------------------------------------------------------+
`;

// MT5 EA Content (simplified version)
const MT5_EA_CONTENT = `//+------------------------------------------------------------------+
//|                                           PropFirmSync.mq5       |
//|                                  PropFirm Trade Sync EA (MT5)    |
//+------------------------------------------------------------------+
#property copyright "PropFirm"
#property link      "https://your-site.vercel.app"
#property version   "1.00"

// Input parameters
input string API_URL = "https://your-site.vercel.app/api/mt4/sync";
input string API_KEY = "your-api-key-here";
input int    SYNC_INTERVAL = 60;
input bool   SYNC_HISTORY = true;

// Global variables
datetime lastSyncTime = 0;
bool firstRun = true;

int OnInit()
{
   Print("PropFirm Sync EA Started (MT5)");
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
   Print("PropFirm Sync EA Stopped");
}

void OnTick()
{
   if(TimeCurrent() - lastSyncTime >= SYNC_INTERVAL)
   {
      // Sync logic here (see full version in PropFirmSync.mq5)
      lastSyncTime = TimeCurrent();
   }
}
//+------------------------------------------------------------------+
`;