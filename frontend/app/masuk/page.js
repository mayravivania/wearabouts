import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <AuthLayout
      title={
        <>
          Welcome <span className="italic">back.</span>
        </>
      }
      intro="Sign in to check out, follow your orders and keep a wishlist."
      perks={["Your wishlist, saved across devices", "Every order tracked from paid to delivered", "Send pieces of your own to sell"]}
    >
      <Suspense>
        <AuthForm mode="login" />
      </Suspense>
    </AuthLayout>
  );
}
