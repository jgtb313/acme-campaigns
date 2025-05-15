import { Flex } from "@mantine/core";

import { NewCampaignForm } from "~/components";
import { Breadcrumbs } from "~/ui";

const Page = async () => {
  return (
    <Flex direction="column" gap={32}>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Campaigns", href: "/campaigns" },
          { label: "New Campaign" },
        ]}
      />

      <Flex justify="center">
        <NewCampaignForm />
      </Flex>
    </Flex>
  );
};

export default Page;
