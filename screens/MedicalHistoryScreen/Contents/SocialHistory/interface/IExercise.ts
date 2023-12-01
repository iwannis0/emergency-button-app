import {IIdentifier} from '../../../../../common/interfaces/IIdentifier';
import {IRefPerformer} from '../../../../../common/interfaces/IRefPerformer';
import {IEffectivePeriod} from '../../../../../common/interfaces/IEffectivePeriod';
import {ISimpleQuantity} from '../../../../../common/interfaces/ISimpleQuantity';

export interface IExercise {
  id: string;
  identifier: IIdentifier[];
  status: string;
  category: string[];
  issued: Date;
  refPerformer: IRefPerformer;
  refSubjectCyPatient: string;
  refSubjectDevice: string;
  refSubjectLocation: string;
  refSubjectGroup: string;
  activityCode: string;
  frequencyValue: string;
  durationValue: string;
  intensityLoincValue: string;
  intensityNullFravorValue: string;
  effectivePeriod: IEffectivePeriod;
  exerciseActivity: IExerciseActivity;
  exerciseDuration: Partial<ISimpleQuantity>;
  exerciseIntensity: Partial<IExerciseIntensity>;
  frequencyPerWeek: Partial<ISimpleQuantity>;
  type?: string;
}

export interface IExerciseActivity {
  code?: string;
  display?: string;
  system?: string;
}

interface IExerciseIntensity {
  system: string;
  code: string;
  display: string;
}
