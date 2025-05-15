import { Campaign, Pagination, PaginationResponse } from "~/schemas";
import { campaignApi, buildQueryParams } from "~/services/campaign.api";

export const listCampaignsPaginated = (
  input?: Pagination<Partial<Pick<Campaign, "name" | "status">>>
): Promise<PaginationResponse<Campaign>> =>
  campaignApi(`/campaigns${buildQueryParams(input)}`, {
    method: "GET",
  });

export const getCampaign = (campaignId: string): Promise<Campaign> =>
  campaignApi(`/campaigns/${campaignId}`, { method: "GET" });

export const createCampaign = (
  input: Pick<Campaign, "name" | "category" | "startDate" | "endDate">
): Promise<Campaign> =>
  campaignApi(`/campaigns`, {
    method: "POST",
    body: JSON.stringify(input),
  });

export const updateCampaign = ({
  campaignId,
  ...input
}: Pick<Campaign, "campaignId"> &
  Partial<
    Pick<Campaign, "name" | "category" | "startDate" | "endDate">
  >): Promise<Campaign> =>
  campaignApi(`/campaigns/${campaignId}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });

export const activeCampaign = (campaignId: string): Promise<Campaign> =>
  campaignApi(`/campaigns/${campaignId}/active`, { method: "PATCH" });

export const closeCampaign = (campaignId: string): Promise<Campaign> =>
  campaignApi(`/campaigns/${campaignId}/close`, { method: "PATCH" });

export const deleteCampaign = (campaignId: string): Promise<void> =>
  campaignApi(`/campaigns/${campaignId}`, {
    method: "DELETE",
  });
