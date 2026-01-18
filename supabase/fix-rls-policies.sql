-- Fix RLS Policies for POE Giveaway
-- Run this in your Supabase SQL Editor to allow inserts

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view giveaways" ON giveaways;
DROP POLICY IF EXISTS "Anyone can create giveaways" ON giveaways;
DROP POLICY IF EXISTS "Creators can update their giveaways" ON giveaways;
DROP POLICY IF EXISTS "Anyone can view entries" ON entries;
DROP POLICY IF EXISTS "Anyone can create entries" ON entries;
DROP POLICY IF EXISTS "Anyone can delete entries" ON entries;

-- Recreate policies for giveaways table
CREATE POLICY "Enable read access for all users" ON giveaways
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON giveaways
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON giveaways
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete access for all users" ON giveaways
  FOR DELETE USING (true);

-- Recreate policies for entries table
CREATE POLICY "Enable read access for all users" ON entries
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON entries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON entries
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete access for all users" ON entries
  FOR DELETE USING (true);
