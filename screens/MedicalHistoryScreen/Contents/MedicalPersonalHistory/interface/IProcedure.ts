import {ICoding} from '../../../../../common/interfaces/ICoding';

export interface IProcedure {
  performed: {
    dateTime: Date;
  };
  code: {
    procedureDescription?: ICoding;
    absentOrUnknownProcedure?: ICoding;
    otherCode?: ICoding[];
  };
  bodySite: ICoding[];
}
