import {atom} from 'recoil';
import {ISummaryResources} from '../../interfaces/ISummaryResources';
import {SummaryResources} from './SummaryResources';

export const summaryResourcesState = atom<ISummaryResources>({
  key: 'summaryResourcesState',
  default: new SummaryResources(false, []),
});
