import {ICoding} from '../../../../../common/interfaces/ICoding';

export interface IMedicationSummary {
  effective: {
    effective: Date;
  };
  status: string;
  dosage: {
    text: string;
    routeEDQM: ICoding[];
    doseAndRate: IDosage[];
    timing: {
      repeat: {
        duration: number;
        durationUnit: string;
        frequency: number;
        period: number;
        periodUnit: string;
      };
    };
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

interface IDosage {
  doseQuantity: {
    decimalValue: number;
    unit: string;
  };
}
