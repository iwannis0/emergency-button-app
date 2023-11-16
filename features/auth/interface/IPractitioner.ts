import {IAddress} from '../../../common/interfaces/IAddress';
import {ITelecom} from '../../../common/interfaces/ITelecom';

export interface IPractitioner {
  name: {
    test: string;
  };
  telecom?: ITelecom[];
  address?: IAddress[];
}
