import {IEffectivePeriod} from '../../../../../common/interfaces/IEffectivePeriod';
import {IIdentifier} from '../../../../../common/interfaces/IIdentifier';
import {IPerformer} from '../../../../../common/interfaces/IImunization';

export interface ITobaccoUse {
  id?: string;
  identifier?: IIdentifier;
  status?: string;
  category?: string[];
  issued?: Date;
  refPerformer?: IPerformer;
  refSubjectCyPatient?: string;
  refSubjectDevice?: string;
  refSubjectLocation?: string;
  refSubjectGroup?: string;
  value?: 0;
  tobaccoStatus?: ITobaccoStatus;
  tobaccoType?: ITobaccoType;
  packYearsValue?: 0;
  effectivePeriod?: IEffectivePeriod;
  type?: string;
}

interface ITobaccoType {
  system?: string;
  code: string;
  display?: string;
}

export interface ITobaccoStatus {
  system?: string;
  code: string;
  display?: string;
}
