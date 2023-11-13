import axios from 'axios';
import {ITravelHistoryType} from '../interface/ITravelHistoryType';
import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';

export const getTravelHistory = async (
  param: string,
  pageSize: number = 10,
  pageNumber: number = 1,
  patientId: string,
  token: string,
): Promise<IBackendResponse<ITravelHistoryType[]>> => {
  const response = await axios.post<IBackendResponse<ITravelHistoryType[]>>(
    'https://dev-api.ehealth4u.eu/api/Observation/TravelHistory/GetTravelHistory',
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
