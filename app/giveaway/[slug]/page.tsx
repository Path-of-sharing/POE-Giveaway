"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useGiveaway } from "@/lib/hooks/useGiveaway";
import { useEntries } from "@/lib/hooks/useEntries";
import currencyData from "@/data/currency.json";
import { getGiveawayPassword, setGiveawayPassword } from "@/lib/utils/cookies";
import PasswordEntryModal from "@/components/password-entry-modal";
import GiveawaySelector from "@/components/giveaway-selector";
import Button from "@/components/button";
import EntryConfirmationModal from "@/components/entry-confirmation-modal";

export default function GiveawayPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { giveaway, loading: giveawayLoading, error: giveawayError, selectWinner } = useGiveaway(slug);
  const { entries, loading: entriesLoading, addEntry, entryCount, subscribeToEntries } = useEntries(
    giveaway?.id
  );

  const [participantName, setParticipantName] = useState("");
  const [redditName, setRedditName] = useState("");
  const [redditProfileLink, setRedditProfileLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPepo, setShowPepo] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (giveaway?.slug) {
      const password = getGiveawayPassword(giveaway.slug);
      setHasPassword(!!password);
    }
  }, [giveaway?.slug]);

  useEffect(() => {
    if (giveaway?.id) {
      const unsubscribe = subscribeToEntries();
      return unsubscribe;
    }
  }, [giveaway?.id, subscribeToEntries]);

  const handleJoinGiveaway = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!participantName.trim()) {
      setSubmitError("Please enter your POE name");
      return;
    }

    if (giveaway && giveaway.allow_strict) {
      if (!redditName.trim()) {
        setSubmitError("Reddit username is required for this giveaway");
        return;
      }
      if (!redditProfileLink.trim()) {
        setSubmitError("Reddit profile link is required for this giveaway");
        return;
      }
    }

    if (redditProfileLink.trim()) {
      const redditUrlPattern = /^https?:\/\/(www\.)?(reddit\.com|old\.reddit\.com)\/(u|user)\/[\w-]+\/?$/i;
      if (!redditUrlPattern.test(redditProfileLink.trim())) {
        setSubmitError("Please enter a valid Reddit profile URL (e.g., https://reddit.com/u/username)");
        return;
      }
    }

    setShowConfirmationModal(true);
  };

  const handleConfirmEntry = async () => {
    setShowConfirmationModal(false);
    setIsSubmitting(true);

    const entry = await addEntry(
      participantName.trim(),
      redditName.trim() || undefined,
      redditProfileLink.trim() || undefined
    );

    if (entry) {
      setShowPepo(true);
      setTimeout(() => {
        alert(`Successfully joined the giveaway!`);
        setShowPepo(false);
      }, 3000);
      setParticipantName("");
      setRedditName("");
      setRedditProfileLink("");
    } else {
      setSubmitError("Failed to join giveaway. You may have already entered.");
    }

    setIsSubmitting(false);
  };

  const handleCancelEntry = () => {
    setShowConfirmationModal(false);
  };

  const handleVerifyPassword = (enteredPassword: string) => {
    if (!giveaway) return;

    if (enteredPassword === giveaway.creator_password) {
      setGiveawayPassword(giveaway.slug, enteredPassword);
      setHasPassword(true);
      setShowPasswordModal(false);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  const handleOpenPasswordModal = () => {
    setPasswordError("");
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordError("");
  };

  const handleSelectWinner = async (participant: { id: string; participant_name: string }) => {
    if (!giveaway) return;

    const confirmed = window.confirm(
      `Are you sure you want to select ${participant.participant_name} as the winner? This will close the giveaway.`
    );

    if (!confirmed) return;

    const success = await selectWinner(participant.id);

    if (success) {
      alert(`${participant.participant_name} has been selected as the winner! 🎉`);
    } else {
      alert("Failed to select winner. Please try again.");
    }
  };

  if (giveawayLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-zinc-600 dark:text-zinc-400">Loading giveaway...</div>
      </div>
    );
  }

  if (giveawayError || !giveaway) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="text-red-600 dark:text-red-400">
            {giveawayError || "Giveaway not found"}
          </div>
          <button
            onClick={() => router.push("/")}
            className="rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const isActive = giveaway.status === "active";
  const isClosed = giveaway.status === "closed";
  const isDrawn = giveaway.status === "drawn";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col gap-8 py-16 px-8 bg-white dark:bg-black">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 self-start"
          >
            ← Back to Home
          </button>

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {giveaway.title}
              </h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Hosted by <span className="font-medium">{giveaway.creator_name}</span>
              </p>
              {giveaway.description && (
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {giveaway.description}
                </p>
              )}
            </div>
          </div>

          {/* Status Badge and Manage Button */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  isActive
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : isClosed
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                }`}
              >
                {isActive ? "Active" : isClosed ? "Closed" : "Winner Drawn"}
              </span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {entryCount} {entryCount === 1 ? "participant" : "participants"}
              </span>
            </div>

            {/* Manage Giveaway Button */}
            {!hasPassword && (
              <button
                onClick={handleOpenPasswordModal}
                className="rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Manage Giveaway
              </button>
            )}

            {hasPassword && (
              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 dark:border-green-800 dark:bg-green-900/20">
                <span className="text-sm font-medium text-green-800 dark:text-green-400">
                  ✓ Verified Owner
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Giveaway Info */}
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Giveaway Details
          </h3>

          {/* Currencies Being Given Away */}
          <div className="mb-4">
            <h4 className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase">
              Currencies
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "divine_orb", name: "Divine Orb", jsonKey: "divineOrb" },
                { key: "exalted_orb", name: "Exalted Orb", jsonKey: "exaltedOrb" },
                { key: "chaos_orb", name: "Chaos Orb", jsonKey: "chaosOrb" },
                { key: "mirror_of_kalandra", name: "Mirror of Kalandra", jsonKey: "mirrorOfKalandra" },
                { key: "orb_of_alchemy", name: "Orb of Alchemy", jsonKey: "orbOfAlchemy" },
                { key: "orb_of_augmentation", name: "Orb of Augmentation", jsonKey: "orbOfAugmentation" },
                { key: "orb_of_chance", name: "Orb of Chance", jsonKey: "orbOfChance" },
                { key: "orb_of_transmutation", name: "Orb of Transmutation", jsonKey: "orbOfTransmutation" },
                { key: "regal_orb", name: "Regal Orb", jsonKey: "regalOrb" },
                { key: "vaal_orb", name: "Vaal Orb", jsonKey: "vaalOrb" },
                { key: "annulment_orb", name: "Annulment Orb", jsonKey: "annulmentOrb" },
              ]
                .filter((currency) => {
                  const value = giveaway[currency.key as keyof typeof giveaway];
                  return typeof value === "number" && value > 0;
                })
                .map((currency) => {
                  const currencyInfo = currencyData.currency.find(
                    (c) => c.name === currency.jsonKey
                  );
                  const quantity = giveaway[currency.key as keyof typeof giveaway] as number;

                  return (
                    <div
                      key={currency.key}
                      className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800"
                    >
                      {currencyInfo?.picture && (
                        <div className="relative h-8 w-8 flex-shrink-0">
                          <Image
                            src={currencyInfo.picture}
                            alt={currency.name}
                            fill
                            className="object-contain"
                            sizes="32px"
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                          {currency.name}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          Qty: {quantity}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-zinc-200 pt-4 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            <p>
              <span className="font-medium">Created:</span>{" "}
              {new Date(giveaway.created_at).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Status:</span> {giveaway.status}
            </p>
            <p className="flex flex-col gap-1">
              <span className="font-medium">Share URL:</span>
              <code className="rounded bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-800">
                {typeof window !== "undefined" ? window.location.href : `/giveaway/${slug}`}
              </code>
            </p>
          </div>
        </div>

        {/* Join Form - Only show if active and user is not verified owner */}
        {isActive && !hasPassword && (
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Join This Giveaway
            </h2>
            <form onSubmit={handleJoinGiveaway} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="participant-name"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Your POE Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="participant-name"
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Enter your POE character name"
                  className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="reddit-name"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Reddit Username {giveaway.allow_strict ? <span className="text-red-500">*</span> : "(Optional)"}
                </label>
                <input
                  id="reddit-name"
                  type="text"
                  value={redditName}
                  onChange={(e) => setRedditName(e.target.value)}
                  placeholder="u/YourRedditName"
                  required={giveaway.allow_strict}
                  className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="reddit-profile"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Reddit Profile Link {giveaway.allow_strict ? <span className="text-red-500">*</span> : "(Optional)"}
                </label>
                <input
                  id="reddit-profile"
                  type="url"
                  value={redditProfileLink}
                  onChange={(e) => setRedditProfileLink(e.target.value)}
                  placeholder="https://reddit.com/u/YourRedditName"
                  required={giveaway.allow_strict}
                  className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                />
              </div>

              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
                  <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
                </div>
              )}

              <Button
                text={isSubmitting ? "Joining..." : "Join Giveaway"}
                type="submit"
                disabled={isSubmitting}
                buttonStyle="red"
              />
            </form>
          </div>
        )}

        {/* Winner Section - Show if drawn */}
        {isDrawn && giveaway.winner_id && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
            <h2 className="mb-2 text-xl font-semibold text-blue-900 dark:text-blue-100">
              🎉 Winner Announced!
            </h2>
            <p className="text-blue-800 dark:text-blue-300">
              Congratulations to{" "}
              <span className="font-bold">
                {entries.find((e) => e.id === giveaway.winner_id)?.participant_name}
              </span>
              !
            </p>
          </div>
        )}

        {/* Participants Section */}
        {hasPassword ? (
          /* Giveaway Selector for Verified Owners */
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Select Winner ({entryCount} {entryCount === 1 ? "Participant" : "Participants"})
            </h2>
            {entryCount === 0 ? (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  No participants yet. Once participants join the giveaway, the winner selection option will appear here.
                </p>
              </div>
            ) : (
              <GiveawaySelector
                participants={entries}
                winnerId={giveaway.winner_id}
                onSelectWinner={handleSelectWinner}
              />
            )}
          </div>
        ) : (
          /* Regular Participants List for Non-Owners */
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Participants ({entryCount})
            </h2>

            {entriesLoading && entryCount === 0 ? (
              <p className="text-zinc-600 dark:text-zinc-400">Loading participants...</p>
            ) : entryCount === 0 ? (
              <p className="text-zinc-600 dark:text-zinc-400">
                No participants yet. Be the first to join!
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {entries.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`flex flex-col gap-2 rounded-lg border p-4 ${
                      entry.id === giveaway.winner_id
                        ? "border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/20"
                        : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        #{index + 1}
                      </span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {entry.participant_name}
                      </span>
                      {entry.id === giveaway.winner_id && (
                        <span className="ml-auto text-yellow-600 dark:text-yellow-400">👑</span>
                      )}
                    </div>
                    {(entry.reddit_name || entry.reddit_profile_link) && (
                      <div className="flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400 ml-8">
                        {entry.reddit_name && (
                          <span>Reddit: {entry.reddit_name}</span>
                        )}
                        {entry.reddit_profile_link && (
                          <a
                            href={entry.reddit_profile_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline dark:text-blue-400"
                          >
                            View Profile →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Password Entry Modal */}
      {showPasswordModal && (
        <PasswordEntryModal
          giveawaySlug={slug}
          onVerify={handleVerifyPassword}
          onClose={handleClosePasswordModal}
          error={passwordError}
        />
      )}

      {/* Entry Confirmation Modal */}
      {showConfirmationModal && (
        <EntryConfirmationModal
          participantName={participantName}
          redditName={redditName || undefined}
          redditProfileLink={redditProfileLink || undefined}
          onConfirm={handleConfirmEntry}
          onCancel={handleCancelEntry}
        />
      )}

      {/* Animated Pepe */}
      {showPepo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-dialog-appear bg-white dark:bg-zinc-800 border-2 border-zinc-900 dark:border-zinc-100 rounded-lg px-4 py-2 relative">
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-zinc-800 border-b-2 border-r-2 border-zinc-900 dark:border-zinc-100 rotate-45"></div>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                GIB DIV REEEEEE
              </p>
            </div>
            <div className="animate-pepo-grow">
              <Image
                src="/data/img/pepe.png"
                alt="Pepe"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
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

        @keyframes dialog-appear {
          0% {
            transform: scale(0) translateY(10px);
            opacity: 0;
          }
          15% {
            transform: scale(1.1) translateY(0);
            opacity: 1;
          }
          25% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-pepo-grow {
          animation: pepo-grow 3s ease-in-out forwards;
        }

        .animate-dialog-appear {
          animation: dialog-appear 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
