import {ICoding} from '../../../../../common/interfaces/ICoding';
import {IIdentifier} from '../../../../../common/interfaces/IIdentifier';
import {IPeriodTimeZone} from '../../../../../common/interfaces/IPeriodTimeZone';
import {IRefPerformer} from '../../../../../common/interfaces/IRefPerformer';

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
  effectivePeriod: IPeriodTimeZone;
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
