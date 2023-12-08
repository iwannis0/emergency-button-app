import {IImmunizationFlatten} from '../interface/IImmunization';
import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';
import axios from 'axios';
import {BACKEND_API_URL} from '@env';

export const getImmunization = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IImmunizationFlatten[]>> => {
  const response = await axios.get<IBackendResponse<IImmunizationFlatten[]>>(
    `${BACKEND_API_URL}/Immunization/GetImmunizationForPatient`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: patientId,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    },
  );

  return response.data;
};
