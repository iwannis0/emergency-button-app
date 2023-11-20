import axios from 'axios';
import {ITravelHistoryType} from '../interface/ITravelHistoryType';
import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';
import {BACKEND_API_URL} from '@env';

export const getTravelHistory = async (
  token: string,
  patientId: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<ITravelHistoryType[]>> => {
  const response = await axios.post<IBackendResponse<ITravelHistoryType[]>>(
    `${BACKEND_API_URL}/Observation/TravelHistory/GetTravelHistory`,
    {
      searchObservationParamsDto: {
        refPatient: patientId,
      },
      effectivePeriod: {
        isSortSelected: true,
        isSortAscending: false,
        sortIndex: 1,
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
