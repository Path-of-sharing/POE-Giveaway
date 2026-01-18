"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Giveaway, GiveawayInsert } from "@/lib/types/database";

// Generate a random slug for the giveaway URL
function generateSlug(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function useGiveaway(slug?: string) {
  const [giveaway, setGiveaway] = useState<Giveaway | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // Fetch a giveaway by slug
  const fetchGiveaway = useCallback(async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("giveaways")
      .select("*")
      .eq("slug", slug)
      .single();

    if (fetchError) {
      setError(fetchError.message);
      setGiveaway(null);
    } else {
      setGiveaway(data);
    }

    setLoading(false);
  }, [slug, supabase]);

  // Create a new giveaway
  const createGiveaway = async (
    data: Omit<GiveawayInsert, "slug">,
  ): Promise<Giveaway | null> => {
    setLoading(true);
    setError(null);

    const newSlug = generateSlug();

    const { data: newGiveaway, error: createError } = await (supabase as any)
      .from("giveaways")
      .insert({ ...data, slug: newSlug })
      .select()
      .single();

    if (createError) {
      setError(createError.message);
      setLoading(false);
      return null;
    }

    setGiveaway(newGiveaway);
    setLoading(false);
    return newGiveaway;
  };

  // Update giveaway status
  const updateStatus = async (
    status: "active" | "closed" | "drawn",
  ): Promise<boolean> => {
    if (!giveaway) return false;

    setLoading(true);
    setError(null);

    const updateData: any = { status };
    const { error: updateError } = await (supabase as any)
      .from("giveaways")
      .update(updateData)
      .eq("id", giveaway.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return false;
    }

    setGiveaway({ ...giveaway, status });
    setLoading(false);
    return true;
  };

  // Select a specific winner
  const selectWinner = async (winnerId: string): Promise<boolean> => {
    if (!giveaway) return false;

    setLoading(true);
    setError(null);

    // Update the giveaway with the winner
    const updateData: any = { winner_id: winnerId, status: "drawn" };
    const { error: updateError } = await (supabase as any)
      .from("giveaways")
      .update(updateData)
      .eq("id", giveaway.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return false;
    }

    setGiveaway({ ...giveaway, winner_id: winnerId, status: "drawn" });
    setLoading(false);
    return true;
  };

  // Draw a winner randomly
  const drawWinner = async (): Promise<string | null> => {
    if (!giveaway) return null;

    setLoading(true);
    setError(null);

    // Get all entries for this giveaway
    const { data: entries, error: entriesError } = await (supabase as any)
      .from("entries")
      .select("*")
      .eq("giveaway_id", giveaway.id);

    if (entriesError || !entries || entries.length === 0) {
      setError(entriesError?.message || "No entries found");
      setLoading(false);
      return null;
    }

    // Pick a random winner
    const winner = entries[Math.floor(Math.random() * entries.length)];

    // Update the giveaway with the winner
    const updateData: any = { winner_id: winner.id, status: "drawn" };
    const { error: updateError } = await (supabase as any)
      .from("giveaways")
      .update(updateData)
      .eq("id", giveaway.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return null;
    }

    setGiveaway({ ...giveaway, winner_id: winner.id, status: "drawn" });
    setLoading(false);
    return winner.participant_name;
  };

  useEffect(() => {
    if (slug) {
      fetchGiveaway();
    }
  }, [slug, fetchGiveaway]);

  return {
    giveaway,
    loading,
    error,
    fetchGiveaway,
    createGiveaway,
    updateStatus,
    selectWinner,
    drawWinner,
  };
}
