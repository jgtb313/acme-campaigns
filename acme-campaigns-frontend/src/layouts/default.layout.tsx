"use client";

import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { AppShell } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IconLayoutDashboard, IconMessages } from "@tabler/icons-react";

import { Header, Navbar, NavbarItemProps } from "~/ui";

const navbarItems: NavbarItemProps[] = [
  {
    label: "Dashboard",
    to: "/",
    icon: IconLayoutDashboard,
  },
  {
    label: "Campaigns",
    to: "/campaigns",
    icon: IconMessages,
  },
];

const queryClient = new QueryClient();

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        header={{ height: 80 }}
        navbar={{ width: 190, breakpoint: "sm" }}
        padding="xl"
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Navbar>
          <Navbar active={pathname} items={navbarItems} />
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </QueryClientProvider>
  );
};
