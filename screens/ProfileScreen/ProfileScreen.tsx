import React, {useEffect} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import styles from './style';
import {useTranslation} from 'react-i18next';
import {IPatient} from '../../features/auth/interface/IPatient';
import {getPatientProfile} from '../../features/auth/api/patientLoginServiceAPI';
import {useRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {format} from 'date-fns';

const ProfileScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useRecoilState(userState);
  const [data, setData] = React.useState<IPatient>();

  const fetchData = async () => {
    const data = await getPatientProfile(user.token, user.id);
    return data.data;
  };

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
    });
  }, []);

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, {flex: 1}]}>
      {/* Profile Image and Name */}
      <View style={styles.marginTop30}>
        <View style={styles.ProfileContainer}>
          <View style={styles.ImageContainer}>
            <Image
              tintColor={'#85CECA'}
              source={require('../../assets/images/Profile/default.png')}
              style={styles.ImageStyle}
            />
            <Text style={styles.ImageInitials}>
              {data?.name?.givenName[0][0]}
              {data?.name?.familyName[0]}
            </Text>
          </View>
          <Text style={[globalStyle.descriptionBlackL1, styles.Name]}>
            {data?.name?.givenName.join(' ')} {data?.name?.familyName}
          </Text>
        </View>
      </View>

      <View style={styles.informationContainer}>
        {/* Identification */}
        <View style={styles.sections}>
          <Text style={styles.descriptions}>Identification Number</Text>
          <Text style={globalStyle.descriptionBlackL3}>
            {data?.nationalIdentity?.documentNumber ?? 'No data available'}
          </Text>
        </View>

        {/* Birthday and Gender */}
        <View style={[styles.combinedsections]}>
          <View style={[styles.sections, styles.width220]}>
            <Text style={styles.descriptions}>Birthday</Text>
            <Text style={globalStyle.descriptionBlackL3}>
              {data?.birthDate
                ? format(new Date(data.birthDate), 'dd MMMM yyyy')
                : 'No data available'}
            </Text>
          </View>
          <View style={[styles.sections, styles.width150]}>
            <Text style={styles.descriptions}>Gender</Text>
            <Text style={globalStyle.descriptionBlackL3}>
              {data?.gender ?? 'No data available'}
            </Text>
          </View>
        </View>

        {/* Email and Telephone */}
        <View style={[styles.combinedsections]}>
          <View style={[styles.sections, styles.width220]}>
            <Text style={styles.descriptions}>Email</Text>
            <Text style={globalStyle.descriptionBlackL3}>
              {data?.telecom[1].value ?? 'No data available'}
            </Text>
          </View>
          <View style={[styles.sections, styles.width150]}>
            <Text style={styles.descriptions}>Telephone</Text>
            <Text style={globalStyle.descriptionBlackL3}>
              {data?.telecom[0].value ?? 'No data available'}
            </Text>
          </View>
        </View>

        {/* Address */}
        <View style={styles.sections}>
          <Text style={styles.descriptions}>Address</Text>
          {data?.insurance && data.insurance.length > 0 ? (
            <>
              <Text style={globalStyle.descriptionBlackL3}>
                {data?.address[0]?.streetName &&
                  `${data.address[0].streetName}`}
                {data?.address[0]?.houseNumber &&
                  ` ${data.address[0].houseNumber}`}
                {data?.address[0]?.city && `, ${data.address[0].city}`}
                {data?.address[0]?.postalCode &&
                  `, ${data.address[0].postalCode}`}
                {data?.address[0]?.state && `, ${data.address[0].state}`}
                {data?.address[0]?.province && `, ${data.address[0].province}`}
                {data?.address[0]?.country &&
                  `, ${data.address[0].country}`}{' '}
              </Text>
            </>
          ) : (
            <Text style={globalStyle.descriptionBlackL3}>
              No data available
            </Text>
          )}
        </View>

        {/* Insurance */}
        <View style={styles.sections}>
          <Text style={styles.descriptions}>Insurance</Text>
          {data?.insurance && data.insurance.length > 0 ? (
            <>
              <View style={styles.row}>
                <Text style={globalStyle.descriptionBlackL3}>
                  Organisation:
                </Text>
                <Text style={globalStyle.descriptionBlackL3}>
                  {data?.insurance[0]?.organizationName}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={globalStyle.descriptionBlackL3}>
                  {' '}
                  Current Plan:
                </Text>
                <Text style={globalStyle.descriptionBlackL3}>
                  {data?.insurance[0].planIdentifier}
                </Text>
              </View>
            </>
          ) : (
            <Text style={globalStyle.descriptionBlackL3}>
              No data available
            </Text>
          )}
        </View>

        {/* Identification */}
        <View style={styles.sections}>
          <Text style={styles.descriptions}>Identification Number</Text>
          <Text style={globalStyle.descriptionBlackL3}>
            {data?.nationalIdentity?.documentNumber ?? 'No data available'}
          </Text>
        </View>

        {/* Identification */}
        <View style={styles.sections}>
          <Text style={styles.descriptions}>Identification Number</Text>
          <Text style={globalStyle.descriptionBlackL3}>
            {data?.nationalIdentity?.documentNumber ?? 'No data available'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
