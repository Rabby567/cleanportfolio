-- Create projects table for portfolio works
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  category TEXT,
  link TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create playground table for experimental works
CREATE TABLE public.playground (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profile table for about page content
CREATE TABLE public.profile (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Huy ML',
  tagline TEXT DEFAULT 'Digital Designer',
  bio TEXT,
  hobbies TEXT,
  experience TEXT,
  location TEXT DEFAULT 'Vietnam',
  email TEXT,
  social_links JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playground ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies for portfolio content
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Anyone can view playground" ON public.playground FOR SELECT USING (true);
CREATE POLICY "Anyone can view profile" ON public.profile FOR SELECT USING (true);

-- Anyone can submit contact form
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Insert default profile data
INSERT INTO public.profile (name, tagline, bio, hobbies, location, email)
VALUES (
  'Huy ML',
  'Digital Designer',
  'I''m a passionate digital designer focused on creating beautiful and functional experiences. I believe in the power of good design to solve problems and delight users.',
  'Photography, Gaming, Music, Coffee',
  'Vietnam',
  'hello@huyml.co'
);

-- Insert sample projects
INSERT INTO public.projects (title, description, year, category, order_index) VALUES
('Brand Identity Design', 'Complete brand identity system for a tech startup', 2025, 'Branding', 1),
('E-commerce Platform', 'Full redesign of an online shopping experience', 2024, 'Web Design', 2),
('Mobile App UI', 'User interface design for a fitness application', 2024, 'UI/UX', 3),
('Product Dashboard', 'Analytics dashboard for SaaS platform', 2023, 'UI/UX', 4),
('Marketing Website', 'Corporate website redesign', 2023, 'Web Design', 5);

-- Insert sample playground items
INSERT INTO public.playground (title, category, year, order_index) VALUES
('Abstract Compositions', 'Experimental', 2025, 1),
('Typography Studies', 'Type', 2024, 2),
('3D Explorations', '3D', 2024, 3),
('Motion Graphics', 'Animation', 2023, 4);