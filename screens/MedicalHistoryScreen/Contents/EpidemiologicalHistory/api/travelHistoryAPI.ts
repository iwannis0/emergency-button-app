import axios from 'axios';
import {ITravelHistoryType} from '../interface/ITravelHistoryType';
import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';
import {getToken} from '../../../../../common/features/tokenContext';

export const getTravelHistory = async (
  param: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<ITravelHistoryType[]>> => {
  const response = await axios.post<IBackendResponse<ITravelHistoryType[]>>(
    `https://dev-api.ehealth4u.eu/api/Observation/TravelHistory/GetTravelHistory`,
    {
      searchObservationParamsDto: {
        refPatient: 249867,
      },
      effectivePeriod: {
        isSortSelected: true,
        isSortAscending: false,
        sortIndex: 1,
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
