"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useRef, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Loader2,
  KeyRound,
} from "lucide-react";
import { signInAction } from "@/app/_actions/sign-in";
import { twoFactorVerification } from "@/app/_actions/two-factor";
import { useForm } from "react-hook-form";
import { SignInSchema, SignInType } from "@/schemas/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Page() {
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"?"Email already used in different provider!":""
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: SignInType) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      if (showTwoFactor && values.code) {
        // Handle 2FA verification
        twoFactorVerification(values.email, values.code).then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
          
          // If login is successful, set a flag in localStorage
          if (data?.success && !data?.error) {
            localStorage.setItem('justLoggedIn', 'true');
          }
        });
      } else {
        // Handle regular sign in
        signInAction(values).then((data) => {
          console.log(data);
          setError(data?.error);
          setSuccess(data?.success);
          
          // If 2FA is required, show the 2FA form
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
          
          // If login is successful, set a flag in localStorage
          if (data?.success && !data?.error) {
            localStorage.setItem('justLoggedIn', 'true');
          }
        });
      }
    });
  };

  // Handle OAuth sign in
  const onClick = (provider: "google" | "github") => {
    try {
      signIn(provider, {
        callbackUrl: `${DEFAULT_LOGIN_REDIRECT}?login=success`,
        redirect: true
      });
    } catch (error) {
      console.log({ error });
      setError("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-200/50 dark:bg-grid-slate-800/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Back to home button */}
      <motion.div
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </motion.div>

      <div className="w-full max-w-md z-10">
        {/* Logo and heading */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <Image
              src="/logo.svg"
              alt="AI Course Creator"
              width={180}
              height={60}
              className="h-10 w-auto"
            />
          </motion.div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {showTwoFactor ? "Two-Factor Authentication" : "Welcome back"}
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {showTwoFactor 
                ? "Please enter the verification code sent to your email" 
                : "Sign in to your account to continue"}
            </p>
          </motion.div>
        </div>

        {/* Auth card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                ref={formRef}
                className="space-y-5"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Mail className="h-4 w-4 text-slate-400" />
                          </div>
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className={`block w-full pl-10 py-2.5 text-slate-900 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary ${showTwoFactor ? 'opacity-70' : ''}`}
                            disabled={showTwoFactor}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field - Only show when not in 2FA mode */}
                {!showTwoFactor && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <Lock className="h-4 w-4 text-slate-400" />
                            </div>
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="block w-full pl-10 pr-10 py-2.5 text-slate-900 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {/* 2FA Code Field - Only show in 2FA mode */}
                {showTwoFactor && (
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Two-Factor Authentication Code
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <KeyRound className="h-4 w-4 text-slate-400" />
                            </div>
                            <Input
                              id="code"
                              type="text"
                              placeholder="Enter your 2FA code"
                              className="block w-full pl-10 py-2.5 text-slate-900 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Forgot Password - Only show when not in 2FA mode */}
                {!showTwoFactor && (
                  <div className="flex items-center justify-between">
                    <a
                      href="/reset"
                      className="text-sm font-medium text-primary hover:text-primary/80"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}

                {/* Error message */}
                {error && <FormError message={error || urlError} />}
                {success && <FormSuccess message={success} />}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex justify-center items-center py-2.5 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      {showTwoFactor ? "Verifying..." : "Signing in..."}
                    </>
                  ) : (
                    showTwoFactor ? "Verify" : "Sign in"
                  )}
                </button>
              </form>
            </Form>

            {/* OAuth options - Only show when not in 2FA mode */}
            {!showTwoFactor && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => onClick("google")}
                    disabled={isPending}
                    className="w-full flex justify-center items-center py-2.5 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>

                  <button
                    onClick={() => onClick("github")}
                    disabled={isPending}
                    className="w-full flex justify-center items-center py-2.5 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </button>
                </div>
              </div>
            )}
            
            {/* 2FA Instructions - Only show in 2FA mode */}
            {showTwoFactor && (
              <div className="mt-6">
                <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                  <p>We've sent a verification code to your email.</p>
                  <p className="mt-1">Please enter it above to complete sign in.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowTwoFactor(false);
                      setError("");
                      setSuccess("");
                      form.reset();
                    }}
                    className="mt-4 text-primary hover:text-primary/80 font-medium"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:text-primary/90 font-medium"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
