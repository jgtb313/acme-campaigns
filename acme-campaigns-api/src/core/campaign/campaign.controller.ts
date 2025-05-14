import { Controller, Get, Post, Patch, Delete, Query, Param, Body, HttpCode } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBody, ApiResponse, ApiExtraModels } from '@nestjs/swagger'
import { UseZodGuard, createZodDto, zodToOpenAPI } from 'nestjs-zod'
import { z } from 'zod'

import { PaginationResponseSchema, BadRequestErrorSchema, NotFoundRequestErrorSchema, InternalServerErrorSchema } from '@/support/schema'
import { CampaignService } from '@/core/campaign/campaign.service'
import {
  CampaignSchema,
  ListCampaignsQuery,
  ListCampaignsQuerySchema,
  ListCampaignsQueryInput,
  GetCampaignParams,
  GetCampaignParamsSchema,
  GetCampaignParamsInput,
  CreateCampaignBodySchema,
  CreateCampaignBodyInput,
  UpdateCampaignParams,
  UpdateCampaignParamsSchema,
  UpdateCampaignParamsInput,
  UpdateCampaignBodySchema,
  UpdateCampaignBodyInput,
  ActiveCampaignParams,
  ActiveCampaignParamsSchema,
  ActiveCampaignParamsInput,
  CloseCampaignParams,
  CloseCampaignParamsSchema,
  CloseCampaignParamsInput,
  DeleteCampaignParams,
  DeleteCampaignParamsSchema,
  DeleteCampaignParamsInput,
} from '@/core/campaign/campaign.controller.schema'

@Controller('campaigns')
@ApiTags('Campaign')
@ApiExtraModels(class Campaign extends createZodDto(CampaignSchema) {})
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'List all campaigns',
    description: 'Returns a paginated list of campaigns, optionally filtered by query parameters.',
  })
  @ApiQuery({
    name: 'name',
    schema: zodToOpenAPI(ListCampaignsQuery.name),
    required: false,
  })
  @ApiQuery({
    name: 'status',
    schema: zodToOpenAPI(ListCampaignsQuery.status),
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    schema: zodToOpenAPI(ListCampaignsQuery.offset),
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    schema: zodToOpenAPI(ListCampaignsQuery.limit),
    required: false,
  })
  @ApiResponse({
    schema: zodToOpenAPI(PaginationResponseSchema.and(z.object({ values: z.array(CampaignSchema) }))),
    status: 200,
  })
  @ApiResponse({
    description: 'Validation failed.',
    schema: zodToOpenAPI(BadRequestErrorSchema),
    status: 400,
  })
  @ApiResponse({
    description: 'Internal Server Error.',
    status: 500,
  })
  @UseZodGuard('query', ListCampaignsQuerySchema)
  listCampaigns(@Query() query: ListCampaignsQueryInput) {
    return this.campaignService.listCampaignsPaginated(query)
  }

  @Get('/:campaignId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get a campaign by ID',
    description: 'Returns the details of a specific campaign using its unique ID.',
  })
  @ApiParam({
    name: 'campaignId',
    schema: zodToOpenAPI(GetCampaignParams.campaignId),
  })
  @ApiResponse({
    schema: zodToOpenAPI(CampaignSchema),
    status: 200,
  })
  @ApiResponse({
    description: 'Validation failed.',
    schema: zodToOpenAPI(BadRequestErrorSchema),
    status: 400,
  })
  @ApiResponse({
    description: 'Campaign {{campaignId}} not found.',
    schema: zodToOpenAPI(NotFoundRequestErrorSchema),
    status: 404,
  })
  @ApiResponse({
    description: 'Internal Server Error.',
    schema: zodToOpenAPI(InternalServerErrorSchema),
    status: 500,
  })
  @UseZodGuard('params', GetCampaignParamsSchema)
  getCampaign(@Param() params: GetCampaignParamsInput) {
    return this.campaignService.getCampaign(params.campaignId)
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new campaign',
    description: 'Creates a new campaign with the provided data.',
  })
  @ApiBody({
    schema: zodToOpenAPI(CreateCampaignBodySchema),
  })
  @ApiResponse({
    schema: zodToOpenAPI(CampaignSchema),
    status: 200,
  })
  @ApiResponse({
    description: 'Validation failed.',
    schema: zodToOpenAPI(BadRequestErrorSchema),
    status: 400,
  })
  @ApiResponse({
    description: 'Internal Server Error.',
    schema: zodToOpenAPI(InternalServerErrorSchema),
    status: 500,
  })
  @UseZodGuard('body', CreateCampaignBodySchema)
  createCampaign(@Body() body: CreateCampaignBodyInput) {
    return this.campaignService.createCampaign(body)
  }

  @Patch('/:campaignId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update a campaign',
    description: 'Updates the data of an existing campaign identified by its ID.',
  })
  @ApiParam({
    name: 'campaignId',
    schema: zodToOpenAPI(UpdateCampaignParams.campaignId),
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateCampaignBodySchema),
  })
  @ApiResponse({
    schema: zodToOpenAPI(CampaignSchema),
    status: 200,
  })
  @ApiResponse({
    description: 'Validation failed.',
    schema: zodToOpenAPI(BadRequestErrorSchema),
    status: 400,
  })
  @ApiResponse({
    description: 'Campaign {{campaignId}} not found.',
    schema: zodToOpenAPI(NotFoundRequestErrorSchema),
    status: 404,
  })
  @ApiResponse({
    description: 'Internal Server Error.',
    schema: zodToOpenAPI(InternalServerErrorSchema),
    status: 500,
  })
  @UseZodGuard('params', UpdateCampaignParamsSchema)
  @UseZodGuard('body', UpdateCampaignBodySchema)
  updateCampaign(@Param() params: UpdateCampaignParamsInput, @Body() body: UpdateCampaignBodyInput) {
    return this.campaignService.updateCampaign(params.campaignId, body)
  }

  @Patch('/:campaignId/active')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Activate a campaign',
    description: 'Marks a campaign as active, allowing it to be used or viewed publicly.',
  })
  @ApiParam({
    name: 'campaignId',
    schema: zodToOpenAPI(ActiveCampaignParams.campaignId),
  })
  @ApiResponse({
    schema: zodToOpenAPI(CampaignSchema),
    status: 200,
  })
  @ApiResponse({
    description: 'Validation failed.',
    schema: zodToOpenAPI(BadRequestErrorSchema),
    status: 400,
  })
  @ApiResponse({
    description: 'Campaign {{campaignId}} not found.',
    schema: zodToOpenAPI(NotFoundRequestErrorSchema),
    status: 404,
  })
  @ApiResponse({
    description: 'Cannot activate an expired campaign.',
    status: 409,
  })
  @ApiResponse({
    description: 'Internal Server Error.',
    schema: zodToOpenAPI(InternalServerErrorSchema),
    status: 500,
  })
  @UseZodGuard('params', ActiveCampaignParamsSchema)
  activeCampaign(@Param() params: ActiveCampaignParamsInput) {
    return this.campaignService.activeCampaign(params.campaignId)
  }

  @Patch('/:campaignId/close')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Close a campaign',
    description: 'Closes a campaign, preventing further interactions or modifications.',
  })
  @ApiParam({
    name: 'campaignId',
    schema: zodToOpenAPI(CloseCampaignParams.campaignId),
  })
  @ApiResponse({
    schema: zodToOpenAPI(CampaignSchema),
    status: 200,
  })
  @ApiResponse({
    description: 'Validation failed.',
    schema: zodToOpenAPI(BadRequestErrorSchema),
    status: 400,
  })
  @ApiResponse({
    description: 'Campaign {{campaignId}} not found.',
    schema: zodToOpenAPI(NotFoundRequestErrorSchema),
    status: 404,
  })
  @ApiResponse({
    description: 'Cannot close an expired campaign.',
    status: 409,
  })
  @ApiResponse({
    description: 'Internal Server Error.',
    schema: zodToOpenAPI(InternalServerErrorSchema),
    status: 500,
  })
  @UseZodGuard('params', CloseCampaignParamsSchema)
  closeCampaign(@Param() params: CloseCampaignParamsInput) {
    return this.campaignService.closeCampaign(params.campaignId)
  }

  @Delete('/:campaignId')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a campaign',
    description: 'Deletes a campaign by their ID.',
  })
  @ApiParam({
    name: 'campaignId',
    schema: zodToOpenAPI(DeleteCampaignParams.campaignId),
  })
  @ApiResponse({
    description: 'Campaign has been successfully deleted.',
    status: 204,
  })
  @ApiResponse({
    description: 'Validation failed.',
    schema: zodToOpenAPI(BadRequestErrorSchema),
    status: 400,
  })
  @ApiResponse({
    description: 'Campaign {{campaignId}} not found.',
    schema: zodToOpenAPI(NotFoundRequestErrorSchema),
    status: 404,
  })
  @ApiResponse({
    description: 'Internal Server Error.',
    schema: zodToOpenAPI(InternalServerErrorSchema),
    status: 500,
  })
  @UseZodGuard('params', DeleteCampaignParamsSchema)
  async deleteCampaign(@Param() params: DeleteCampaignParamsInput) {
    await this.campaignService.deleteCampaign(params.campaignId)
  }
}
