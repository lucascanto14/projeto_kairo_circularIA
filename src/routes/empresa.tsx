import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/empresa")({
  component: CompanyLayout,
});

function CompanyLayout() {
  return <Outlet />;
}
