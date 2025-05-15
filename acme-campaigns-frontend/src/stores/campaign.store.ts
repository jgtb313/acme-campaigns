import { useQuery, useMutation } from "@tanstack/react-query";

import { Campaign, Pagination, PaginationResponse } from "~/schemas";
import {
  listCampaignsPaginated,
  getCampaign,
  createCampaign,
  updateCampaign,
  activeCampaign,
  closeCampaign,
  deleteCampaign,
} from "~/services";

export const useListCampaignsPaginated = (
  input?: Pagination<Partial<Pick<Campaign, "name" | "status">>>
) => {
  const queryKey = input ? ["campaigns", JSON.stringify(input)] : ["campaigns"];

  return useQuery<PaginationResponse<Campaign>>({
    queryKey,
    queryFn: () => listCampaignsPaginated(input),
    staleTime: 0,
  });
};

export const useGetCampaign = (campaignId: string) => {
  return useQuery<Campaign>({
    queryKey: ["campaign", campaignId],
    queryFn: () => getCampaign(campaignId),
    enabled: !!campaignId,
    staleTime: 0,
  });
};

export const useCreateCampaign = () => {
  return useMutation({
    mutationFn: createCampaign,
  });
};

export const useUpdateCampaign = () => {
  return useMutation({
    mutationFn: updateCampaign,
  });
};

export const useActiveCampaign = () => {
  return useMutation({
    mutationFn: activeCampaign,
  });
};

export const useCloseCampaign = () => {
  return useMutation({
    mutationFn: closeCampaign,
  });
};

export const useDeleteCampaign = () => {
  return useMutation({
    mutationFn: deleteCampaign,
  });
};
