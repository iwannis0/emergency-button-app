import {ICoding} from '../../../../../common/interfaces/ICoding';

export interface IMedicationSummary {
  effective: {
    effective: Date;
  };
  note: IAnnotation[];
  status: string;
  dosage: {
    text: string;
    routeEDQM: ICoding[];
    doseAndRate: IDosage[];
    timing: ITiming;
  };
  medication: {
    code: {
      atcCode: ICoding[];
      absentOrUnknownMedication: ICoding[];
      otherCode: ICoding[];
    };
    form: {
      edqmCode: ICoding[];
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

interface IAnnotation {
  text: string;
}

interface ITiming {
  repeat: {
    bounds: {
      duration: {
        value: number;
        unit: string;
      };
    };
    duration: number;
    durationUnit: string;
    frequency: number;
    period: number;
    periodUnit: ICoding;
  };
}
