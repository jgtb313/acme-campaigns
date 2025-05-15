import { Flex } from "@mantine/core";

import { EditCampaignForm } from "~/components";
import { Breadcrumbs } from "~/ui";
import { getCampaign } from "~/services";

type PageProps = {
  params: Promise<{ campaignId: string }>;
};

const Page = async ({ params }: PageProps) => {
  const { campaignId } = await params;
  const campaign = await getCampaign(campaignId);

  return (
    <Flex direction="column" gap={32}>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Campaigns", href: "/campaigns" },
          { label: "Edit Campaign" },
        ]}
      />

      <Flex justify="center">
        <EditCampaignForm campaign={campaign} />
      </Flex>
    </Flex>
  );
};

export default Page;
