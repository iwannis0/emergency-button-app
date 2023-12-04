import {ICoding} from '../../../../../common/interfaces/ICoding';
import {ICodeableConcept} from '../../../../../common/interfaces/ICodeableConcept';
import {ICode} from '../../../../../common/interfaces/ICode';

export interface IAllergyType {
  // Main data field
  category?: string[];
  typeExtensionExtraCode?: ICodeableConcept;
  code?: IAllergyIntoleranceCode;
  clinicalStatus?: ICodeableConcept;
  criticality?: ICode;

  // Other data for modal
  description?: string;
  onset?: IAllergyIntoleranceOnset;
  lastOccurrence?: Date;
  endDate?: Date;
  reaction?: IAllergyReaction[];
  abatementDatetime?: Date;
  note?: {text: string}[];
}

export interface IAllergyIntoleranceCode {
  allergyIntoleranceDrugs?: ICoding;
  allergyIntoleranceNoDrugs?: ICoding;
  absentOrUnknownAllergyIntolerance?: ICoding;
  otherCode?: ICoding[];
}

export interface IAllergyIntoleranceOnset {
  onsetDateTime?: Date;
}

export interface IAllergyReaction {
  description?: string;
  allergyIntoleranceReactionManifestationGPSCode?: ICoding;
  otherAllergyIntoleranceReactionManifestation?: ICoding[];
  severity?: ICoding;
  severityExtensionExtraCode?: ICodeableConcept;
  exposureRoute?: ICoding;
  onsetDateTime?: Date | string;
}
