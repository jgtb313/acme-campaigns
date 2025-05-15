import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { TestProvider } from "~/support/tests";
import { NewCampaignForm } from "~/components";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mutateMock = vi.fn();
const useCreateCampaignMock = vi.fn(() => ({
  mutate: mutateMock,
  isPending: false,
}));

vi.mock("~/stores", () => ({
  useCreateCampaign: () => useCreateCampaignMock(),
}));

describe("NewCampaignForm", () => {
  beforeEach(() => {
    mutateMock.mockReset();
  });

  it("renders form and submits correctly", async () => {
    render(
      <TestProvider>
        <NewCampaignForm />
      </TestProvider>
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 2);

    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];

    const nameInput = screen.getByTestId("input-name");
    fireEvent.change(nameInput, { target: { value: "New Campaign" } });

    fireEvent.mouseDown(screen.getByTestId("input-category"));
    const option = await screen.findByText("PROMOTION");
    fireEvent.click(option);

    const startDateInput = screen.getByTestId("input-startDate");
    fireEvent.change(startDateInput, { target: { value: startDateStr } });
    fireEvent.blur(startDateInput);

    const endDateInput = screen.getByTestId("input-endDate");
    fireEvent.change(endDateInput, { target: { value: endDateStr } });
    fireEvent.blur(endDateInput);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledTimes(1);
      expect(mutateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "New Campaign",
          category: "PROMOTION",
          startDate: "2025-05-16",
          endDate: "2025-05-17",
        }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });
  });
});
