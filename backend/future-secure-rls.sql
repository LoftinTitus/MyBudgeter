-- Future: More Secure RLS Policy with User Authentication
-- Use this later when you add user authentication to your app

-- First, add a user_id column to your budgets table:
-- ALTER TABLE public.budgets ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Then replace the simple policies with these secure ones:

-- Policy for SELECT (users can only see their own budgets)
-- CREATE POLICY "Users can view own budgets" 
-- ON public.budgets 
-- FOR SELECT 
-- TO authenticated 
-- USING (auth.uid() = user_id);

-- Policy for INSERT (users can only insert budgets for themselves)
-- CREATE POLICY "Users can insert own budgets" 
-- ON public.budgets 
-- FOR INSERT 
-- TO authenticated 
-- WITH CHECK (auth.uid() = user_id);

-- Policy for UPDATE (users can only update their own budgets)
-- CREATE POLICY "Users can update own budgets" 
-- ON public.budgets 
-- FOR UPDATE 
-- TO authenticated 
-- USING (auth.uid() = user_id) 
-- WITH CHECK (auth.uid() = user_id);

-- Policy for DELETE (users can only delete their own budgets)
-- CREATE POLICY "Users can delete own budgets" 
-- ON public.budgets 
-- FOR DELETE 
-- TO authenticated 
-- USING (auth.uid() = user_id);
