import {ICoding} from '../../../../../common/interfaces/ICoding';
import {IIdentifier} from '../../../../../common/interfaces/IIdentifier';
import {IRefPerformer} from '../../../../../common/interfaces/IRefPerformer';
import {IEffectivePeriod} from '../../../../../common/interfaces/IEffectivePeriod';

export interface IDrugUseStatus {
  system?: string;
  code?: string;
  display?: string;
}

export interface IDrugUseType {
  system?: string;
  code: string;
  display?: string;
}

export interface IDrugUse {
  value: string;
  drugUseStatus: ICoding;
  drugOrMedicationType: ICoding;
  dailyDosage: string;
  routeOfAdministration: ICoding;
  effectivePeriod: IEffectivePeriod;
  effectiveDateTime: Date;
  refSubjectCyPatient: string;
  refSubjectDevice: string;
  refSubjectLocation: string;
  refSubjectGroup: string;
  id: string;
  identifier: IIdentifier[];
  status: string;
  category: string[];
  issued: null;
  refPerformer: IRefPerformer;
  type?: string;
}
