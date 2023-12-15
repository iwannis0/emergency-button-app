import {IEntry} from '../../../../screens/ShlScreen/interfaces/IPatientSummary';
import {ISummaryResources} from '../../interfaces/ISummaryResources';

export class SummaryResources implements ISummaryResources {
  ready: boolean;
  resources: IEntry[];

  constructor(ready: boolean, resources: IEntry[]) {
    this.ready = ready;
    this.resources = resources;
  }
}
