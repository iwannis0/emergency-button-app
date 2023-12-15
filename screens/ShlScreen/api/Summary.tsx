import axios from 'axios';

export const getSummary = async (token: string, patientId: string) => {
  const response = await axios.get(
    ` https://dev-fhir.ehealth4u.eu/fhir/Patient/${patientId}/$summary`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
