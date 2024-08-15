"use client"

import { signOut } from "next-auth/react";

export default function Home() {
  const handleSignOut = () => {
    signOut()
  }
  return (
    <main className="mt-10">
        <button onClick={handleSignOut}>Sign out</button>      
    </main>
  );
}
