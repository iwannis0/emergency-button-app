import {ICoding} from '../../../../../common/interfaces/ICoding';
import {ICodeableConcept} from '../../../../../common/interfaces/ICodeableConcept';

export interface IResolvedProblems {
  code?: {
    otherCode?: ICoding[];
    icD10Code?: ICoding[];
    absentOrUnknownProblem?: ICoding[];
    coding?: ICoding[];
  };
  onset?: {
    dateTime?: Date;
  };
  abatement?: {
    dateTime?: Date;
  };
  severity?: ICodeableConcept;
}
