import {ICoding} from '../../../../../common/interfaces/ICoding';

export interface IGynaecologicalHistory {
  expectedDeliveries?: ExpectedDeliveryDto[];
  pregnancyStatus?: IPregnancyStatus[];
  pregnancyOutcome?: IPregnancyOutcome[];
}

export interface IPregnancyStatus {
  examinationDate?: Date;
  value?: ICoding;
  expectedDeliveryData?: {
    examinationDate?: Date;
    code: ICoding;
  }[];
}

export interface ExpectedDeliveryDto {
  code: ICoding;
  examinationDate?: Date;
  dateOfDelivery?: Date;
}

export interface IPregnancyOutcome {
  code: ICoding;
  examinationDate: Date;
  effective?: Date;
  value?: number;
}
