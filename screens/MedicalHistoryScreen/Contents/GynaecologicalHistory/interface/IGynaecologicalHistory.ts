import {IPregnancyStatus} from './IPregnancyStatus';
import {ExpectedDeliveryDto} from './ExpectedDeliveryDto';
import {IPregnancyOutcome} from './IPregnancyOutcome';

export interface IGynaecologicalHistory {
  expectedDeliveries?: ExpectedDeliveryDto[];
  pregnancyStatus?: IPregnancyStatus[];
  pregnancyOutcome?: IPregnancyOutcome[];
}
