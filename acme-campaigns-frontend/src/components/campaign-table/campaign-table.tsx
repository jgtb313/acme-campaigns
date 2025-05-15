import Link from "next/link";
import { Flex, Table, Pagination, Menu, ActionIcon } from "@mantine/core";
import { IconEye, IconDotsVertical } from "@tabler/icons-react";

import { Campaign, CampaignStatusEnum } from "~/schemas";
import {
  CampaignCategory,
  CampaignDuration,
  CampaignStatus,
  CampaignActiveButton,
  CampaignCloseButton,
  CampaignDeleteButton,
} from "~/components";

type CampaignTableProps = {
  items?: Campaign[];
  pagination?: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
  onActivate?: () => void;
  onClosed?: () => void;
  onDeleted?: () => void;
};

export const CampaignTable = ({
  items = [],
  pagination,
  onPageChange,
  onActivate,
  onClosed,
  onDeleted,
}: CampaignTableProps) => {
  const rows = items.map((campaign) => (
    <Table.Tr key={campaign.campaignId}>
      <Table.Td width={350}>{campaign.campaignId}</Table.Td>

      <Table.Td>{campaign.name}</Table.Td>

      <Table.Td>
        <CampaignCategory campaign={campaign} />
      </Table.Td>

      <Table.Td>
        <CampaignDuration campaign={campaign} />
      </Table.Td>

      <Table.Td>
        <CampaignStatus campaign={campaign} />
      </Table.Td>

      <Table.Td width={20} align="center">
        <Menu shadow="md" width={200} withArrow>
          <Menu.Target>
            <ActionIcon variant="filled" color="dark">
              <IconDotsVertical
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              href={`/campaigns/${campaign.campaignId}`}
              leftSection={<IconEye size={14} />}
            >
              Details
            </Menu.Item>

            {campaign.status !== CampaignStatusEnum.EXPIRED && (
              <Menu.Item
                component={Link}
                href={`/campaigns/${campaign.campaignId}/edit`}
                leftSection={<IconEye size={14} />}
              >
                Edit
              </Menu.Item>
            )}

            {campaign.status === CampaignStatusEnum.ACTIVE && (
              <CampaignCloseButton campaign={campaign} onClosed={onClosed} />
            )}

            {campaign.status === CampaignStatusEnum.CLOSED && (
              <CampaignActiveButton
                campaign={campaign}
                onActivated={onActivate}
              />
            )}

            <CampaignDeleteButton campaign={campaign} onDeleted={onDeleted} />
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Flex direction="column" gap={16}>
      <Table verticalSpacing="md" withRowBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Duration</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Flex justify="center">
        <Pagination
          value={pagination?.currentPage}
          total={pagination?.totalPages ?? 0}
          onChange={onPageChange}
        />
      </Flex>
    </Flex>
  );
};
