import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import styles from './style';
import {useTranslation} from 'react-i18next';
import Loading from '../../components/Loading/Loading';
import {useRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {ScrollView} from 'react-native-gesture-handler';
import {DATE_FORMAT} from '../../common/constants/constants';
import dayjs from 'dayjs';
import {getPatientInformation} from './api/patientInformationAPI';
import {IPatientInformation} from './interface/IPatientInformation';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [data, setData] = React.useState<IPatientInformation>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getPatientInformation(user.token, user.id, 'EN');
      setLoading(false);
      return response;
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
        {value
          ? value === ''
            ? t('profileScreen.no-data')
            : value
          : t('profileScreen.no-data')}
      </Text>
    </View>
  );

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
              {data?.givenName.at(0) ?? 'N'}
              {data?.familyName.at(0) ?? 'A'}
            </Text>
          </View>
          <Text style={[globalStyle.descriptionBlackL1, styles.Name]}>
            {data?.givenName} {data?.familyName}
          </Text>
        </View>
        <View style={styles.sections}>
          <Text style={styles.descriptions}>
            {t('profileScreen.personal-details')}
          </Text>
          <InformationBox labelKey="profileScreen.id" value={data?.primaryID} />
          <InformationBox
            labelKey="profileScreen.id2"
            value={data?.secondaryID}
          />
          <InformationBox
            labelKey="profileScreen.birth-date"
            value={
              data?.birthDate ? dayjs(data.birthDate).format(DATE_FORMAT) : null
            }
          />
          <InformationBox
            labelKey="profileScreen.gender"
            value={data?.gender}
          />
          <InformationBox
            labelKey="profileScreen.communication"
            value={data?.communicationLanguage}
          />
        </View>
        <View style={styles.sections}>
          <Text style={styles.descriptions}>
            {t('profileScreen.contact-details')}
          </Text>
          <InformationBox labelKey="profileScreen.email" value={data?.email} />
          <InformationBox
            labelKey="profileScreen.telephone"
            value={data?.mobilePhoneNumber}
          />
          <InformationBox
            labelKey="profileScreen.homeTelephone"
            value={data?.homePhoneNumber}
          />
          <InformationBox
            labelKey="profileScreen.address"
            value={`${data?.address ? data.address + ', ' : ''}${
              data?.postalCode ? data.postalCode + ', ' : ''
            }${data?.city ? data.city + ', ' : ''}${
              data?.country ? data.country : ''
            }`}
          />
        </View>

        <View style={styles.sections}>
          <Text style={styles.descriptions}>
            {t('profileScreen.emergency.contact')}
          </Text>
          {data?.guardian ? (
            <View>
              <InformationBox
                labelKey="profileScreen.emergency.name"
                value={`${data?.guardian.givenName} ${data?.guardian.familyName}`}
              />
              <InformationBox
                labelKey="profileScreen.email"
                value={data?.guardian.email}
              />
              <InformationBox
                labelKey="profileScreen.telephone"
                value={data?.guardian.phone}
              />
              <InformationBox
                labelKey="profileScreen.address"
                value={`${
                  data?.guardian.address ? data.guardian.address + ', ' : ''
                }${
                  data?.guardian.postalCode
                    ? data.guardian.postalCode + ', '
                    : ''
                }${data?.guardian.city ? data.guardian.city + ', ' : ''}${
                  data?.guardian.country ? data.guardian.country : ''
                }`}
              />
            </View>
          ) : (
            <Text style={[globalStyle.descriptionBlackL3, styles.marginLeft20]}>
              {t('profileScreen.no-data')}
            </Text>
          )}
        </View>
      </ScrollView>
      {/* Loading Animation */}
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default ProfileScreen;
