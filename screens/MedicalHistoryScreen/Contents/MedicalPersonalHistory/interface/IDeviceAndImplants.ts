import {ICoding} from '../../../../../common/interfaces/ICoding';
import {IProcedure} from './IProcedure';

export interface IDeviceAndImplants {
  device: {
    deviceName: IDevice[];
    type: {
      snomedMedicalDevice: ICoding[];
      ipsAbsentOrUnknownDevice: ICoding[];
      otherType: ICoding[];
    };
  };
  procedures: IProcedure[];
}

interface IDevice {
  name: string;
  type: string;
}
