"use client";

import { useState } from "react";

// belum ada layanan email, cuma konfirmasi di layar
export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="text-sm text-on-deep/80 py-3">You&rsquo;re on the list. See you Friday.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex border-b border-on-deep/40 focus-within:border-on-deep max-w-sm"
    >
      <label htmlFor="newsletter" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter"
        type="email"
        required
        placeholder="Your email"
        className="flex-1 min-w-0 bg-transparent py-3 text-[15px] placeholder:text-on-deep/45 focus:outline-none"
      />
      <button type="submit" className="pl-4 py-3 text-[15px] hover:opacity-70">
        Notify me →
      </button>
    </form>
  );
}
