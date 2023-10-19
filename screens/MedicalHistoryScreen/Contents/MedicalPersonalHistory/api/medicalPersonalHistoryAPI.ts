import axios from 'axios';
import {IAllergyType} from '../interface/IAllergiesAndIntolerances';
import {IBackendResponse} from '../../../../../common/interfaces/IBackedResponse';
import {getToken} from '../../../../../common/tokenContext';

export const getAllergyIntolerance = async (
  param: string,
  pageSize: number = 10,
  pageNumber: number = 1,
): Promise<IBackendResponse<IAllergyType[]>> => {
  const response = await axios.get<IBackendResponse<IAllergyType[]>>(
    `https://dev-api.ehealth4u.eu/api/AllergyIntolerance/GetAllergyIntolerancesByPatientId`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        patientId: param,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    },
  );

  return response.data;
};
