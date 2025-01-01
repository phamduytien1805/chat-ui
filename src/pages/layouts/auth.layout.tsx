import { SparklesPreview } from "@/shared/ui/sparkles-preview/sparkles-preview.ui";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="dark grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-muted">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <SparklesPreview />
      </div>
    </div>
  )
}
