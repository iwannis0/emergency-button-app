import {ICoding} from '../../../../../common/interfaces/ICoding';
import {IResourceReference} from '../../../../../common/interfaces/IResourceReference';

export interface IGynaecologicalHistory {
  expectedDeliveries?: ExpectedDeliveryDto[];
  pregnancyStatus?: IPregnancyStatus[];
  pregnancyOutcome?: IPregnancyOutcome[];
}

export interface IPregnancyStatus {
  examinationDate?: Date;
  value?: ICoding;
  expectedDeliveryReference?: IResourceReference[];
  expectedDeliveryData?: {
    examinationDate?: Date;
    code: ICoding;
  }[];
}

export interface IPregnancyStatusMain {
  code?: ICoding;
  value?: ICoding;
  effective?: Date;
  hasMember?: IResourceReference[];
  refSubjectCyPatient?: string;
  refSubjectDevice?: string;
  refSubjectLocation?: string;
  refSubjectGroup?: string;
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
