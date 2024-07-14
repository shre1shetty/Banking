"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInputs from "./CustomInputs";
import { AuthFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.action";
import PlaidLink from "./PlaidLink";

// const AuthFormSchema = z.object({
//   username: z
//     .string()
//     .min(2, { message: "Username should be of more than 2 characters " }),
//   email: z.string().email(),
//   password: z
//     .string()
//     .min(8, { message: "Password should contain more than 8 character" }),
// });

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setuser] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  // 1. Define your form.
  const formSchema = AuthFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true);
    try {
      if (type === "sign-up") {
        const userData = {
          email: data.email,
          password: data.password,
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.lastName!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
        };
        const newUser = await signUp(userData);
        // console.log(newUser);
        setuser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8 ">
        <Link href="/" className=" cursor-pointer flex items-center gap-1 ">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-2">
                    <CustomInputs
                      control={form.control}
                      name="firstName"
                      type="text"
                      label="First Name"
                      placeholder="Enter your first name"
                    />

                    <CustomInputs
                      control={form.control}
                      name="lastName"
                      type="text"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInputs
                    control={form.control}
                    name="address1"
                    type="text"
                    label="Address"
                    placeholder="Enter your address"
                  />
                  <CustomInputs
                    control={form.control}
                    name="city"
                    type="text"
                    label="City"
                    placeholder="Enter your City"
                  />
                  <div className="flex gap-2">
                    <CustomInputs
                      control={form.control}
                      name="state"
                      type="text"
                      label="State"
                      placeholder="ex: NY"
                    />

                    <CustomInputs
                      control={form.control}
                      name="postalCode"
                      type="text"
                      label="Postal Code"
                      placeholder="ex: 11001"
                    />
                  </div>
                  <div className="flex gap-2">
                    <CustomInputs
                      control={form.control}
                      name="dateOfBirth"
                      type="text"
                      label="Date of Birth"
                      placeholder="yyyy-mm-dd"
                    />

                    <CustomInputs
                      control={form.control}
                      name="ssn"
                      type="text"
                      label="SSN"
                      placeholder="ex: 1234"
                    />
                  </div>
                </>
              )}

              <CustomInputs
                control={form.control}
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
              />
              <CustomInputs
                control={form.control}
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex justify-center">
                <Button
                  className="form-btn mt-2"
                  type="submit"
                  disabled={isLoading}
                  variant="outline"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp;Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
