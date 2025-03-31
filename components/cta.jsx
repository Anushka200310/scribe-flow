"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignInButton, useAuth } from "@clerk/clerk-react";

const CtaSection = () => {
  const { userId } = useAuth();
  return (
    <section className="py-20 bg-transparent border-t-2">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-color">
              Ready to Transform Your Project Management?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl text-muted-foreground">
              Join thousands of individuals already using Scribe Flow
            </p>
          </div>
          <Button size="lg" className="h-12 px-8 text-lg" asChild>
            <Link href="/dashboard">
              {userId ? (
                "Get Started"
              ) : (
                <SignInButton>
                  Sign In
                </SignInButton>
              )}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
