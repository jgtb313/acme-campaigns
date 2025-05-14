"use client";

import type { PropsWithChildren } from "react";
import { AppShell } from "@mantine/core";
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

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 190, breakpoint: "sm" }}
      padding="xl"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar items={navbarItems} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
