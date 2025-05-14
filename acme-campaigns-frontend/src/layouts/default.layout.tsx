"use client";

import type { PropsWithChildren } from "react";
import { AppShell, Container, Flex } from "@mantine/core";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 210, breakpoint: "sm" }}
      padding="xl"
    >
      <AppShell.Header>
        <Container fluid>
          <Flex direction="row" justify="space-between"></Flex>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar></AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
