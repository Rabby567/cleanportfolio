-- Remove email column from profile table to prevent public exposure
ALTER TABLE public.profile DROP COLUMN IF EXISTS email;