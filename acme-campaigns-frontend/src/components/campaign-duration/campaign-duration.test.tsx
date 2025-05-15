import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { CampaignDetails } from "~/components";
import { TestProvider } from "~/support/tests";
import { CampaignCategoryEnum, CampaignStatusEnum, Campaign } from "~/schemas";

describe("CampaignDetails", () => {
  const campaign: Campaign = {
    campaignId: "1130b5ac-2b26-471c-ab6e-73816dc7802e",
    name: "Test Campaign",
    category: CampaignCategoryEnum.PROMOTION,
    startDate: "2024-01-01T00:00:00.000Z",
    endDate: "2024-12-31T23:59:59.000Z",
    status: CampaignStatusEnum.ACTIVE,
  };

  it("should render campaign name, ID, category, status, and duration", () => {
    render(
      <TestProvider>
        <CampaignDetails campaign={campaign} />
      </TestProvider>
    );

    expect(
      screen.getByRole("heading", { name: /test campaign/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ID: 1130b5ac/i)).toBeInTheDocument();
    expect(
      screen.getByText(CampaignCategoryEnum.PROMOTION)
    ).toBeInTheDocument();
    expect(screen.getByText(CampaignStatusEnum.ACTIVE)).toBeInTheDocument();
    expect(screen.getByText(/31 de December/)).toBeInTheDocument();
  });
});
