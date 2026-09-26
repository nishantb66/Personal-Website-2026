"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, ShieldAlert } from "lucide-react";

type CallbackState = "loading" | "success" | "error";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<CallbackState>("loading");
  const [message, setMessage] = useState("Completing Google sign-in");

  useEffect(() => {
    async function finishGoogleSignIn() {
      const code = searchParams.get("code");
      const oauthState = searchParams.get("state");

      if (!code || !oauthState) {
        setState("error");
        setMessage("Google did not return the required sign-in details.");
        return;
      }

      const response = await fetch("/api/auth/google/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code, state: oauthState }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        setState("error");
        setMessage(payload.error || "Google sign-in failed.");
        return;
      }

      setState("success");
      setMessage("Google sign-in complete. Opening your dashboard.");
      setTimeout(() => router.replace("/dashboard"), 650);
    }

    void finishGoogleSignIn();
  }, [router, searchParams]);

  return (
    <main className="callback-page">
      <section className="callback-card">
        {state === "loading" ? <Loader2 className="spin" /> : null}
        {state === "success" ? <CheckCircle2 /> : null}
        {state === "error" ? <ShieldAlert /> : null}
        <h1>{message}</h1>
        {state === "error" ? (
          <button className="primary-action" onClick={() => router.replace("/")} type="button">
            Return to sign in
          </button>
        ) : null}
      </section>
    </main>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="callback-page">
          <section className="callback-card">
            <Loader2 className="spin" />
            <h1>Completing Google sign-in</h1>
          </section>
        </main>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
