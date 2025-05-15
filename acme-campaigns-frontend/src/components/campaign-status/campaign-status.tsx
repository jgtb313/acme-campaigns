import { Badge, BadgeProps } from "@mantine/core";

import { Campaign, CampaignStatusEnum } from "~/schemas";

type CampaignStatusProps = {
  campaign: Campaign;
};

const variants: Record<CampaignStatusEnum, BadgeProps["color"]> = {
  ACTIVE: "green",
  CLOSED: "cyan",
  EXPIRED: "red",
};

export const CampaignStatus = ({ campaign }: CampaignStatusProps) => {
  return <Badge color={variants[campaign.status]}>{campaign.status}</Badge>;
};
