"use client";

import Link from "next/link";
import ComingSoon from "@/components/coming-soon";

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 self-start"
          >
            ← Back to Home
          </Link>
        </div>

        <ComingSoon />
      </main>
    </div>
  );
}
