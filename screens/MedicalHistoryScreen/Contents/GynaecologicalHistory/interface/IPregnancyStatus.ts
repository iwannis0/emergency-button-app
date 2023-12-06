import {ICoding} from '../../../../../common/interfaces/ICoding';

export interface IPregnancyStatus {
  examinationDate?: Date;
  value?: ICoding;
  expectedDeliveryData?: {
    code?: ICoding;
    examinationDate?: Date;
    dateOfDelivery: Date;
  }[];
}
