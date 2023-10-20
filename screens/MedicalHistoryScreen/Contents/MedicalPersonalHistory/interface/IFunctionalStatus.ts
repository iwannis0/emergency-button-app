import {ICodeableConcept} from '../../../../../common/interfaces/ICodeableConcept';

export interface IFunctionalStatus {
  value: ICodeableConcept;
  effectiveDateTime: Date;
}
