import {ICoding} from '../../../../../common/interfaces/ICoding';

export interface IMedicationSummary {
  effective: {
    dateTime: Date;
  };
  status: string;
  dosage: {
    routeEDQM: ICoding[];
  };
  medication: {
    code: {
      atcCode: ICoding[];
      absentOrUnknownMedication: ICoding[];
      otherCode: ICoding[];
    };
    extension: {
      marketingAuthorizationHolder: string;
      medicationProduct: {
        productName: string;
        strength: string;
      };
    }[];
  };
}
