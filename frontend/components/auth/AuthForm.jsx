"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { login, register, logout, useAuth } from "@/lib/auth";

const field = "w-full min-h-12 rounded-md border border-line bg-bg px-4 text-[15px] focus:border-fg focus:outline-none";

// pesan dari backend berbahasa Indonesia, UI pakai bahasa Inggris
function friendlyError(err, isRegister) {
  if (err.status === 0) return err.message;
  if (err.status === 401) return "That email and password don't match.";
  if (err.status === 409) return "That email already has an account.";
  if (err.status === 400) return isRegister ? "Check the fields again. Password needs at least 6 characters." : "Fill in your email and password.";
  return "Something went wrong. Try again in a moment.";
}

// mode: "login" atau "register". Wajib di dalam Suspense (useSearchParams)
export default function AuthForm({ mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const { user, ready } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({ sending: false, error: "" });

  const isRegister = mode === "register";

  async function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    if (isRegister && password.length < 6) {
      setState({ sending: false, error: "Password needs at least 6 characters." });
      return;
    }

    setState({ sending: true, error: "" });
    try {
      const u = isRegister ? await register(form.get("name").trim(), email, password) : await login(email, password);
      // next hanya boleh path internal, bukan URL luar
      const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
      router.push(safeNext || (u.role === "admin" ? "/admin" : "/katalog"));
    } catch (err) {
      setState({ sending: false, error: friendlyError(err, isRegister) });
    }
  }

  if (ready && user && !state.sending) {
    const home = user.role === "admin" ? "/admin" : "/katalog";
    return (
      <div className="flex flex-col items-start gap-5">
        <p className="text-lg">
          You&rsquo;re signed in as <span className="font-medium">{user.name}</span>.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href={home}>{user.role === "admin" ? "Go to admin" : "Keep browsing"}</Button>
          <Button variant="secondary" onClick={logout}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  const otherHref = `${isRegister ? "/masuk" : "/daftar"}${next ? `?next=${encodeURIComponent(next)}` : ""}`;

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      {isRegister && (
        <label className="flex flex-col gap-2">
          <span className="text-sm text-fg-2">Name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
      )}

      <label className="flex flex-col gap-2">
        <span className="text-sm text-fg-2">Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-fg-2">Password</span>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete={isRegister ? "new-password" : "current-password"}
            className={`${field} pr-20`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 min-h-10 text-sm text-fg-2 hover:text-fg"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {isRegister && <span className="text-xs text-fg-2">At least 6 characters.</span>}
      </label>

      {state.error && (
        <p role="alert" className="text-stamp text-sm">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={state.sending} className="w-full mt-1">
        {state.sending ? (isRegister ? "Creating your account..." : "Signing in...") : isRegister ? "Create account" : "Sign in"}
      </Button>

      <p className="text-sm text-fg-2">
        {isRegister ? "Already have an account? " : "New here? "}
        <Link href={otherHref} className="text-fg underline underline-offset-4 hover:opacity-70">
          {isRegister ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
