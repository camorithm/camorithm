// File: lib/supabase/database.types.ts
// TypeScript types for Supabase database schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string | null
          avatar_url: string | null
          role: 'TRADER' | 'ADMIN' | 'SUPPORT'
          account_size: number | null
          account_type: 'evaluation' | 'funded' | null
          balance: number
          equity: number
          kyc_status: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'
          kyc_documents: Json | null
          total_trades: number
          win_rate: number
          total_profit: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          email?: string | null
          avatar_url?: string | null
          role?: 'TRADER' | 'ADMIN' | 'SUPPORT'
          account_size?: number | null
          account_type?: 'evaluation' | 'funded' | null
          balance?: number
          equity?: number
          kyc_status?: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'
          kyc_documents?: Json | null
          total_trades?: number
          win_rate?: number
          total_profit?: number
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          avatar_url?: string | null
          role?: 'TRADER' | 'ADMIN' | 'SUPPORT'
          account_size?: number | null
          account_type?: 'evaluation' | 'funded' | null
          balance?: number
          equity?: number
          kyc_status?: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'
          kyc_documents?: Json | null
          total_trades?: number
          win_rate?: number
          total_profit?: number
        }
      }
      trades: {
        Row: {
          id: string
          user_id: string
          symbol: string
          type: 'BUY' | 'SELL'
          lots: number
          entry_price: number
          exit_price: number | null
          stop_loss: number | null
          take_profit: number | null
          profit: number | null
          commission: number
          swap: number
          status: 'OPEN' | 'CLOSED' | 'PENDING'
          opened_at: string
          closed_at: string | null
          notes: string | null
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          type: 'BUY' | 'SELL'
          lots: number
          entry_price: number
          exit_price?: number | null
          stop_loss?: number | null
          take_profit?: number | null
          profit?: number | null
          commission?: number
          swap?: number
          status?: 'OPEN' | 'CLOSED' | 'PENDING'
          opened_at?: string
          closed_at?: string | null
          notes?: string | null
          tags?: string[]
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          type?: 'BUY' | 'SELL'
          lots?: number
          entry_price?: number
          exit_price?: number | null
          stop_loss?: number | null
          take_profit?: number | null
          profit?: number | null
          commission?: number
          swap?: number
          status?: 'OPEN' | 'CLOSED' | 'PENDING'
          opened_at?: string
          closed_at?: string | null
          notes?: string | null
          tags?: string[]
        }
      }
      payouts: {
        Row: {
          id: string
          user_id: string
          amount: number
          method: 'CRYPTO_USDT' | 'CRYPTO_BTC' | 'CRYPTO_ETH' | 'BANK_TRANSFER'
          status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED'
          wallet_address: string | null
          crypto_type: string | null
          tx_hash: string | null
          requested_at: string
          processed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          method: 'CRYPTO_USDT' | 'CRYPTO_BTC' | 'CRYPTO_ETH' | 'BANK_TRANSFER'
          status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED'
          wallet_address?: string | null
          crypto_type?: string | null
          tx_hash?: string | null
          requested_at?: string
          processed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          method?: 'CRYPTO_USDT' | 'CRYPTO_BTC' | 'CRYPTO_ETH' | 'BANK_TRANSFER'
          status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED'
          wallet_address?: string | null
          crypto_type?: string | null
          tx_hash?: string | null
          requested_at?: string
          processed_at?: string | null
        }
      }
      certificates: {
        Row: {
          id: string
          user_id: string
          type: string
          account_size: number
          certificate_url: string | null
          issued_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          account_size: number
          certificate_url?: string | null
          issued_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          account_size?: number
          certificate_url?: string | null
          issued_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}