import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { CampaignStatus } from "~/components";
import { TestProvider } from "~/support/tests";
import { Campaign, CampaignStatusEnum, CampaignCategoryEnum } from "~/schemas";

describe("CampaignStatus", () => {
  const baseCampaign: Omit<Campaign, "status"> = {
    campaignId: "1130b5ac-2b26-471c-ab6e-73816dc7802e",
    name: "Test Campaign",
    category: CampaignCategoryEnum.PROMOTION,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  };

  it.each([
    CampaignStatusEnum.ACTIVE,
    CampaignStatusEnum.CLOSED,
    CampaignStatusEnum.EXPIRED,
  ])(
    "should render badge with correct color and text for status %s",
    (status) => {
      const campaign = { ...baseCampaign, status };

      render(
        <TestProvider>
          <CampaignStatus campaign={campaign} />
        </TestProvider>
      );

      const badge = screen.getByText(status);
      expect(badge).toBeInTheDocument();
    }
  );
});
