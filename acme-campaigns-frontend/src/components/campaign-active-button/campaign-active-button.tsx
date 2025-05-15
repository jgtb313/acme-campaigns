import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconRefresh } from "@tabler/icons-react";

import { Campaign } from "~/schemas";
import { activeCampaign } from "~/services";

type CampaignActiveButtonProps = {
  campaign: Campaign;
  onActivated?: () => void;
};

export const CampaignActiveButton = ({
  campaign,
  onActivated,
}: CampaignActiveButtonProps) => {
  const handleActivate = async () => {
    try {
      await activeCampaign(campaign.campaignId);

      notifications.show({
        title: "Activated",
        message: "Campaign was successfully activated.",
        color: "green",
      });

      onActivated?.();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to activate the campaign.",
        color: "red",
      });
    }
  };

  const confirmActivate = () => {
    modals.openConfirmModal({
      title: "Activate campaign?",
      children: "This action will make the campaign active.",
      labels: { confirm: "Activate", cancel: "Cancel" },
      confirmProps: { color: "green" },
      onConfirm: handleActivate,
    });
  };

  return (
    <Menu.Item
      leftSection={<IconRefresh size={14} />}
      onClick={confirmActivate}
    >
      Active
    </Menu.Item>
  );
};
