"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LoginInput } from "@/components/features/auth/LoginInput";
import { LoginButton } from "@/components/features/auth/LoginButton";
import styles from "./login.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    router.push("/dashboard");
  };

  return (
    <div className={styles.loginPage}>
      <section className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.svg"
            alt="Lendsqr Logo"
            width={174}
            height={36}
            priority
          />
        </div>
        <div className={styles.illustrationContainer}>
          <Image
            src="/images/pablo-sign-in.png"
            alt="Sign in illustration"
            width={600}
            height={337}
            priority
          />
        </div>
      </section>

      <section className={styles.rightSection}>
        <div className={styles.logoContainerMobile}>
          <Image
            src="/logo.svg"
            alt="Lendsqr Logo"
            width={140}
            height={30}
          />
        </div>

        <div className={styles.formContainer}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <form onSubmit={handleSubmit}>
            <LoginInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />

            <LoginInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />

            <Link href="/forgot-password" className={styles.forgotPassword}>
              Forgot PASSWORD?
            </Link>

            <LoginButton>Log In</LoginButton>
          </form>
        </div>
      </section>
    </div>
  );
}
