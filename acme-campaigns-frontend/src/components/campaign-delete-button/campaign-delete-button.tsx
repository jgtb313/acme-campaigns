import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconTrashFilled } from "@tabler/icons-react";

import { Campaign } from "~/schemas";
import { deleteCampaign } from "~/services";

type CampaignDeleteButtonProps = {
  campaign: Campaign;
  onDeleted?: () => void;
};

export const CampaignDeleteButton = ({
  campaign,
  onDeleted,
}: CampaignDeleteButtonProps) => {
  const handleDelete = async () => {
    try {
      await deleteCampaign(campaign.campaignId);

      notifications.show({
        title: "Deleted",
        message: "Campaign was successfully deleted.",
        color: "green",
      });

      onDeleted?.();
    } catch (error) {
      console.log(error);

      notifications.show({
        title: "Error",
        message: "Failed to delete the campaign.",
        color: "red",
      });
    }
  };

  const confirmDelete = () => {
    modals.openConfirmModal({
      title: "Delete campaign?",
      children: "This action cannot be undone.",
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: handleDelete,
    });
  };

  return (
    <Menu.Item
      leftSection={<IconTrashFilled size={14} />}
      onClick={confirmDelete}
    >
      Delete
    </Menu.Item>
  );
};
