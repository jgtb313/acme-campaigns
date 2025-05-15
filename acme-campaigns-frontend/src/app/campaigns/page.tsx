"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Flex } from "@mantine/core";

import { CampaignTable } from "~/components";
import { Breadcrumbs, Heading } from "~/ui";
import { useListCampaignsPaginated } from "~/stores";

const Page = () => {
  const searchParams = useSearchParams();

  const pageFromParams = searchParams.get("page");
  const page = pageFromParams ? Number(pageFromParams) : 1;

  const { data, refetch } = useListCampaignsPaginated({
    offset: (page - 1) * 10,
  });

  const handlePageChange = (value: number) => {
    const url = new URL(window.location.href);

    url.searchParams.set("page", `${value}`);

    window.history.replaceState({}, "", url);
  };

  return (
    <Flex direction="column" gap={32}>
      <Breadcrumbs
        items={[{ label: "Dashboard", href: "/" }, { label: "Campaigns" }]}
      />

      <Heading
        title="Campaigns"
        description="Manage your campaigns with ease. Track, organize, and create new campaigns to streamline your marketing efforts."
        totalIndicator={data?.meta.totalItems ?? 0}
      >
        <Button component={Link} href="/campaigns/new" size="md">
          New Campaign
        </Button>
      </Heading>

      <CampaignTable
        items={data?.values}
        pagination={{
          currentPage: page,
          totalItems: data?.meta?.totalItems ?? 0,
          totalPages: data?.meta?.totalPages ?? 0,
        }}
        onActivate={refetch}
        onClosed={refetch}
        onDeleted={refetch}
        onPageChange={handlePageChange}
      />
    </Flex>
  );
};

export default Page;
