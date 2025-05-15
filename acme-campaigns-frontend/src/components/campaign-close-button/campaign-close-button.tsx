import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconRefresh } from "@tabler/icons-react";

import { Campaign } from "~/schemas";
import { closeCampaign } from "~/services";

type CampaignCloseButtonProps = {
  campaign: Campaign;
  onClosed?: () => void;
};

export const CampaignCloseButton = ({
  campaign,
  onClosed,
}: CampaignCloseButtonProps) => {
  const handleClose = async () => {
    try {
      await closeCampaign(campaign.campaignId);

      notifications.show({
        title: "Closed",
        message: "Campaign was successfully closed.",
        color: "green",
      });

      onClosed?.();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to close the campaign.",
        color: "red",
      });
    }
  };

  const confirmClose = () => {
    modals.openConfirmModal({
      title: "Close campaign?",
      children: "This action will close the campaign and make it inactive.",
      labels: { confirm: "Close", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: handleClose,
    });
  };

  return (
    <Menu.Item leftSection={<IconRefresh size={14} />} onClick={confirmClose}>
      Close
    </Menu.Item>
  );
};
