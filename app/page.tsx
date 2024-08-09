import { VerifyEmail } from "@/components/templates/email-verify";

export default function Home() {
  return (
    <main className="mt-10">
      <VerifyEmail code={"222222"} />
    </main>
  );
}
