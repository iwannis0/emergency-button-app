import axios from 'axios';
import {BACKEND_API_URL} from '@env';
import {IBackendResponse} from '../../../common/interfaces/IBackedResponse';
import {IShl} from '../../../features/recoil/interfaces/IShl';

export const getLinks = async (
  token: string,
  id: string,
): Promise<IBackendResponse<IShl[]>> => {
  const response = await axios.get(
    `${BACKEND_API_URL}/SmartHealthLink/GetSmartHealthLinkHistory`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: id,
      },
    },
  );
  return response.data;
};
