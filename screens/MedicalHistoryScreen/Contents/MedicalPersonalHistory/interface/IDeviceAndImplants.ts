import {ICoding} from '../../../../../common/interfaces/ICoding';
import {IProcedure} from './IProcedure';

export interface IInitialDeviceAndImplants {
  device?: IDeviceAndImplants;
  // Procedure is an array. 1st procedure is when the device was added, 2nd procedure is when the device was removed
  procedures?: IProcedure[];
}

export interface IDeviceAndImplants {
  type: {
    snomedMedicalDevice: ICoding[];
    ipsAbsentOrUnknownDevice: ICoding[];
  };
}
