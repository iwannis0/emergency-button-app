import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';
import axios from 'axios/index';
import {IGynaecologicalHistory} from '../interface/IGynaecologicalHistory';
import {BACKEND_API_URL} from '@env';

export const getPregnancyOutcome = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IGynaecologicalHistory>> => {
  const response = await axios.get<IBackendResponse<IGynaecologicalHistory>>(
    `${BACKEND_API_URL}/Observation/PregnancyDetails/GetPregnancyDetailsForPatient`,
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

export const getPregnancyHistory = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IGynaecologicalHistory>> => {
  const response = await axios.get<IBackendResponse<IGynaecologicalHistory>>(
    `${BACKEND_API_URL}/Observation/PregnancyDetails/GetPregnancyDetailsForPatient`,
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
