import { Badge } from "@mantine/core";

import { Campaign } from "~/schemas";

type CampaignCategoryProps = {
  campaign: Campaign;
};

export const CampaignCategory = ({ campaign }: CampaignCategoryProps) => {
  return <Badge>{campaign.category}</Badge>;
};
