import Keycloak from 'react-native-keycloak-plugin';
import Keychain from 'react-native-keychain';
import jwt_decode from 'jwt-decode';
import {IKeycloakResponse} from './interface/IKeycloakResponse';
import {IKeycloakUser} from './interface/IKeycloakUser';
import {getPatientProfile} from './api/patientLoginServiceAPI';
import {
  KEYCLOAK_APPSITE_URI,
  KEYCLOAK_AUTH_SERVER_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_REDIRECT_URI,
  KEYCLOAK_RESOURCE,
  KEYCLOAK_RESPONSE_TYPE,
} from '@env';

const keycloakConfig: any = {
  'auth-server-url': KEYCLOAK_AUTH_SERVER_URL,
  realm: KEYCLOAK_REALM,
  resource: KEYCLOAK_RESOURCE,
  responseType: KEYCLOAK_RESPONSE_TYPE,
  appsiteUri: KEYCLOAK_APPSITE_URI,
  redirectUri: KEYCLOAK_REDIRECT_URI,
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

        if (user.resource_access.fhir.roles.includes('Patients')) {
          let patientId = user.fhirResourceId
            ?.find(id => id.includes('Patient/'))
            ?.split('/')[1];

          // load the patient profile using IPatient interface
          return await getPatientProfile(response.access_token, patientId)
            .then(res => {
              return {
                status: 'Authorized',
                data: {
                  id: patientId,
                  name: res.data.patient.name?.givenName.at(0),
                  surname: res.data.patient.name?.familyName,
                  loggedIn: true,
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

const signOut = async (resetKeychain: boolean) => {
  try {
    await Keycloak.logout(keycloakConfig);
    if (resetKeychain) {
      await Keychain.resetGenericPassword();
    }
  } catch (error) {
    console.log('error', error);
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
      return {status: 'AuthenticationAlert'};
    }

    if (errorDescription === 'Token is not active' && !keepLoggedIn) {
      return {status: 'LoggoutAlert'};
    }

    console.log('error', error);
    return {status: 'Failed', error};
  }
};

const autoLogin = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return await signIn(credentials.username, credentials.password, true);
    }
  } catch (error: any) {
    console.log('error', error);
    return {status: 'Failed', error};
  }
};

export {signIn, signOut, RefreshToken, autoLogin};
