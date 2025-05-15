import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { TestProvider } from "~/support/tests";
import { EditCampaignForm } from "~/components";
import { Campaign, CampaignCategoryEnum, CampaignStatusEnum } from "~/schemas";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mutateMock = vi.fn();
const useUpdateCampaignMock = vi.fn(() => ({
  mutate: mutateMock,
  isPending: false,
}));

vi.mock("~/stores", () => ({
  useUpdateCampaign: () => useUpdateCampaignMock(),
}));

describe("EditCampaignForm", () => {
  const campaign: Campaign = {
    campaignId: "1130b5ac-2b26-471c-ab6e-73816dc7802e",
    name: "Campaign to Edit",
    category: CampaignCategoryEnum.PROMOTION,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000).toISOString(),
    status: CampaignStatusEnum.ACTIVE,
  };

  beforeEach(() => {
    mutateMock.mockReset();
  });

  it("renders inputs with initial campaign data", () => {
    render(
      <TestProvider>
        <EditCampaignForm campaign={campaign} />
      </TestProvider>
    );

    expect(screen.getByTestId("input-name")).toHaveValue(campaign.name);
    expect(screen.getByTestId("input-category")).toHaveValue(campaign.category);
  });

  it("calls mutate on submit and redirects on success", async () => {
    render(
      <TestProvider>
        <EditCampaignForm campaign={campaign} />
      </TestProvider>
    );

    const nameInput = screen.getByTestId("input-name");
    fireEvent.change(nameInput, { target: { value: "Updated Campaign" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledTimes(1);

      expect(mutateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          campaignId: campaign.campaignId,
          name: "Updated Campaign",
        }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });

    const onSuccess = mutateMock.mock.calls[0][1].onSuccess;
    onSuccess({ campaignId: campaign.campaignId });
  });
});
