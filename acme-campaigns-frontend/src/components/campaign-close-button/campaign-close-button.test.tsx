import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { TestProvider } from "~/support/tests";
import { CampaignCloseButton } from "~/components";
import { closeCampaign } from "~/services";
import { Campaign, CampaignCategoryEnum, CampaignStatusEnum } from "~/schemas";

vi.mock("~/services", () => ({
  closeCampaign: vi.fn(),
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

const mockedCloseCampaign = vi.mocked(closeCampaign);
const mockedOpenConfirmModal = vi.mocked(modals.openConfirmModal);
const mockedNotificationsShow = vi.mocked(notifications.show);

describe("CampaignCloseButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("opens confirm modal on click", async () => {
    render(
      <TestProvider>
        <Menu>
          <CampaignCloseButton campaign={campaign} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Close"));

    expect(mockedOpenConfirmModal).toHaveBeenCalledTimes(1);
  });

  it("calls closeCampaign and shows success notification on confirm", async () => {
    mockedCloseCampaign.mockResolvedValue(campaign);

    render(
      <TestProvider>
        <Menu>
          <CampaignCloseButton campaign={campaign} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Close"));

    const onConfirm = mockedOpenConfirmModal.mock.calls[0][0].onConfirm;

    await onConfirm?.();

    expect(mockedCloseCampaign).toHaveBeenCalledWith(campaign.campaignId);
    expect(mockedNotificationsShow).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Closed",
        message: "Campaign was successfully closed.",
        color: "green",
      })
    );
  });

  it("shows error notification if closeCampaign throws", async () => {
    mockedCloseCampaign.mockRejectedValue(new Error("fail"));

    render(
      <TestProvider>
        <Menu>
          <CampaignCloseButton campaign={campaign} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Close"));

    const onConfirm = mockedOpenConfirmModal.mock.calls[0][0].onConfirm;

    await onConfirm?.();

    expect(mockedNotificationsShow).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error",
        message: "Failed to close the campaign.",
        color: "red",
      })
    );
  });

  it("calls onClosed callback on success", async () => {
    mockedCloseCampaign.mockResolvedValue(campaign);
    const onClosed = vi.fn();

    render(
      <TestProvider>
        <Menu>
          <CampaignCloseButton campaign={campaign} onClosed={onClosed} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Close"));

    const onConfirm = mockedOpenConfirmModal.mock.calls[0][0].onConfirm;

    await onConfirm?.();

    expect(onClosed).toHaveBeenCalled();
  });
});
