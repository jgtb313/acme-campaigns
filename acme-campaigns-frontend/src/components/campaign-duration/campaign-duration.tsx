import { Text } from "@mantine/core";
import { format, parseISO } from "date-fns";

import { Campaign } from "~/schemas";

type CampaignDurationProps = {
  campaign: Campaign;
};

export const CampaignDuration = ({ campaign }: CampaignDurationProps) => {
  return (
    <Text>
      {format(parseISO(campaign.startDate), "dd 'de' MMMM")} -{" "}
      {format(parseISO(campaign.endDate), "dd 'de' MMMM")}
    </Text>
  );
};
