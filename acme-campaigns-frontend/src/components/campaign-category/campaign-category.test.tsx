import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TestProvider } from "~/support/tests";
import { Campaign, CampaignCategoryEnum, CampaignStatusEnum } from "~/schemas";
import { CampaignCategory } from "~/components";

describe("CampaignCategory", () => {
  it("should render the campaign category as a Badge", () => {
    const campaign: Campaign = {
      campaignId: "1130b5ac-2b26-471c-ab6e-73816dc7802e",
      name: "Test Campaign",
      category: CampaignCategoryEnum.PROMOTION,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      status: CampaignStatusEnum.ACTIVE,
    };

    render(
      <TestProvider>
        <CampaignCategory campaign={campaign} />
      </TestProvider>
    );

    expect(
      screen.getByText(CampaignCategoryEnum.PROMOTION)
    ).toBeInTheDocument();
  });
});
