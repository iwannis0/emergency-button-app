import {ICoding} from '../../../../../common/interfaces/ICoding';

export interface ExpectedDeliveryDto {
  code: ICoding;
  examinationDate?: Date;
  dateOfDelivery?: Date;
}
