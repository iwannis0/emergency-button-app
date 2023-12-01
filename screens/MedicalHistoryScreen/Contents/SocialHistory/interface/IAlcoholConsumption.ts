import {ICoding} from '../../../../../common/interfaces/ICoding';
import {IEffectivePeriod} from '../../../../../common/interfaces/IEffectivePeriod';
import {IIdentifier} from '../../../../../common/interfaces/IIdentifier';
import {ISimpleQuantity} from '../../../../../common/interfaces/ISimpleQuantity';
import {IRefPerformer} from '../../../../../common/interfaces/IRefPerformer';

export interface IAlcoholConsumption {
  id: string;
  alcoholIntake: ISimpleQuantity;
  alcoholType: ICoding;
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
  snomeD_Value: string;
  effectivePeriod: IEffectivePeriod;
  effectiveDateTime: Date;
  alcoholStatus: ICoding;
  type?: string;
}
