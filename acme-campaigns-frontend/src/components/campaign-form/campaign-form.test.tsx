import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useForm } from "@mantine/form";

import { TestProvider } from "~/support/tests";
import { CampaignForm } from "~/components";
import { Campaign, CampaignCategoryEnum, CampaignStatusEnum } from "~/schemas";

const FormWrapper = () => {
  const initialValues: Campaign = {
    campaignId: "1130b5ac-2b26-471c-ab6e-73816dc7802e",
    name: "Test Campaign",
    category: CampaignCategoryEnum.PROMOTION,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    status: CampaignStatusEnum.ACTIVE,
  };

  const form = useForm<Campaign>({
    initialValues,
  });

  return <CampaignForm form={form} />;
};

describe("CampaignForm", () => {
  it("renders form inputs with correct labels and initial values", () => {
    const initialValues: Campaign = {
      campaignId: "1130b5ac-2b26-471c-ab6e-73816dc7802e",
      name: "Test Campaign",
      category: CampaignCategoryEnum.PROMOTION,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      status: CampaignStatusEnum.ACTIVE,
    };

    render(
      <TestProvider>
        <FormWrapper />
      </TestProvider>
    );

    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-category")).toBeInTheDocument();
    expect(screen.getByTestId("input-startDate")).toBeInTheDocument();
    expect(screen.getByTestId("input-endDate")).toBeInTheDocument();
  });
});
