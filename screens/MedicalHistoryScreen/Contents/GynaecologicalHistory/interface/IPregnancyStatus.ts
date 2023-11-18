import {ICoding} from '../../../../../common/interfaces/ICoding';

export interface IPregnancyStatus {
  examinationDate?: Date;
  value?: ICoding;
  expectedDeliveryData?: {
    examinationDate?: Date;
    code: ICoding;
  }[];
}
