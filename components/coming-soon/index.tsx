"use client";

import comingSoonData from "@/data/coming-soon.json";

interface ComingSoonFeature {
  id: number;
  title: string;
  description: string;
  expectedReleaseDate: string;
}

export default function ComingSoon() {
  const features: ComingSoonFeature[] = comingSoonData.comingSoon;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Coming Soon
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Features we're working on to make POE Giveaway even better
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {feature.title}
              </h3>
              <span className="flex-shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                Soon
              </span>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {feature.description}
            </p>

            <div className="mt-auto flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Expected: {feature.expectedReleaseDate}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-400">
          Have a feature request? Let us know what you'd like to see added to POE Giveaway!
        </p>
      </div>
    </div>
  );
}
