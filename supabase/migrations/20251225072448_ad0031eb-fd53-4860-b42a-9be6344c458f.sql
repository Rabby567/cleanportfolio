-- Add explicit DENY policies for write operations on public portfolio tables
-- This ensures these tables cannot be modified even if RLS configuration changes

-- Projects table: Explicit deny for INSERT, UPDATE, DELETE
CREATE POLICY "Deny all inserts to projects" 
ON public.projects 
FOR INSERT 
TO public, anon, authenticated
WITH CHECK (false);

CREATE POLICY "Deny all updates to projects" 
ON public.projects 
FOR UPDATE 
TO public, anon, authenticated
USING (false);

CREATE POLICY "Deny all deletes to projects" 
ON public.projects 
FOR DELETE 
TO public, anon, authenticated
USING (false);

-- Playground table: Explicit deny for INSERT, UPDATE, DELETE
CREATE POLICY "Deny all inserts to playground" 
ON public.playground 
FOR INSERT 
TO public, anon, authenticated
WITH CHECK (false);

CREATE POLICY "Deny all updates to playground" 
ON public.playground 
FOR UPDATE 
TO public, anon, authenticated
USING (false);

CREATE POLICY "Deny all deletes to playground" 
ON public.playground 
FOR DELETE 
TO public, anon, authenticated
USING (false);

-- Profile table: Explicit deny for INSERT, UPDATE, DELETE
CREATE POLICY "Deny all inserts to profile" 
ON public.profile 
FOR INSERT 
TO public, anon, authenticated
WITH CHECK (false);

CREATE POLICY "Deny all updates to profile" 
ON public.profile 
FOR UPDATE 
TO public, anon, authenticated
USING (false);

CREATE POLICY "Deny all deletes to profile" 
ON public.profile 
FOR DELETE 
TO public, anon, authenticated
USING (false);