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
            <div className="flex flex-shrink-0 gap-3">
              <a
                href="https://github.com/Path-of-sharing/POE-Giveaway"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-3 font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline">View on GitHub</span>
              </a>
              <Link
                href="/create-giveaway"
                onClick={handleCreateGiveawayClick}
                className="rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Create Giveaway
              </Link>
            </div>
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
