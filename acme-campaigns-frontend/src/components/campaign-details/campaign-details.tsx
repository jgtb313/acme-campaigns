import {
  Flex,
  Group,
  Card,
  CardSection,
  Title,
  Text,
  Divider,
} from "@mantine/core";

import { Campaign } from "~/schemas";
import {
  CampaignCategory,
  CampaignDuration,
  CampaignStatus,
} from "~/components";

type CampaignDetailsProps = {
  campaign: Campaign;
};

export const CampaignDetails = ({ campaign }: CampaignDetailsProps) => {
  return (
    <Flex justify="center" mt="xl">
      <Card w={600} shadow="sm" radius="md" withBorder>
        <CardSection p="md">
          <Title order={3}>{campaign.name}</Title>

          <Text size="sm" color="dimmed" mt="xs">
            ID: {campaign.campaignId}
          </Text>
        </CardSection>

        <Divider my="sm" />

        <Group>
          <CampaignCategory campaign={campaign} />

          <CampaignStatus campaign={campaign} />
        </Group>

        <Divider my="sm" />

        <CampaignDuration campaign={campaign} />
      </Card>
    </Flex>
  );
};
