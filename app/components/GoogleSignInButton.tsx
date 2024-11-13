"use client";

import { Button } from "@/components/ui/button";
import GoogleIcon from "../../public/google.svg"
import { signIn } from "next-auth/react";
import Image from "next/image"

export default function GoogleSingInButton() {
  return (
    <Button onClick={() => signIn("Google")} variant="outline" size="icon">
      <Image src={GoogleIcon} alt="GoogleIcon" className="w-6 h-6" />
    </Button>
  );
}
