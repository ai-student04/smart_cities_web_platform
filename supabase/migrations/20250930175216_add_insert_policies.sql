/*
  # Add Insert Policies for Data Seeding

  ## Changes
  - Add public insert policies for cities, project_types, projects, and statistics tables
  - These policies allow seeding the database with initial data
  - Note: In production, these should be restricted to authenticated admin users

  ## Security Note
  These policies allow public inserts for demo purposes. In a production environment,
  you would want to restrict inserts to authenticated admin users only.
*/

-- Add insert policies for cities
CREATE POLICY "Allow public inserts for cities"
  ON cities FOR INSERT
  TO public
  WITH CHECK (true);

-- Add insert policies for project_types
CREATE POLICY "Allow public inserts for project_types"
  ON project_types FOR INSERT
  TO public
  WITH CHECK (true);

-- Add insert policies for projects
CREATE POLICY "Allow public inserts for projects"
  ON projects FOR INSERT
  TO public
  WITH CHECK (true);

-- Add insert policies for statistics
CREATE POLICY "Allow public inserts for statistics"
  ON statistics FOR INSERT
  TO public
  WITH CHECK (true);