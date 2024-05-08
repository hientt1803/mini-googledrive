"use client";

import {
  OrganizationSwitcher,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const Header = () => {
  const { user } = useUser();

  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>MiniDrive</div>
          <div className="flex gap-2">
            {user ? (
              <>
                <OrganizationSwitcher />
                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button>Sign In</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Sign Up</Button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
