import {ICoding} from '../../../../../common/interfaces/ICoding';
import {ICodeableConcept} from '../../../../../common/interfaces/ICodeableConcept';

export interface ICurrentProblems {
  code?: {
    otherCode?: ICoding[];
    icD10Code?: ICoding[];
    absentOrUnknownProblem?: ICoding[];
    coding?: ICoding[];
  };
  onset?: {
    start?: Date;
  };
  severity?: ICodeableConcept;
}
