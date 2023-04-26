// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ModelDocument = HydratedDocument<Model>;

@Schema()
export class Model {
  @Prop()
  modelName: string;

  @Prop()
  fileName: string;

  @Prop()
  tableName: string;

  @Prop()
  modelDescription: string;

  @Prop()
  userId: string;
}

export const ModelSchema = SchemaFactory.createForClass(Model);
