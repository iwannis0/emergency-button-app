import {IIdentifier} from '../../../../../common/interfaces/IIdentifier';
import {IEffectivePeriod} from '../../../../../common/interfaces/IEffectivePeriod';
import {IRefPerformer} from '../../../../../common/interfaces/IRefPerformer';

export interface ISleepHabits {
  id: string;
  identifier: IIdentifier[];
  status: string;
  category: string[];
  issued: Date;
  refPerformer: IRefPerformer;
  refSubjectCyPatient: string;
  refSubjectDevice: string;
  refSubjectLocation: string;
  refSubjectGroup: string;
  value: string;
  effectivePeriod: IEffectivePeriod;
  relatedToSleep: IRelatedToSleep;
  description: string;
  type?: string;
}

export interface IRelatedToSleep {
  code: string;
  display: string;
  system?: string;
}
