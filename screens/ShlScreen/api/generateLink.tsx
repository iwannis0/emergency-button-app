import axios from 'axios';
import {BACKEND_API_URL} from '@env';
import {IBackendResponse} from '../../../common/interfaces/IBackedResponse';

export const generateSHLink = async (
  token: string,
  id: string,
  code: string,
  name: string,
  expiration: string,
  resources: string,
): Promise<IBackendResponse<string>> => {
  const response = await axios.post(
    `${BACKEND_API_URL}/SmartHealthLink/GenerateSmartHealthLink`,
    {
      patientId: id,
      label: name,
      passcode: code,
      expirationDate: expiration,
      data: resources,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
