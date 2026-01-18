"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ActiveGiveawayCard from "@/components/active-giveaway-card";
import type { Giveaway } from "@/lib/types/database";
import comingSoonData from "@/data/coming-soon.json";

export default function Home() {
  const router = useRouter();
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPepo, setShowPepo] = useState(false);

  useEffect(() => {
    const fetchGiveaways = async () => {
      setLoading(true);
      setError(null);

      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("giveaways")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setGiveaways(data || []);
      }

      setLoading(false);
    };

    fetchGiveaways();
  }, []);

  const handleCreateGiveawayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPepo(true);
    setTimeout(() => {
      router.push("/create-giveaway");
    }, 3000); // 3s animation
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black overflow-hidden">
      <main className="flex min-h-screen w-full max-w-4xl flex-col gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold font-cinzel text-zinc-900 dark:text-zinc-100">
                Path of Sharing
              </h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Path of Sharing is a small, community-driven app for Path of
                Exile players. Create giveaways and share the loot. Built as a
                fun hobby project. Enjoy!
              </p>
            </div>
            <Link
              href="/create-giveaway"
              onClick={handleCreateGiveawayClick}
              className="flex-shrink-0 rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Create Giveaway
            </Link>
          </div>

          {/* Memeish Intro Section */}
        </div>

        {/* Coming Soon Preview Section */}
        <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:border-blue-800 dark:from-blue-950/30 dark:to-purple-950/30">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold font-cinzel text-zinc-900 dark:text-zinc-100">
                  What's Coming Next
                </h2>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-400">
                  {comingSoonData.comingSoon.length} features
                </span>
              </div>

              {/* Preview of first 3 features */}
              <div className="flex flex-col gap-2 mb-4">
                {comingSoonData.comingSoon.slice(0, 3).map((feature) => (
                  <div key={feature.id} className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/coming-soon"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View all upcoming features
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* All Giveaways Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            All Giveaways
          </h2>

          {loading ? (
            <div className="text-center text-zinc-600 dark:text-zinc-400 py-8">
              Loading giveaways...
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : giveaways.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-12 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-center text-zinc-600 dark:text-zinc-400">
                No giveaways at the moment.
              </p>
              <Link
                href="/create-giveaway"
                className="rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Create the First Giveaway
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {giveaways.map((giveaway) => (
                <ActiveGiveawayCard key={giveaway.id} giveaway={giveaway} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Animated Pepo */}
      {showPepo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-pepo-grow">
            <Image
              src="/data/img/pepo.png"
              alt="Pepo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pepo-grow {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: scale(2);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .animate-pepo-grow {
          animation: pepo-grow 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
