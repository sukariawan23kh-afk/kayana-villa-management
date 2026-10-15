"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Login failed");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-serif-display text-2xl font-semibold tracking-[0.18em] text-ivory">
            KAYANA
          </span>
          <p className="mt-2 text-xs uppercase tracking-[0.32em] text-bronze-light">
            Admin Dashboard
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-ivory/12 bg-ivory/[0.04] p-7 backdrop-blur"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-tropical/25 text-bronze-light">
              <Lock className="size-5" />
            </span>
            <div>
              <h1 className="font-serif-display text-lg font-medium text-ivory">
                Sign in
              </h1>
              <p className="text-xs text-ivory/55">Enter your admin password</p>
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ivory/55">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              className="h-11 w-full rounded-lg border border-ivory/15 bg-ivory/5 px-3 text-sm text-ivory placeholder:text-ivory/30 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ivory text-sm font-medium text-charcoal transition-colors hover:bg-bronze-light disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>

          <div className="mt-5 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-ivory/55 transition-colors hover:text-bronze-light"
            >
              <ArrowLeft className="size-3" />
              Back to website
            </Link>
          </div>
        </form>

        <p className="mt-5 text-center text-[0.65rem] leading-relaxed text-ivory/35">
          Default password: <code className="rounded bg-ivory/10 px-1.5 py-0.5 text-bronze-light">kayana2026</code>
          <br />
          Change via ADMIN_PASSWORD env variable in production.
        </p>
      </div>
    </div>
  );
}
