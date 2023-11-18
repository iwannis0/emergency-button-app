import {ICoding} from '../../../../../common/interfaces/ICoding';

export interface IPregnancyOutcome {
  code: ICoding;
  examinationDate: Date;
  effective?: Date;
  value?: number;
}
