"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Giveaway } from "@/lib/types/database";
import { createClient } from "@/lib/supabase/client";
import currencyData from "@/data/currency.json";
import { columnToCurrencyMap, type CurrencyColumnName } from "@/lib/utils/currencyMapper";

interface ActiveGiveawayCardProps {
  giveaway: Giveaway;
}

export default function ActiveGiveawayCard({ giveaway }: ActiveGiveawayCardProps) {
  const [entryCount, setEntryCount] = useState<number>(0);

  useEffect(() => {
    const fetchEntryCount = async () => {
      const supabase = createClient();
      const { count } = await (supabase as any)
        .from("entries")
        .select("*", { count: "exact", head: true })
        .eq("giveaway_id", giveaway.id);

      setEntryCount(count || 0);
    };

    fetchEntryCount();
  }, [giveaway.id]);
  // Get all currencies with quantities > 0
  const activeCurrencies = Object.entries(giveaway)
    .filter(([key, value]) => {
      // Check if it's a currency column and has a value > 0
      const isCurrencyColumn = key.endsWith('_orb') || key === 'mirror_of_kalandra';
      return isCurrencyColumn && typeof value === 'number' && value > 0;
    })
    .map(([key, value]) => {
      const currencyName = columnToCurrencyMap[key as CurrencyColumnName];
      const currencyInfo = currencyData.currency.find(c => c.name === currencyName);
      return {
        name: currencyName,
        quantity: value as number,
        picture: currencyInfo?.picture || '',
      };
    });

  const isActive = giveaway.status === 'active';
  const isClosed = giveaway.status === 'closed';

  return (
    <Link href={`/giveaway/${giveaway.slug}`}>
      <div className="group relative flex items-center gap-4 overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600">
        {/* Left Side - Giveaway Details */}
        <div className="flex flex-1 flex-col gap-3">
          {/* Title and Status */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
              {giveaway.title}
            </h3>
            <span
              className={`flex-shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : isClosed
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
              }`}
            >
              {isActive ? "Active" : isClosed ? "Closed" : "Drawn"}
            </span>
          </div>

          {/* Creator */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Hosted by <span className="font-medium">{giveaway.creator_name}</span>
          </p>

          {/* Currencies */}
          <div className="flex flex-wrap items-center gap-3">
            {activeCurrencies.length > 0 ? (
              activeCurrencies.map((currency) => (
                <div
                  key={currency.name}
                  className="flex items-center gap-2 rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800"
                >
                  <div className="relative h-6 w-6 flex-shrink-0">
                    <Image
                      src={currency.picture}
                      alt={currency.name}
                      fill
                      className="object-contain"
                      sizes="24px"
                    />
                  </div>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {currency.quantity}x
                  </span>
                </div>
              ))
            ) : (
              <span className="text-sm text-zinc-500 dark:text-zinc-500">
                No currencies specified
              </span>
            )}
          </div>

          {/* Date and Participants */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Created {new Date(giveaway.created_at).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>
                {entryCount} {entryCount === 1 ? "participant" : "participants"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Logo */}
        <div className="relative h-24 w-24 flex-shrink-0 opacity-40 transition-opacity group-hover:opacity-60 dark:opacity-20 dark:group-hover:opacity-30">
          <Image
            src="/data/img/logo.png"
            alt="POE Giveaway Logo"
            fill
            className="object-contain"
            sizes="96px"
          />
        </div>
      </div>
    </Link>
  );
}
