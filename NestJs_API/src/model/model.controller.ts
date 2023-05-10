// Authors: Marloes, Roward
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 08-05-2023

import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDTO } from './dto/create-model.dto';
import { ModelDTO } from './dto/model.dto';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post('/create')
  createModel(@Body() model: CreateModelDTO, @Req() req) {
    this.modelService.createModel(model, req.user.userId);
  }

  @Get('/models')
  getAllModels(@Req() req): Promise<ModelDTO[]> {
    return this.modelService.getAllModels(req.user.userId);
  }

  @Delete()
  async deleteModel(
    @Req() req,
    @Query('modelId') modelId,
  ): Promise<ModelDTO[]> {
    await this.modelService.deleteModel(req.user.userId, modelId);
    return await this.modelService.getAllModels(req.user.userId);
  }
}
