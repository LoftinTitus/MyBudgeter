-- Simple RLS Policy for Budget App

-- Policy for SELECT (reading budgets)
CREATE POLICY "Allow public read access" 
ON public.budgets 
FOR SELECT 
TO public 
USING (true);

-- Policy for INSERT (adding new budgets)
CREATE POLICY "Allow public insert access" 
ON public.budgets 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Policy for UPDATE (editing budgets)
CREATE POLICY "Allow public update access" 
ON public.budgets 
FOR UPDATE 
TO public 
USING (true) 
WITH CHECK (true);

-- Policy for DELETE (removing budgets)
CREATE POLICY "Allow public delete access" 
ON public.budgets 
FOR DELETE 
TO public 
USING (true);

-- Optional: Verify that RLS is enabled on the table
-- (This should already be enabled, just checking)
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
