// File: lib/supabase/client.ts
// Supabase client for client-side operations

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from './database.types';

export const createClient = () => createClientComponentClient<Database>();