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

const signIn = async (
  username: string,
  password: string,
  keepLoggedIn: boolean,
) => {
  try {
    return await Keycloak.login(
      keycloakConfig,
      username,
      password,
      'openid profile fhir email offline_access',
    )
      .then(async (response: IKeycloakResponse) => {
        let user = jwt_decode<IKeycloakUser>(response.access_token);

        // Keep Logged In Functionality
        if (keepLoggedIn) {
          await Keychain.setGenericPassword(username, password);
        } else {
          await Keychain.resetGenericPassword();
        }
        console.log(response.access_token);
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
                status: 'Authorized',
                data: {
                  id: patientId,
                  name: res.data.name?.givenName[0],
                  surname: res.data.name?.familyName,
                  loggedIn: true,
                  keepLoggedIn: keepLoggedIn,
                  token: response.access_token,
                },
              };
            })
            .catch((error: any) => {
              console.log('error', error);
              return {
                status: 'Unauthorized',
              };
            });
          return patientResponse;
        }
      })
      .catch((error: any) => {
        console.log('error', error);
        return {
          status: 'Unauthorized',
        };
      });
  } catch (error) {
    console.log('error', error);
    return {
      status: 'Unauthorized',
    };
  }
};

const signOut = async () => {
  try {
    await Keycloak.logout(keycloakConfig);
    await Keychain.resetGenericPassword();
    return 'Success';
  } catch (error) {
    console.log('error', error);
    return 'Failed';
  }
};

const RefreshToken = async (keepLoggedIn: boolean) => {
  try {
    const response = await Keycloak.refreshToken();
    return {
      status: 'SuccesfulRefresh',
      token: response.access_token,
    };
  } catch (error: any) {
    const errorDescription = JSON.parse(error.message).error_description;

    if (errorDescription === 'Token is not active' && keepLoggedIn) {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const login = await signIn(
          credentials.username,
          credentials.password,
          true,
        );
        return login.status === 'Authorized'
          ? {status: 'SuccesfulRefresh', token: login.data.token}
          : {status: 'LoggoutAlert'};
      }
    }

    if (errorDescription === 'Token is not active' || !keepLoggedIn) {
      return {status: 'LoggoutAlert'};
    }

    console.log('error', error);
    return {status: 'Failed', error};
  }
};

export {signIn, signOut, RefreshToken};
