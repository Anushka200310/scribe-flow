"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ChartNoAxesColumn, Edit3Icon, FolderOpenIcon } from "lucide-react";

const Header = () => {

  return (
    <header className="container mx-auto">
      <nav className="py-6 flex justify-between px-4 items-center">
        <Link
          href={"/"}
          className="text-gray-700 font-bold text-2xl md:text-3xl gradient-color"
        >
          Scribe Flow
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/scribe/write-new">
            <Button className="flex items-center gap-2 justify-center">
              <Edit3Icon size={16} />
              <span className="hidden md:inline">Create New</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard#collections">
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-center"
              >
                <FolderOpenIcon size={16} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Dashboard"
                  labelIcon={<ChartNoAxesColumn size={16} />}
                  href="/dashboard"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
