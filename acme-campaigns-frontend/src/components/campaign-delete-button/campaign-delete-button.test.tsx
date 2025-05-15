import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { TestProvider } from "~/support/tests";
import { CampaignDeleteButton } from "~/components";
import { deleteCampaign } from "~/services";
import { Campaign, CampaignCategoryEnum, CampaignStatusEnum } from "~/schemas";

vi.mock("~/services", () => ({
  deleteCampaign: vi.fn(),
}));
vi.mock("@mantine/modals", () => ({
  modals: {
    openConfirmModal: vi.fn(),
  },
}));
vi.mock("@mantine/notifications", () => ({
  notifications: {
    show: vi.fn(),
  },
}));

const campaign: Campaign = {
  campaignId: "1130b5ac-2b26-471c-ab6e-73816dc7802e",
  name: "Test Campaign",
  category: CampaignCategoryEnum.PROMOTION,
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  status: CampaignStatusEnum.ACTIVE,
};

const mockedDeleteCampaign = vi.mocked(deleteCampaign);
const mockedOpenConfirmModal = vi.mocked(modals.openConfirmModal);
const mockedNotificationsShow = vi.mocked(notifications.show);

describe("CampaignDeleteButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("opens confirm modal on click", async () => {
    render(
      <TestProvider>
        <Menu>
          <CampaignDeleteButton campaign={campaign} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Delete"));

    expect(mockedOpenConfirmModal).toHaveBeenCalledTimes(1);
  });

  it("calls deleteCampaign and shows success notification on confirm", async () => {
    mockedDeleteCampaign.mockResolvedValue();

    render(
      <TestProvider>
        <Menu>
          <CampaignDeleteButton campaign={campaign} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Delete"));

    const onConfirm = mockedOpenConfirmModal.mock.calls[0][0].onConfirm;

    await onConfirm?.();

    expect(mockedDeleteCampaign).toHaveBeenCalledWith(campaign.campaignId);
    expect(mockedNotificationsShow).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Deleted",
        message: "Campaign was successfully deleted.",
        color: "green",
      })
    );
  });

  it("shows error notification if deleteCampaign throws", async () => {
    mockedDeleteCampaign.mockRejectedValue(new Error("fail"));

    render(
      <TestProvider>
        <Menu>
          <CampaignDeleteButton campaign={campaign} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Delete"));

    const onConfirm = mockedOpenConfirmModal.mock.calls[0][0].onConfirm;

    await onConfirm?.();

    expect(mockedNotificationsShow).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error",
        message: "Failed to delete the campaign.",
        color: "red",
      })
    );
  });

  it("calls onDeleted callback on success", async () => {
    mockedDeleteCampaign.mockResolvedValue();
    const onDeleted = vi.fn();

    render(
      <TestProvider>
        <Menu>
          <CampaignDeleteButton campaign={campaign} onDeleted={onDeleted} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Delete"));

    const onConfirm = mockedOpenConfirmModal.mock.calls[0][0].onConfirm;

    await onConfirm?.();

    expect(onDeleted).toHaveBeenCalled();
  });
});
