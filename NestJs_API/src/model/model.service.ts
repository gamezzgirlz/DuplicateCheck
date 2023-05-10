// Authors: Marloes
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 08-05-2023

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelDTO } from './dto/model.dto';
import { ModelData } from './model.data';
import { CreateModelDTO } from './dto/create-model.dto';
import { AuthDAO } from 'src/auth/auth.dao';
import { PythonDAO } from '../python/python.dao';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelDAO: ModelData,
    private readonly pythonDAO: PythonDAO,
    private readonly authDAO: AuthDAO,
  ) {}

  async getAllModels(userId: string): Promise<ModelDTO[]> {
    return this.modelDAO.getAllModels(userId);
  }

  async createModel(createModel: CreateModelDTO, userId: string): void {
    const modelId: string = uuid();
    const model = new ModelDTO(
      createModel.modelName,
      modelId,
      createModel.tableName,
      createModel.modelDescription,
      userId,
    );

    await this.modelDAO.createModel(model);
    await this.pythonDAO.createModel(modelId);
  }

  async deleteModel(userId: string, modelId: string): Promise<void> {
    await this.modelDAO.deleteModel(modelId, userId);
    await this.pythonDAO.deleteModel(modelId);
  }
}
