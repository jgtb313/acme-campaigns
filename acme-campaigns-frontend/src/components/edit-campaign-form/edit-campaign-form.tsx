"use client";

import { useRouter } from "next/navigation";
import {
  Group,
  Card,
  CardSection,
  Title,
  Button,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { CampaignSchema, Campaign } from "~/schemas";
import { CampaignForm } from "~/components";
import { useUpdateCampaign } from "~/stores";

type EditCampaignFormProps = {
  campaign: Campaign;
};

const EditCampaignSchema = CampaignSchema.pick({
  name: true,
  category: true,
  startDate: true,
  endDate: true,
})
  .partial()
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: "End date must be greater than start date.",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.startDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(data.startDate) >= today;
      }
      return true;
    },
    {
      message: "Start date must be today or later.",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      const hasStart = data.startDate !== undefined;
      const hasEnd = data.endDate !== undefined;
      return hasStart === hasEnd;
    },
    {
      message: "Both startDate and endDate must be provided together.",
      path: ["startDate", "endDate"],
    }
  );
type EditCampaignInput = z.infer<typeof EditCampaignSchema>;

export const EditCampaignForm = ({ campaign }: EditCampaignFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateCampaign();
  const form = useForm<Campaign>({
    initialValues: campaign,
    validate: zodResolver(EditCampaignSchema),
  });

  const handleSubmit = (input: EditCampaignInput) => {
    mutate(
      { ...input, campaignId: campaign.campaignId },
      {
        onSuccess: ({ campaignId }) => {
          router.push(`/campaigns/${campaignId}`);
        },
      }
    );
  };

  return (
    <Card w={600} shadow="sm" radius="md" withBorder>
      <CardSection p="md">
        <Title order={3}>Edit Campaign: {campaign.name}</Title>
      </CardSection>

      <Divider mb="sm" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <CampaignForm form={form} />

        <Group justify="center" mt="lg">
          <Button type="submit" loading={isPending}>
            Submit
          </Button>
        </Group>
      </form>
    </Card>
  );
};
