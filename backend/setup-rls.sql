-- Simple RLS policies for the budgets table
-- These policies allow all users to perform all operations (suitable for development)

-- First, make sure RLS is enabled on the budgets table
ALTER TABLE "public"."budgets" ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to select (read) all budget records
CREATE POLICY "Allow public read access" 
ON "public"."budgets" 
FOR SELECT 
USING (true);

-- Policy to allow anyone to insert new budget records
CREATE POLICY "Allow public insert access" 
ON "public"."budgets" 
FOR INSERT 
WITH CHECK (true);

-- Policy to allow anyone to update budget records
CREATE POLICY "Allow public update access" 
ON "public"."budgets" 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Policy to allow anyone to delete budget records
CREATE POLICY "Allow public delete access" 
ON "public"."budgets" 
FOR DELETE 
USING (true);

-- Optional: Check that the table has the required columns
-- Uncomment and run this if you want to see your table structure:
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'budgets' AND table_schema = 'public'
-- ORDER BY ordinal_position;
