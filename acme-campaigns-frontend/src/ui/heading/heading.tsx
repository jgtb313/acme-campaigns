import { PropsWithChildren } from "react";
import { Flex, Badge, Text } from "@mantine/core";

type HeadingProps = {
  title: string;
  description: string;
  totalIndicator: number;
};

export const Heading = ({
  title,
  description,
  totalIndicator,
  children,
}: PropsWithChildren<HeadingProps>) => {
  return (
    <Flex justify="space-between">
      <Flex direction="column" gap={8}>
        <Flex align="center" gap={8}>
          <Text component="h3" size="1.5rem" fw={600}>
            {title}
          </Text>

          <Badge color="blue">{totalIndicator.toLocaleString("pt-BR")}</Badge>
        </Flex>

        {description && <Text>{description}</Text>}
      </Flex>

      {children}
    </Flex>
  );
};
