import axios from 'axios';
import {IAllergyType} from '../interface/IAllergiesAndIntolerances';
import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';
import {IInitialDeviceAndImplants} from '../interface/IDeviceAndImplants';
import {IMedicationSummary} from '../interface/IMedicationSummary';
import {IProcedure} from '../interface/IProcedure';
import {ICurrentProblems} from '../interface/ICurrentProblems';
import {IResolvedProblems} from '../interface/IResolvedProblems';
import {IFunctionalStatus} from '../interface/IFunctionalStatus';
import {BACKEND_API_URL} from '@env';

export const getAllergyIntolerance = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IAllergyType[]>> => {
  const response = await axios.get<IBackendResponse<IAllergyType[]>>(
    `${BACKEND_API_URL}/AllergyIntolerance/GetAllergyIntolerancesByPatientId`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: patientId,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    },
  );

  return response.data;
};

export const getDevices = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IInitialDeviceAndImplants[]>> => {
  const response = await axios.get<
    IBackendResponse<IInitialDeviceAndImplants[]>
  >(`${BACKEND_API_URL}/Device/GetDevicesForPatient`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      patientId: patientId,
      pageSize: pageSize,
      pageNumber: pageNumber,
    },
  });

  return response.data;
};

export const getMedicationSummary = async (
  token: string,
  patientId: string,
  pageSize: number = 100,
  pageNumber: number = 1,
): Promise<IBackendResponse<IMedicationSummary[]>> => {
  const response = await axios.get<IBackendResponse<IMedicationSummary[]>>(
    `${BACKEND_API_URL}/MedicationStatementSummary/GetMedicationStatementSummaryForPatient`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: patientId,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    },
  );

  return response.data;
};

export const getCurrentProblems = async (
  token: string,
  patientId: string,
  pageSize: number = 100,
  pageNumber: number = 1,
): Promise<IBackendResponse<ICurrentProblems[]>> => {
  const response = await axios.get<IBackendResponse<ICurrentProblems[]>>(
    `${BACKEND_API_URL}/ConditionDiagnosis/GetCurrentConditionProblemsByPatientId`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: patientId,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    },
  );

  return response.data;
};

export const getResolvedProblems = async (
  token: string,
  patientId: string,
  pageSize: number = 100,
  pageNumber: number = 1,
): Promise<IBackendResponse<IResolvedProblems[]>> => {
  const response = await axios.get<IBackendResponse<IResolvedProblems[]>>(
    `${BACKEND_API_URL}/Condition/GetResolvedConditionProblemsByPatientId`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: patientId,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    },
  );

  return response.data;
};

export const getProcedures = async (
  token: string,
  patientId: string,
  pageSize: number = 100,
  pageNumber: number = 1,
): Promise<IBackendResponse<IProcedure[]>> => {
  const response = await axios.get<IBackendResponse<IProcedure[]>>(
    `${BACKEND_API_URL}/Procedure/GetProceduresByPatientId`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: patientId,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    },
  );

  return response.data;
};

export const getFunctionalStatus = async (
  token: string,
  refPatient: string,
  pageSize: number = 100,
  pageNumber: number = 1,
): Promise<IBackendResponse<IFunctionalStatus[]>> => {
  const response = await axios.post<IBackendResponse<IFunctionalStatus[]>>(
    `${BACKEND_API_URL}/Observation/FunctionalStatus/GetFunctionalStatus`,
    {
      searchObservationParamsDto: {
        refPatient: refPatient,
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

  return response.data;
};
