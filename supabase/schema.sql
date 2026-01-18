-- POE Giveaway Database Schema
-- This file contains the complete database schema for the POE Giveaway application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Giveaways table
CREATE TABLE IF NOT EXISTS giveaways (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  creator_name text NOT NULL,
  creator_password text NOT NULL,
  -- Currency quantities (all optional, default to 0)
  divine_orb integer DEFAULT 0,
  exalted_orb integer DEFAULT 0,
  chaos_orb integer DEFAULT 0,
  mirror_of_kalandra integer DEFAULT 0,
  orb_of_alchemy integer DEFAULT 0,
  orb_of_augmentation integer DEFAULT 0,
  orb_of_chance integer DEFAULT 0,
  orb_of_transmutation integer DEFAULT 0,
  regal_orb integer DEFAULT 0,
  vaal_orb integer DEFAULT 0,
  annulment_orb integer DEFAULT 0,
  allow_strict boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'closed', 'drawn')),
  winner_id uuid,
  created_at timestamptz DEFAULT now(),
  ends_at timestamptz
);

-- Entries table
CREATE TABLE IF NOT EXISTS entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  giveaway_id uuid NOT NULL REFERENCES giveaways(id) ON DELETE CASCADE,
  participant_name text NOT NULL,
  reddit_name text,
  reddit_profile_link text,
  ip_address text,
  created_at timestamptz DEFAULT now(),
  UNIQUE (giveaway_id, participant_name)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_giveaways_slug ON giveaways(slug);
CREATE INDEX IF NOT EXISTS idx_giveaways_status ON giveaways(status);
CREATE INDEX IF NOT EXISTS idx_giveaways_created_at ON giveaways(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_entries_giveaway_id ON entries(giveaway_id);
CREATE INDEX IF NOT EXISTS idx_entries_created_at ON entries(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE giveaways ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for giveaways table
-- Allow anyone to read giveaways
CREATE POLICY "Anyone can view giveaways" ON giveaways
  FOR SELECT USING (true);

-- Allow anyone to create giveaways
CREATE POLICY "Anyone can create giveaways" ON giveaways
  FOR INSERT WITH CHECK (true);

-- Allow creators to update their own giveaways
CREATE POLICY "Creators can update their giveaways" ON giveaways
  FOR UPDATE USING (true);

-- RLS Policies for entries table
-- Allow anyone to view entries
CREATE POLICY "Anyone can view entries" ON entries
  FOR SELECT USING (true);

-- Allow anyone to create entries
CREATE POLICY "Anyone can create entries" ON entries
  FOR INSERT WITH CHECK (true);

-- Allow anyone to delete entries (for admin purposes)
CREATE POLICY "Anyone can delete entries" ON entries
  FOR DELETE USING (true);

-- Migration scripts for existing tables
-- Run these if your tables already exist:

-- Remove old currency column (if it exists)
-- ALTER TABLE giveaways DROP COLUMN IF EXISTS currency;

-- Add currency quantity columns to giveaways table
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS divine_orb integer DEFAULT 0;
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS exalted_orb integer DEFAULT 0;
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS chaos_orb integer DEFAULT 0;
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS mirror_of_kalandra integer DEFAULT 0;
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS orb_of_alchemy integer DEFAULT 0;
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS orb_of_augmentation integer DEFAULT 0;
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS orb_of_chance integer DEFAULT 0;
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS orb_of_transmutation integer DEFAULT 0;
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS regal_orb integer DEFAULT 0;
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS vaal_orb integer DEFAULT 0;
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS annulment_orb integer DEFAULT 0;

-- Add Reddit columns to entries table
-- ALTER TABLE entries ADD COLUMN IF NOT EXISTS reddit_name text;
-- ALTER TABLE entries ADD COLUMN IF NOT EXISTS reddit_profile_link text;

-- Add creator password column to giveaways table
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS creator_password text NOT NULL DEFAULT '';

-- Add allow_strict column to giveaways table
-- ALTER TABLE giveaways ADD COLUMN IF NOT EXISTS allow_strict boolean DEFAULT false;

-- Add ip_address column to entries table
-- ALTER TABLE entries ADD COLUMN IF NOT EXISTS ip_address text;
