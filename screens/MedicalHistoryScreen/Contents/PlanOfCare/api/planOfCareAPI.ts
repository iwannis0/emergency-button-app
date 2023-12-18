import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';
import axios from 'axios';
import {BACKEND_API_URL} from '@env';
import {IPlanOfCare} from '../interface/IPlanOfCare';

export const getPlanOfCare = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IPlanOfCare[]>> => {
  const response = await axios.get<IBackendResponse<IPlanOfCare[]>>(
    `${BACKEND_API_URL}/CarePlan/GetCarePlansByPatientId`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        patientId: patientId,
      },
    },
  );
  return response.data;
};
