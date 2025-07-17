import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#FF0080] via-[#FFD6FF] to-[#C6ACFF] dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="glass-card w-full max-w-md mx-4 p-6 rounded-3xl border-0 shadow-2xl backdrop-blur-xl bg-white/10 dark:bg-black/10 animate-fade-in">
        <div className="flex mb-4 gap-2">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold text-foreground">404 Page Not Found</h1>
        </div>

                  <p className="mt-4 text-sm text-muted-foreground">
          Did you forget to add the page to the router?
        </p>
      </div>
    </div>
  );
}
