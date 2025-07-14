-- Update budgets table schema to match frontend expectations
-- Run this in your Supabase SQL Editor BEFORE the RLS policy

-- First, let's see what columns exist:
-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'budgets' AND table_schema = 'public';

-- Add missing columns if they don't exist:
DO $$ 
BEGIN
    -- Add category column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'budgets' 
        AND column_name = 'category' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.budgets ADD COLUMN category TEXT;
    END IF;
    
    -- Add type column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'budgets' 
        AND column_name = 'type' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.budgets ADD COLUMN type TEXT DEFAULT 'expense';
    END IF;
    
    -- Make sure we have all the basic columns
    -- id should already exist as primary key
    -- amount column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'budgets' 
        AND column_name = 'amount' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.budgets ADD COLUMN amount DECIMAL(10,2) NOT NULL;
    END IF;
    
    -- description column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'budgets' 
        AND column_name = 'description' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.budgets ADD COLUMN description TEXT NOT NULL;
    END IF;
    
    -- date column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'budgets' 
        AND column_name = 'date' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.budgets ADD COLUMN date DATE NOT NULL;
    END IF;
    
    -- created_at column (helpful for ordering)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'budgets' 
        AND column_name = 'created_at' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.budgets ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
    
END $$;
