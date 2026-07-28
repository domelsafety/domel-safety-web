import Image from "next/image";
import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.png"
            alt="Domel Safety"
            width={48}
            height={48}
            className="h-12 w-auto mb-3"
          />
          <h1 className="font-display text-lg font-bold text-charcoal">
            Admin Dashboard
          </h1>
          <p className="text-xs text-steel mt-1">Domel Safety Company Limited</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
