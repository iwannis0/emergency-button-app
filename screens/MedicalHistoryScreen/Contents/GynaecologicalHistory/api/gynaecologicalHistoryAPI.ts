import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';
import axios from 'axios/index';
import {IGynaecologicalHistory} from '../interface/IGynaecologicalHistory';
import {BACKEND_API_URL} from '@env';

export const getPregnancyOutcome = async (
  token: string,
  patientId: string,
): Promise<IBackendResponse<IGynaecologicalHistory>> => {
  const response = await axios.get<IBackendResponse<IGynaecologicalHistory>>(
    `${BACKEND_API_URL}/Observation/PregnancyDetails/GetPregnancyDetailsForPatient`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: patientId,
      },
    },
  );

  return response.data;
};

export const getPregnancyHistory = async (
  token: string,
  patientId: string,
): Promise<IBackendResponse<IGynaecologicalHistory>> => {
  const response = await axios.get<IBackendResponse<IGynaecologicalHistory>>(
    `${BACKEND_API_URL}/Observation/PregnancyDetails/GetPregnancyDetailsForPatient`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: patientId,
      },
    },
  );

  return response.data;
};
