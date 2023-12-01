import {IAnnotation} from './IAnnotation';
import {ICodeableConcept} from './ICodeableConcept';
import {ICoding} from './ICoding';
import {IIdentifier} from './IIdentifier';
import {IResourceReference} from './IResourceReference';

export interface IImmunization {
  id?: string;
  identifier?: IIdentifier[];
  patient?: IResourceReference;
  encounter?: IResourceReference;
  status?: string;
  statusReason?: ICodeableConcept;
  vaccineCode?: IVaccineCode;
  occurrence?: Date | string;
  recorded?: Date | string;
  primarySource?: boolean;
  reportOrigin?: ICodeableConcept;
  location?: IResourceReference;
  manufacturer?: IResourceReference;
  lotNumber?: string;
  expirationDate?: Date;
  site?: ICodeableConcept;
  route?: ImmunizationRouteDto;
  doseQuantity?: IDoseQuantity;
  performer?: IPerformer[];
  note?: IAnnotation[];
  reasonCode?: ICodeableConcept[];
  reasonReference?: IReasonReference[];
  isSubpotent?: boolean;
  subpotentReason?: ICodeableConcept[];
  education?: IEducation[];
  programEligibility?: ICodeableConcept[];
  fundingSource?: ICodeableConcept;
  reaction?: IReaction[];
  protocolApplied?: IProtocolApplied[];
  marketingAuthorizationHolder?: string;
  vaccineMedicinalProduct?: IVaccineMedicinalProduct;
}

export interface IImmunizationFlatten {
  id?: string;
  vaccineCode?: ICoding;
  diseaseOrAgentTargeted?: ICoding;
  numberInSeries?: number;
  dateOfVaccination?: Date | string;
  vaccineMedicinalProduct?: string;
  vaccineMarketingAuthorizationHolder?: string;
  vaccineBatchNumber?: string;
  vaccineAdministeringCentre?: string;
  vaccineCountryOfVaccination?: string;
  performer?: IPerformer[];
}

interface ImmunizationRouteDto {
  eHDSIRouteOfAdministration: ICoding[];
  other: ICoding[];
  text: string;
}

export interface IDoseQuantity {
  value: 0;
  unit: string;
  system: string;
  code: string;
}

export interface IPerformer {
  function?: string;
  actor: Actor;
}

export interface IReasonReference {
  refCondition: string;
  refObservation: string;
  refDiagnosticReport: string;
}

export interface IEducation {
  documentType: string;
  reference: string;
  publicationDate: Date;
  presentationDate: Date;
}

export interface IReaction {
  date: Date;
  refDetail: string;
  reported: true;
}

export interface IProtocolApplied {
  series?: string;
  refAuthority?: string;
  targetDisease?: ICodeableConcept[];
  doseNumberPositiveInt?: number;
  doseNumberString?: string;
  seriesDosesPositiveInt?: number;
  seriesDosesString?: string;
}

export interface IVaccineMedicinalProduct {
  productName?: string;
  strength?: string;
  description?: string;
  routeOfAdministration?: string[];
}

export interface IVaccineCode {
  eHDSIVaccine?: ICoding;
  absentOrUnknownImmunizationIPS?: ICoding;
  other?: ICoding[];
  text?: string;
}

export interface Actor {
  reference: string;
  display?: any;
  type?: string;
  identifier?: any;
  resource?: any;
}
