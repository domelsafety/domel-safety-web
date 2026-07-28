"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email au password si sahihi. Jaribu tena.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-steel mb-1.5">
          EMAIL
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-border rounded-md px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-brand-red"
          placeholder="admin@domelsafety.co.tz"
        />
      </div>
      <div>
        <label className="block text-xs font-mono text-steel mb-1.5">
          PASSWORD
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-border rounded-md px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-brand-red"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="text-xs text-brand-red bg-brand-red/10 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-red text-white text-sm font-semibold py-2.5 rounded-md hover:bg-brand-red/90 transition-colors disabled:opacity-60"
      >
        {loading ? "Inaingia..." : "Ingia"}
      </button>
    </form>
  );
}
