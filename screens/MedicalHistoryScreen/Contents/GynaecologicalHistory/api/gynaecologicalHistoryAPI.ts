import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';
import axios from 'axios/index';
import {getToken} from '../../../../../common/features/tokenContext';
import {IGynaecologicalHistory} from '../interface/IGynaecologicalHistory';

export const getPregnancyOutcome = async (
  param: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IGynaecologicalHistory>> => {
  const response = await axios.get<IBackendResponse<IGynaecologicalHistory>>(
    `https://dev-api.ehealth4u.eu/api/Observation/PregnancyDetails/GetPregnancyDetailsForPatient`,
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

  console.log('response.data', response.data.data);

  return response.data;
};

export const getPregnancyHistory = async (
  param: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IGynaecologicalHistory>> => {
  const response = await axios.get<IBackendResponse<IGynaecologicalHistory>>(
    `https://dev-api.ehealth4u.eu/api/Observation/PregnancyDetails/GetPregnancyDetailsForPatient`,
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

  console.log('response.data', response.data.data);

  return response.data;
};
