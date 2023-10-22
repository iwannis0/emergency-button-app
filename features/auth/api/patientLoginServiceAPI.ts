import axios from 'axios';
import {IBackendResponse} from '../../../common/interfaces/IBackedResponse';
import {IPatient} from '../interface/IPatient';

export const getPatientProfile = async (
  token: string,
  patientId?: string,
): Promise<IBackendResponse<IPatient>> => {
  const response = await axios.get<IBackendResponse<IPatient>>(
    'https://dev-api.ehealth4u.eu/api/Patient/Get',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: patientId,
      },
    },
  );

  return response.data;
};
