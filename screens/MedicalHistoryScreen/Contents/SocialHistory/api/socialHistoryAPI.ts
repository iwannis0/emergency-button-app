import axios from 'axios';
import {IAlcoholConsumption} from '../interface/IAlcoholConsumption';
import {ITobaccoUse} from '../interface/ITobaccoUse';
import {IDrugUse} from '../interface/IDrugUse';
import {ISleepHabits} from '../interface/ISleepHabits';
import {IExercise} from '../interface/IExercise';
import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';
import {BACKEND_API_URL} from '@env';

export const getAlcoholConsumption = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IAlcoholConsumption[]>> => {
  const response = await axios.post<IBackendResponse<IAlcoholConsumption[]>>(
    `${BACKEND_API_URL}SocialHistory/AlcoholConsumption/GetAlcoholConsumptions`,
    {
      searchObservationParamsDto: {
        refPatient: patientId,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    },
  );

  response.data.data.sort((a, b) =>
    a?.effectivePeriod?.start &&
    b?.effectivePeriod?.start &&
    a?.effectivePeriod?.start < b?.effectivePeriod?.start
      ? 1
      : -1,
  );
  return response.data;
};

export const getTobaccoUse = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<ITobaccoUse[]>> => {
  const response = await axios.post<IBackendResponse<ITobaccoUse[]>>(
    `${BACKEND_API_URL}SocialHistory/TobaccoUse/GetTobaccoUses`,
    {
      searchObservationParamsDto: {
        refPatient: patientId,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    },
  );
  response.data.data.sort((a, b) =>
    a?.effectivePeriod?.start &&
    b?.effectivePeriod?.start &&
    a?.effectivePeriod?.start < b?.effectivePeriod?.start
      ? 1
      : -1,
  );
  return response.data;
};

export const getDrugUsesByPatientId = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IDrugUse[]>> => {
  const response = await axios.post<IBackendResponse<IDrugUse[]>>(
    `${BACKEND_API_URL}SocialHistory/DrugUse/GetDrugUses`,
    {
      searchObservationParamsDto: {
        refPatient: patientId,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    },
  );
  response.data.data.sort((a, b) =>
    a?.effectivePeriod?.start &&
    b?.effectivePeriod?.start &&
    a?.effectivePeriod?.start < b?.effectivePeriod?.start
      ? 1
      : -1,
  );
  return response.data;
};

export const getSleepHabits = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<ISleepHabits[]>> => {
  const response = await axios.post<IBackendResponse<ISleepHabits[]>>(
    `${BACKEND_API_URL}SocialHistory/SleepHabits/GetSleepHabits`,
    {
      searchObservationParamsDto: {
        refPatient: patientId,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    },
  );
  response.data.data.sort((a, b) =>
    a?.effectivePeriod?.start &&
    b?.effectivePeriod?.start &&
    a?.effectivePeriod?.start < b?.effectivePeriod?.start
      ? 1
      : -1,
  );
  return response.data;
};

export const getExerciseByPatientId = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IExercise[]>> => {
  const response = await axios.post<IBackendResponse<IExercise[]>>(
    `${BACKEND_API_URL}SocialHistory/Exercise/GetExercises`,
    {
      searchObservationParamsDto: {
        refPatient: patientId,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    },
  );
  response.data.data.sort((a, b) =>
    a?.effectivePeriod?.start &&
    b?.effectivePeriod?.start &&
    a?.effectivePeriod?.start < b?.effectivePeriod?.start
      ? 1
      : -1,
  );
  return response.data;
};
