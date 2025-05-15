import { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

export const TestProvider = ({ children }: PropsWithChildren) => {
  return <MantineProvider>{children}</MantineProvider>;
};
