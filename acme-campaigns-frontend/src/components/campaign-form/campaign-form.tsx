import { Stack, TextInput, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";

import { Campaign, campaignCategories } from "~/schemas";

type CampaignFormProps = {
  form: UseFormReturnType<Campaign>;
};

export const CampaignForm = ({ form }: CampaignFormProps) => {
  return (
    <Stack>
      <TextInput
        {...form.getInputProps("name")}
        label="Name"
        placeholder="Campaign name"
        required
        data-testid="input-name"
      />

      <Select
        {...form.getInputProps("category")}
        label="Category"
        placeholder="Select category"
        data={campaignCategories}
        required
        data-testid="input-category"
      />

      <DateInput
        {...form.getInputProps("startDate")}
        label="Start date"
        placeholder="Pick start date"
        required
        data-testid="input-startDate"
      />

      <DateInput
        {...form.getInputProps("endDate")}
        label="End date"
        placeholder="Pick end date"
        required
        data-testid="input-endDate"
      />
    </Stack>
  );
};
