import axios from 'axios';
import {BACKEND_API_URL} from '@env';
import {IBackendResponse} from '../../../common/interfaces/IBackedResponse';

export const deleteLink = async (
  link: string,
  token: string,
): Promise<IBackendResponse<boolean>> => {
  const response = await axios.patch(
    `${BACKEND_API_URL}/SmartHealthLink/DeleteSmartHealthLink`,
    {},
    {
      params: {
        link: link,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
