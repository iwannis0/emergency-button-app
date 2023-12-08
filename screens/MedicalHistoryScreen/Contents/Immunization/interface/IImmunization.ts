import {ICoding} from '../../../../../common/interfaces/ICoding';

export interface IImmunizationFlatten {
  id?: string;
  vaccineCode?: ICoding;
  diseaseOrAgentTargeted?: ICoding;
  numberInSeries?: number;
  dateOfVaccination: Date;
  vaccineMedicinalProduct?: string;
  vaccineMarketingAuthorizationHolder?: string;
  vaccineBatchNumber?: string;
  vaccineAdministeringCentre?: string;
  vaccineCountryOfVaccination?: string;
}
