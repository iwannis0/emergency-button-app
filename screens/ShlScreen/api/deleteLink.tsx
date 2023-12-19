import axios from 'axios';
import {BACKEND_API_URL} from '@env';

export const deleteLink = async (link: string, token: string) => {
  const response = await axios.patch(
    `${BACKEND_API_URL}/SmartHealthLink/DeleteSmartHealthLink`,
    {
      link: link,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
