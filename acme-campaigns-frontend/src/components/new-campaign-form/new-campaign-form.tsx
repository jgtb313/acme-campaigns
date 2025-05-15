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
import { useCreateCampaign } from "~/stores";

type NewCampaignFormProps = {};

const NewCampaignSchema = CampaignSchema.pick({
  name: true,
  category: true,
  startDate: true,
  endDate: true,
})
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be greater than start date.",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(data.startDate) >= today;
    },
    {
      message: "Start date must be today or later.",
      path: ["startDate"],
    }
  );
type NewCampaignInput = z.infer<typeof NewCampaignSchema>;

export const NewCampaignForm = ({}: NewCampaignFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useCreateCampaign();
  const form = useForm<Campaign>({
    validate: zodResolver(NewCampaignSchema),
  });

  const handleSubmit = (input: NewCampaignInput) => {
    mutate(input, {
      onSuccess: ({ campaignId }) => {
        router.push(`/campaigns/${campaignId}`);
      },
    });
  };

  return (
    <Card w={600} shadow="sm" radius="md" withBorder>
      <CardSection p="md">
        <Title order={3}>New Campaign</Title>
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
