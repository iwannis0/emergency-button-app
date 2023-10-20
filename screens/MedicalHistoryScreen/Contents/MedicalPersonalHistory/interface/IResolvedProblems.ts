import {ICoding} from '../../../../../common/interfaces/ICoding';
import {ICodeableConcept} from '../../../../../common/interfaces/ICodeableConcept';

export interface IResolvedProblems {
  code?: {
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
