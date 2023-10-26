import Keycloak from 'react-native-keycloak-plugin';
import jwt_decode from 'jwt-decode';
import {IKeycloakResponse} from './interface/IKeycloakResponse';
import {IKeycloakUser} from './interface/IKeycloakUser';
import {getPatientProfile} from './api/patientLoginServiceAPI';
import Keychain from 'react-native-keychain';

const keycloakConfig: any = {
  'auth-server-url': 'https://auth.3ahealth.com/',
  realm: 'ehealth4u',
  resource: 'ehealth4upathed',
  responseType: 'code',
  appsiteUri: 'PATHeD',
  redirectUri: 'PATHeD://Home',
};

const signIn = async (username: string, password: string) => {
  try {
    return await Keycloak.login(
      keycloakConfig,
      username,
      password,
      'openid profile fhir email offline_access',
    )
      .then(async (response: IKeycloakResponse) => {
        // User can be either patient or practitioner
        let user = jwt_decode<IKeycloakUser>(response.access_token);

        // Save the credentials in the keychain
        await Keychain.setGenericPassword(username, response.access_token);

        if (user.resource_access.fhir.roles.includes('Patients')) {
          let patientId = user.fhirResourceId
            ?.find(id => id.includes('Patient/'))
            ?.split('/')[1];

          // load the patient profile using IPatient interface
          let patientResponse = await getPatientProfile(
            response.access_token,
            patientId,
          )
            .then(res => {
              return {
                status: true,
                data: {
                  id: patientId,
                  name: res.data.name?.givenName[0],
                  surname: res.data.name?.familyName,
                  token: response.access_token,
                  loggedIn: true,
                },
              };
            })
            .catch(() => {
              return {
                status: false,
              };
            });
          return patientResponse;
        }
      })
      .catch((error: any) => {
        console.log('error', error);
        return {
          status: false,
        };
      });
  } catch (error) {
    console.log('error', error);
    return {
      status: false,
    };
  }
};

export {signIn};
