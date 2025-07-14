-- Alternative: Disable RLS completely for development
-- WARNING: This removes all access restrictions - only use in development!

-- Disable RLS on the budgets table
ALTER TABLE "public"."budgets" DISABLE ROW LEVEL SECURITY;

-- Optional: Drop any existing policies (if you want to start fresh)
-- DROP POLICY IF EXISTS "Allow public read access" ON "public"."budgets";
-- DROP POLICY IF EXISTS "Allow public insert access" ON "public"."budgets";
-- DROP POLICY IF EXISTS "Allow public update access" ON "public"."budgets";
-- DROP POLICY IF EXISTS "Allow public delete access" ON "public"."budgets";

-- Check table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'budgets' AND table_schema = 'public'
ORDER BY ordinal_position;
