import { IconLogout } from "@tabler/icons-react";
import { Group, Flex, Menu, Avatar, Text } from "@mantine/core";

export const UserMenu = () => {
  return (
    <Group className="cursor-pointer" justify="center">
      <Menu withArrow width={300} position="bottom" withinPortal>
        <Menu.Target>
          <Group>
            <Avatar
              radius="xl"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
            />

            <Flex direction="column">
              <Text fw={500}>John Doe</Text>
              <Text size="xs" c="dimmed">
                john.doe@acme.dev
              </Text>
            </Flex>
          </Group>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
