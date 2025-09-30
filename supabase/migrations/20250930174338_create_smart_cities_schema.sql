/*
  # Smart Cities Jordan Database Schema

  ## Overview
  This migration creates the complete database schema for the Smart Cities and Urban Innovation website for Jordan.

  ## New Tables

  ### 1. `cities`
  Stores information about major Jordanian cities
  - `id` (uuid, primary key)
  - `name` (text) - City name
  - `name_ar` (text) - Arabic name
  - `population` (integer) - Current population
  - `innovation_rank` (integer) - Innovation ranking (1-5)
  - `description` (text) - City description
  - `created_at` (timestamptz)

  ### 2. `project_types`
  Categories of smart city projects
  - `id` (uuid, primary key)
  - `name` (text) - Type name (e.g., "transportation", "energy")
  - `name_ar` (text) - Arabic name
  - `description` (text)
  - `icon` (text) - Icon identifier
  - `created_at` (timestamptz)

  ### 3. `projects`
  Smart city projects and initiatives
  - `id` (uuid, primary key)
  - `title` (text) - Project title
  - `title_ar` (text) - Arabic title
  - `description` (text) - Full description
  - `short_description` (text) - Brief summary
  - `project_type_id` (uuid) - Foreign key to project_types
  - `city_id` (uuid) - Foreign key to cities
  - `impact_level` (text) - high, medium, or low
  - `status` (text) - planning, active, completed
  - `start_date` (date)
  - `completion_date` (date, nullable)
  - `budget` (numeric) - Project budget in JOD
  - `partners` (text[]) - Array of partner organizations
  - `outcomes` (jsonb) - Measurable outcomes and metrics
  - `image_url` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `statistics`
  Statistical data for charts and visualizations
  - `id` (uuid, primary key)
  - `category` (text) - adoption_rates, energy_savings, traffic_flow, city_rankings
  - `data` (jsonb) - Chart data in JSON format
  - `year` (integer) - Data year
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add public read-only policies for all tables (government website, public data)

  ## Indexes
  - Add indexes on frequently queried columns for performance
*/

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_ar text NOT NULL,
  population integer NOT NULL DEFAULT 0,
  innovation_rank integer NOT NULL DEFAULT 5,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create project_types table
CREATE TABLE IF NOT EXISTS project_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  name_ar text NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_ar text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  project_type_id uuid REFERENCES project_types(id) ON DELETE CASCADE,
  city_id uuid REFERENCES cities(id) ON DELETE CASCADE,
  impact_level text NOT NULL CHECK (impact_level IN ('high', 'medium', 'low')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('planning', 'active', 'completed')),
  start_date date NOT NULL,
  completion_date date,
  budget numeric DEFAULT 0,
  partners text[] DEFAULT '{}',
  outcomes jsonb DEFAULT '{}',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create statistics table
CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  data jsonb NOT NULL,
  year integer NOT NULL DEFAULT 2025,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(category, year)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(project_type_id);
CREATE INDEX IF NOT EXISTS idx_projects_city ON projects(city_id);
CREATE INDEX IF NOT EXISTS idx_projects_impact ON projects(impact_level);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_statistics_category ON statistics(category);

-- Enable Row Level Security
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (government website with public data)
CREATE POLICY "Public can view cities"
  ON cities FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view project types"
  ON project_types FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view statistics"
  ON statistics FOR SELECT
  TO public
  USING (true);