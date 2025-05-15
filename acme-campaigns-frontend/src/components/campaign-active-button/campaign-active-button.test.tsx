import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { TestProvider } from "~/support/tests";
import { CampaignActiveButton } from "~/components";
import { activeCampaign } from "~/services";
import { Campaign, CampaignCategoryEnum, CampaignStatusEnum } from "~/schemas";

vi.mock("~/services", () => ({
  activeCampaign: vi.fn(),
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

const mockedActiveCampaign = vi.mocked(activeCampaign);
const mockedOpenConfirmModal = vi.mocked(modals.openConfirmModal);
const mockedNotificationsShow = vi.mocked(notifications.show);

describe("CampaignActiveButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("opens confirm modal on click", async () => {
    render(
      <TestProvider>
        <Menu>
          <CampaignActiveButton campaign={campaign} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Active"));

    expect(mockedOpenConfirmModal).toHaveBeenCalledTimes(1);
  });

  it("calls activeCampaign and shows success notification on confirm", async () => {
    mockedActiveCampaign.mockResolvedValue(campaign);

    render(
      <TestProvider>
        <Menu>
          <CampaignActiveButton campaign={campaign} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Active"));

    const onConfirm = mockedOpenConfirmModal.mock.calls[0][0].onConfirm;

    await onConfirm?.();

    expect(mockedActiveCampaign).toHaveBeenCalledWith(campaign.campaignId);
    expect(mockedNotificationsShow).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Activated",
        message: "Campaign was successfully activated.",
        color: "green",
      })
    );
  });

  it("shows error notification if activeCampaign throws", async () => {
    mockedActiveCampaign.mockRejectedValue(new Error("fail"));

    render(
      <TestProvider>
        <Menu>
          <CampaignActiveButton campaign={campaign} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Active"));

    const onConfirm = mockedOpenConfirmModal.mock.calls[0][0].onConfirm;

    await onConfirm?.();

    expect(mockedNotificationsShow).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error",
        message: "Failed to activate the campaign.",
        color: "red",
      })
    );
  });

  it("calls onActivated callback on success", async () => {
    mockedActiveCampaign.mockResolvedValue(campaign);
    const onActivated = vi.fn();

    render(
      <TestProvider>
        <Menu>
          <CampaignActiveButton campaign={campaign} onActivated={onActivated} />
        </Menu>
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Active"));

    const onConfirm = mockedOpenConfirmModal.mock.calls[0][0].onConfirm;

    await onConfirm?.();

    expect(onActivated).toHaveBeenCalled();
  });
});
