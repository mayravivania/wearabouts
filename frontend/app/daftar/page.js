import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

export const metadata = { title: "Create an account" };

export default function RegisterPage() {
  return (
    <AuthLayout
      title={
        <>
          Make yourself <span className="italic">at home.</span>
        </>
      }
      intro="One account for buying, keeping a wishlist and selling with us. Takes a minute."
      perks={["Claim a piece the moment it drops", "Leave a review once it reaches you", "Get paid 80% when your own pieces sell"]}
    >
      <Suspense>
        <AuthForm mode="register" />
      </Suspense>
    </AuthLayout>
  );
}
