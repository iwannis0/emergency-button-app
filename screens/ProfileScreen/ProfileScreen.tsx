import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import styles from './style';
import {useTranslation} from 'react-i18next';
import Loading from '../../components/Loading/Loading';
import {IPatient} from '../../features/auth/interface/IPatient';
import {getPatientProfile} from '../../features/auth/api/patientLoginServiceAPI';
import {useRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {ScrollView} from 'react-native-gesture-handler';
import {IAddress} from '../../common/interfaces/IAddress';
import {IInsurance} from '../../common/interfaces/IInsurance';
import {ITelecom} from '../../common/interfaces/ITelecom';
import {
  EMAIL,
  PHONE,
  PATIENT,
  NOK,
  PRACTITIONER,
  DATE_FORMAT,
} from '../../common/constants/constants';
import dayjs from 'dayjs';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [data, setData] = React.useState<IPatient>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getPatientProfile(user.token, user.id);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const InformationBox = ({labelKey, value}) => (
    <View style={styles.informationBox}>
      <Text style={[globalStyle.descriptionGrey, styles.marginLeft20]}>
        {t(labelKey)}
      </Text>
      <Text style={[globalStyle.descriptionBlackL3, styles.marginLeft20]}>
        {value || t('profileScreen.no-data')}
      </Text>
    </View>
  );

  const getContactValue = (entity: string, type: string) => {
    if (entity === PATIENT) {
      return data?.patient.telecom.find(
        (item: ITelecom) => item.system === type,
      )?.value;
    } else if (entity === NOK) {
      return data?.patient.nextOfKinContact?.telecom.find(
        (item: ITelecom) => item.system === type,
      )?.value;
    } else {
      return data?.generalPractitioners?.practitioner.telecom.find(
        (item: ITelecom) => item.system === type,
      )?.value;
    }
  };

  const formatAddress = (address: IAddress) => {
    if (!address) {
      return null;
    }

    let formattedAddress = '';
    if (address.streetName) {
      formattedAddress += address.streetName;
    }
    if (address.houseNumber) {
      formattedAddress += ` ${address.houseNumber}`;
    }
    if (address.city) {
      formattedAddress += `, ${address.city}`;
    }
    if (address.postalCode) {
      formattedAddress += `, ${address.postalCode}`;
    }
    if (address.state) {
      formattedAddress += `, ${address.state}`;
    }
    if (address.province) {
      formattedAddress += `, ${address.province}`;
    }
    if (address.country) {
      formattedAddress += `, ${address.country}`;
    }

    return formattedAddress;
  };

  const formatInsuranceDetails = (insurance: Array<IInsurance>) => {
    return insurance && insurance.length > 0 ? insurance[0] : null;
  };

  const formatEmergencyContact = (contact: any) => {
    return contact
      ? `${contact.name?.givenName.join(' ')} ${contact.name?.familyName}`
      : null;
  };

  const formatGeneralPractitioner = (gp: any) => {
    return gp ? gp.practitioner.name?.at(0)?.text : null;
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, {flex: 1}]}>
      {/* Profile Image and Name */}
      <ScrollView>
        <View style={styles.ProfileContainer}>
          <View style={styles.ImageContainer}>
            <Image
              tintColor={'#85CECA'}
              source={require('../../assets/images/Profile/default.png')}
              style={styles.ImageStyle}
            />
            <Text style={styles.ImageInitials}>
              {data?.patient.name?.givenName?.at(0)?.at(0) ?? 'N'}
              {data?.patient.name?.familyName?.at(0) ?? 'A'}
            </Text>
          </View>
          <Text style={[globalStyle.descriptionBlackL1, styles.Name]}>
            {data?.patient.name?.givenName.join(' ')}{' '}
            {data?.patient.name?.familyName}
          </Text>
        </View>

        {/* Personal Details */}
        <View style={styles.sections}>
          <Text style={styles.descriptions}>
            {t('profileScreen.personal-details')}
          </Text>
          <InformationBox
            labelKey="profileScreen.id"
            value={data?.patient.nationalIdentity?.documentNumber}
          />
          <InformationBox
            labelKey="profileScreen.birth-date"
            value={
              data?.patient.birthDate
                ? dayjs(new Date(data.patient.birthDate)).format(DATE_FORMAT)
                : null
            }
          />
          <InformationBox
            labelKey="profileScreen.gender"
            value={data?.patient.gender}
          />
        </View>

        {/* Contact Details */}
        <View style={styles.sections}>
          <Text style={styles.descriptions}>
            {t('profileScreen.contact-details')}
          </Text>
          <InformationBox
            labelKey="profileScreen.email"
            value={getContactValue(PATIENT, EMAIL)}
          />
          <InformationBox
            labelKey="profileScreen.telephone"
            value={getContactValue(PATIENT, PHONE)}
          />
          <InformationBox
            labelKey="profileScreen.address"
            value={formatAddress(data?.patient.address?.at(0))}
          />
        </View>

        {/* Insurance */}
        <View style={styles.sections}>
          <Text style={styles.descriptions}>
            {t('profileScreen.insurance.details')}
          </Text>
          <InformationBox
            labelKey="profileScreen.insurance.organisation"
            value={
              formatInsuranceDetails(data?.patient.insurance)?.organizationName
            }
          />
          <InformationBox
            labelKey="profileScreen.insurance.plan"
            value={
              formatInsuranceDetails(data?.patient.insurance)?.planIdentifier
            }
          />
        </View>

        {/* Emergency Contact */}
        <View style={styles.sections}>
          <Text style={styles.descriptions}>
            {t('profileScreen.emergency.contact')}
          </Text>
          <InformationBox
            labelKey="profileScreen.emergency.name"
            value={formatEmergencyContact(data?.patient.nextOfKinContact)}
          />
          <InformationBox
            labelKey="profileScreen.emergency.relationship"
            value={data?.patient.nextOfKinContact?.relationship}
          />
          <InformationBox
            labelKey="profileScreen.email"
            value={getContactValue(NOK, EMAIL)}
          />
          <InformationBox
            labelKey="profileScreen.telephone"
            value={getContactValue(NOK, PHONE)}
          />
          <InformationBox
            labelKey="profileScreen.address"
            value={formatAddress(data?.patient.nextOfKinContact?.address)}
          />
        </View>

        {/* General Practitioner */}
        <View style={styles.sections}>
          <Text style={styles.descriptions}>
            {t('profileScreen.gpdetails')}
          </Text>
          <InformationBox
            labelKey="profileScreen.emergency.name"
            value={formatGeneralPractitioner(data?.generalPractitioners)}
          />
          <InformationBox
            labelKey="profileScreen.email"
            value={getContactValue(PRACTITIONER, EMAIL)}
          />
          <InformationBox
            labelKey="profileScreen.telephone"
            value={getContactValue(PRACTITIONER, PHONE)}
          />
          <InformationBox
            labelKey="profileScreen.address"
            value={formatAddress(
              data?.generalPractitioners?.practitioner.address,
            )}
          />
        </View>
      </ScrollView>
      {/* Loading Animation */}
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default ProfileScreen;
