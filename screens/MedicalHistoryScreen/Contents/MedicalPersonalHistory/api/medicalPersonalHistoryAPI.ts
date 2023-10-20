import axios from 'axios';
import {IAllergyType} from '../interface/IAllergiesAndIntolerances';
import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';
import {getToken} from '../../../../../common/features/tokenContext';
import {IInitialDeviceAndImplants} from '../interface/IDeviceAndImplants';
import {IMedicationSummary} from '../interface/IMedicationSummary';
import {IProcedure} from '../interface/IProcedure';
import {ICurrentProblems} from '../interface/ICurrentProblems';
import {IResolvedProblems} from '../interface/IResolvedProblems';
import {IFunctionalStatus} from '../interface/IFunctionalStatus';

export const getAllergyIntolerance = async (
  param: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IAllergyType[]>> => {
  const response = await axios.get<IBackendResponse<IAllergyType[]>>(
    `https://dev-api.ehealth4u.eu/api/AllergyIntolerance/GetAllergyIntolerancesByPatientId`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        patientId: param,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    },
  );

  return response.data;
};

export const getDevices = async (
  param: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IInitialDeviceAndImplants[]>> => {
  const response = await axios.get<
    IBackendResponse<IInitialDeviceAndImplants[]>
  >(`https://dev-api.ehealth4u.eu/api/Device/GetDevicesForPatient`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: {
      patientId: param,
      pageSize: pageSize,
      pageNumber: pageNumber,
    },
  });

  return response.data;
};

export const getMedicationSummary = async (
  param: string,
  pageSize: number = 100,
  pageNumber: number = 1,
): Promise<IBackendResponse<IMedicationSummary[]>> => {
  const response = await axios.get<IBackendResponse<IMedicationSummary[]>>(
    `https://dev-api.ehealth4u.eu/api/MedicationStatementSummary/GetMedicationStatementSummaryForPatient`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        patientId: param,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    },
  );

  return response.data;
};

export const getCurrentProblems = async (
  param: string,
  pageSize: number = 100,
  pageNumber: number = 1,
): Promise<IBackendResponse<ICurrentProblems[]>> => {
  const response = await axios.get<IBackendResponse<ICurrentProblems[]>>(
    `https://dev-api.ehealth4u.eu/api/ConditionDiagnosis/GetCurrentConditionProblemsByPatientId`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        patientId: param,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    },
  );

  return response.data;
};

export const getResolvedProblems = async (
  param: string,
  pageSize: number = 100,
  pageNumber: number = 1,
): Promise<IBackendResponse<IResolvedProblems[]>> => {
  const response = await axios.get<IBackendResponse<IResolvedProblems[]>>(
    `https://dev-api.ehealth4u.eu/api/Condition/GetResolvedConditionProblemsByPatientId`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        patientId: param,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    },
  );

  return response.data;
};

export const getProcedures = async (
  param: string,
  pageSize: number = 100,
  pageNumber: number = 1,
): Promise<IBackendResponse<IProcedure[]>> => {
  const response = await axios.get<IBackendResponse<IProcedure[]>>(
    `https://dev-api.ehealth4u.eu/api/Procedure/GetProceduresByPatientId`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        patientId: param,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    },
  );

  return response.data;
};

export const getFunctionalStatus = async (
  param: string,
  pageSize: number = 100,
  pageNumber: number = 1,
): Promise<IBackendResponse<IFunctionalStatus[]>> => {
  const response = await axios.post<IBackendResponse<IFunctionalStatus[]>>(
    `https://dev-api.ehealth4u.eu/api/Observation/FunctionalStatus/GetFunctionalStatus`,
    {
      searchObservationParamsDto: {
        refPatient: 249867,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    },
  );

  return response.data;
};
