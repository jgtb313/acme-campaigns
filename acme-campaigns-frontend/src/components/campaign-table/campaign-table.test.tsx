import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { TestProvider } from "~/support/tests";
import { CampaignTable } from "~/components";
import { Campaign, CampaignStatusEnum, CampaignCategoryEnum } from "~/schemas";

const campaigns: Campaign[] = [
  {
    campaignId: "c1",
    name: "Test Campaign 1",
    category: CampaignCategoryEnum.PROMOTION,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    status: CampaignStatusEnum.ACTIVE,
  },
  {
    campaignId: "c2",
    name: "Test Campaign 2",
    category: CampaignCategoryEnum.PROMOTION,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    status: CampaignStatusEnum.ACTIVE,
  },
];

describe("CampaignTable", () => {
  it("renders table headers", () => {
    render(
      <TestProvider>
        <CampaignTable items={[]} />
      </TestProvider>
    );

    expect(screen.getByText(/id/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/category/i)).toBeInTheDocument();
    expect(screen.getByText(/duration/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/actions/i)).toBeInTheDocument();
  });

  it("renders campaign data rows", () => {
    render(
      <TestProvider>
        <CampaignTable items={campaigns} />
      </TestProvider>
    );

    expect(screen.getByText("c1")).toBeInTheDocument();
    expect(screen.getByText("c2")).toBeInTheDocument();

    expect(screen.getByText("Test Campaign 1")).toBeInTheDocument();
    expect(screen.getByText("Test Campaign 2")).toBeInTheDocument();
  });
  it("calls onPageChange when pagination changes", async () => {
    const onPageChange = vi.fn();

    render(
      <TestProvider>
        <CampaignTable
          items={campaigns}
          pagination={{ currentPage: 1, totalItems: 10, totalPages: 3 }}
          onPageChange={onPageChange}
        />
      </TestProvider>
    );

    await userEvent.click(screen.getByRole("button", { name: "2" }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
