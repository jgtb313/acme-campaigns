import { Container, Flex } from "@mantine/core";

import { Brand, UserMenu } from "~/components";

export const Header = () => {
  return (
    <Container fluid>
      <Flex direction="row" justify="space-between">
        <Brand width={120} height={80} />

        <UserMenu />
      </Flex>
    </Container>
  );
};
