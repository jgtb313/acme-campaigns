import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { UserMenu } from "~/components";
import { TestProvider } from "~/support/tests";

describe("UserMenu", () => {
  it("should render user name, email and logout menu item", async () => {
    render(
      <TestProvider>
        <UserMenu />
      </TestProvider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@acme.dev")).toBeInTheDocument();
  });
});
