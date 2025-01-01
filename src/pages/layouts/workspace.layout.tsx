import { Outlet } from "react-router-dom";

export function WorkspaceLayout() {
  return (
    <div className="min-h-svh">
     <Outlet />

    </div>
  )
}
