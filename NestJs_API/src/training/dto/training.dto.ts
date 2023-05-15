// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { DatasetDTO } from './dataset.dto';

export class TrainingDTO {
  constructor(
    public trainingId: string,
    public userId: string,
    public datasetA: DatasetDTO,
    public datasetB: DatasetDTO,
    public matches: boolean[],
  ) {}
}