import {IAddress} from '../../../common/interfaces/IAddress';
import {ITelecom} from '../../../common/interfaces/ITelecom';
import {Iinsurance} from '../../../common/interfaces/Iinsurance';

export interface IPatient {
  // IDENTIFICATION
  id: string;
  nationalIdentity?: {
    documentNumber?: string;
  };

  //INSURANCE INFORMATION
  insurance?: Iinsurance[];

  //PERSONAL INFORMATION
  name?: {
    givenName: string[];
    familyName: string;
  };
  birthDate: Date;
  gender: string;

  // PERSONAL CONTACT INFORMATION
  address?: IAddress[];
  telecom?: ITelecom[];

  //EMERGENCY CONTACT INFORMATION
  nextOfKinContact?: {
    relationship?: String;
    name?: {
      givenName: string[];
      familyName: string;
    };
    telecom?: ITelecom[];
    address?: IAddress[];
    refOrganization?: string;
  };
}
