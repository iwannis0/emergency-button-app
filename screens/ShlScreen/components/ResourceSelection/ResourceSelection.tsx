import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {getSummary} from '../../api/Summary';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import Loading from '../../../../components/Loading/Loading';
import {IEntry} from '../../interfaces/IPatientSummary';
import ResourceIPS from '../../../../components/ResourceIPS/ResourceIPS';
import Checkbox from '@react-native-community/checkbox';
import globalStyle from '../../../../assets/styles/globalStyle';
import {IAllergyIntoleranceSummary} from '../../interfaces/types/IAllergyIntoleranceSummary';
import {ICarePlanSummary} from '../../interfaces/types/ICarePlanSummary';
import {IConditionSummary} from '../../interfaces/types/IConditionSummary';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../../../../common/constants/constants';
import {IDeviceSummary} from '../../interfaces/types/IDeviceSummary';
import {IDiagnosticReportSummary} from '../../interfaces/types/IDiagnosticReportSummary';
import {IProcedureSummary} from '../../interfaces/types/IProcedureSummary';
import {IImmunizationSummary} from '../../interfaces/types/IImmunizationSummary';
import {IObservationSummary} from '../../interfaces/types/IObservationSummary';
import {
  IMedication,
  IMedicationSummary,
} from '../../interfaces/types/IMedicationSummary';
import {
  IConsentSummary,
  IPractitionerRole,
} from '../../interfaces/types/IConsentSummary copy';
import {summaryResourcesState} from '../../../../features/recoil/atoms/SummaryResources/summaryResourcesState';
import {SummaryResources} from '../../../../features/recoil/atoms/SummaryResources/SummaryResources';
import styles from './style';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const ResourceSelection = () => {
  const {t} = useTranslation();
  const [_, SetSummaryResources] = useRecoilState(summaryResourcesState);
  const [user, __] = useRecoilState(userState);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [confirmationPhase, setConfirmationPhase] = useState<boolean>(false);
  const [dropdownValue, setDropdownValue] = useState(t('shl.summary.show-all'));
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const [data, setData] = useState<IEntry[]>([]);
  const [vizualizeData, setVizualizedData] = useState<IEntry[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const newData = await getSummary(user.token, user.id);
      return newData;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then(newData => {
      newData.entry = newData?.entry.filter(
        (entry: IEntry) =>
          entry.resource.resourceType === 'Patient' ||
          entry.resource.resourceType === 'Composition' ||
          entry.resource.resourceType === 'AllergyIntolerance' ||
          entry.resource.resourceType === 'CarePlan' ||
          entry.resource.resourceType === 'Condition' ||
          entry.resource.resourceType === 'Device' ||
          entry.resource.resourceType === 'DiagnosticReport' ||
          entry.resource.resourceType === 'Immunization' ||
          entry.resource.resourceType === 'Procedure' ||
          entry.resource.resourceType === 'Observation' ||
          entry.resource.resourceType === 'MedicationRequest' ||
          entry.resource.resourceType === 'Medication' ||
          entry.resource.resourceType === 'Consent' ||
          entry.resource.resourceType === 'PractitionerRole',
      );
      newData.entry.sort((a: IEntry, b: IEntry) => {
        if (a.resource.resourceType < b.resource.resourceType) {
          return -1;
        }
        if (a.resource.resourceType > b.resource.resourceType) {
          return 1;
        }

        if (a.resource.meta.profile[0] < b.resource.meta.profile[0]) {
          return -1;
        }
        if (a.resource.meta.profile[0] > b.resource.meta.profile[0]) {
          return 1;
        }

        return 0;
      });
      setData(newData.entry);
      setVizualizedData(newData.entry);
      setSelectedStates([]);
      setConfirmationPhase(false);
    });
  }, []);

  useEffect(() => {
    if (confirmationPhase) {
      const filteredIds = data.filter(id =>
        selectedStates.includes(id.fullUrl),
      );
      setVizualizedData(filteredIds);
    } else {
      setVizualizedData(data);
    }
  }, [confirmationPhase]);

  useEffect(() => {
    switch (dropdownValue) {
      case t('shl.summary.allergy'):
      case t('shl.summary.intolerance'):
        setVizualizedData(
          data.filter(
            item => item.resource.resourceType === 'AllergyIntolerance',
          ),
        );
        break;
      case t('shl.summary.careplan'):
        setVizualizedData(
          data.filter(item => item.resource.resourceType === 'CarePlan'),
        );
        break;
      case t('shl.summary.problem'):
        setVizualizedData(
          data.filter(item => item.resource.resourceType === 'Condition'),
        );
        break;
      case t('shl.summary.device'):
        setVizualizedData(
          data.filter(item => item.resource.resourceType === 'Device'),
        );
        break;
      case t('shl.summary.diagnosis'):
        setVizualizedData(
          data.filter(
            item => item.resource.resourceType === 'DiagnosticReport',
          ),
        );
        break;
      case t('shl.summary.procedure'):
        setVizualizedData(
          data.filter(item => item.resource.resourceType === 'Procedure'),
        );
        break;
      case t('shl.summary.immunization'):
        setVizualizedData(
          data.filter(item => item.resource.resourceType === 'Immunization'),
        );
        break;
      case t('shl.summary.vital-sign'):
      case t('shl.summary.pregnancy'):
      case t('shl.summary.social-history'):
      case t('shl.summary.travel-history'):
        setVizualizedData(
          data.filter(item => item.resource.resourceType === 'Observation'),
        );
        break;
      case t('shl.summary.medication'):
        setVizualizedData(
          data.filter(
            item => item.resource.resourceType === 'MedicationRequest',
          ),
        );
        break;
      case t('shl.summary.consent'):
        setVizualizedData(
          data.filter(item => item.resource.resourceType === 'Consent'),
        );
        break;
      default:
        setVizualizedData(data);
    }
  }, [dropdownValue]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStates([]);
    } else {
      setSelectedStates(data.map(entry => entry.fullUrl));
    }
    setSelectAll(!selectAll);
  };

  const renderItem = ({item, index}: {item: IEntry; index: number}) => {
    if (confirmationPhase && !selectedStates.includes(item.fullUrl)) {
      return;
    }

    let identification = t('no-data');
    let type = t('no-data');
    let info1 = t('no-data');
    let info2 = t('no-data');
    let info3 = t('no-data');
    let info4 = t('no-data');

    switch (item.resource.resourceType) {
      case 'AllergyIntolerance':
        const AllergyResource = item.resource as IAllergyIntoleranceSummary;
        if (
          AllergyResource.code.coding.at(0)?.display ===
          'No information about allergies'
        ) {
          return;
        }
        identification = AllergyResource.id;
        if (AllergyResource.type === 'allergy') {
          type = t('shl.summary.allergy');
        } else {
          type = t('shl.summary.intolerance');
        }
        info1 = `${t(
          'medicalHistory.medicalPersonalHistory.allergies.substance',
        )}: ${AllergyResource.code.coding.at(0)?.display || t('no-data')}`;
        info2 = `${t(
          'medicalHistory.medicalPersonalHistory.allergies.status',
        )}: ${
          AllergyResource.clinicalStatus.coding.at(0)?.display || t('no-data')
        }`;
        info3 = `${t(
          'medicalHistory.medicalPersonalHistory.allergies.category',
        )}: ${AllergyResource.category || t('no-data')}`;
        info4 = `${t(
          'medicalHistory.medicalPersonalHistory.allergies.criticality',
        )}: ${AllergyResource.criticality || t('no-data')}`;
        break;
      case 'CarePlan':
        const CarePlanResource = item.resource as ICarePlanSummary;
        identification = CarePlanResource.id;
        type = t('shl.summary.careplan');
        info1 = CarePlanResource.title;
        info2 = `${t(
          'medicalHistory.medicalPersonalHistory.medication.status',
        )}: ${CarePlanResource.status || t('no-data')}`;
        info3 = CarePlanResource.description || t('no-data');
        break;
      case 'Condition':
        const ConditionResource = item.resource as IConditionSummary;
        identification = ConditionResource.id;
        info1 = ConditionResource.code.coding.at(0)?.display || t('no-data');
        if (
          ConditionResource.clinicalStatus.coding.at(0)?.display === 'Active'
        ) {
          type = t('shl.summary.problem');
        } else {
          type = t('shl.summary.pastillness');
          info2 = `${t(
            'medicalHistory.medicalPersonalHistory.problems.current.severity',
          )}: ${
            ConditionResource.severity.coding.at(0)?.display || t('no-data')
          }`;
          info3 = `${t(
            'medicalHistory.medicalPersonalHistory.problems.current.onset',
          )}: ${
            dayjs(ConditionResource.onsetDateTime).format(DATE_FORMAT) ||
            t('no-data')
          }`;
          info4 = `${t(
            'medicalHistory.medicalPersonalHistory.problems.resolved.resolution',
          )}: ${
            dayjs(ConditionResource.abatementDateTime).format(DATE_FORMAT) ||
            t('no-data')
          }`;
        }
        break;
      case 'Device':
        const DeviceResource = item.resource as IDeviceSummary;
        identification = DeviceResource.id;
        type = t('shl.summary.device');
        info1 = DeviceResource.type.coding.at(0)?.display || t('no-data');
        info2 = `${t(
          'medicalHistory.medicalPersonalHistory.medication.status',
        )}: ${DeviceResource.status || t('no-data')}`;
        break;
      case 'DiagnosticReport':
        const DiagnosticReportResource =
          item.resource as IDiagnosticReportSummary;
        identification = DiagnosticReportResource.id;
        type = t('shl.summary.diagnosis');
        info1 =
          DiagnosticReportResource.category.at(0)?.coding.at(0)?.display ||
          t('no-data');
        if (DiagnosticReportResource.code.coding) {
          info2 =
            DiagnosticReportResource.code.coding.at(0)?.display || t('no-data');
        }
        info3 = `${t(
          'medicalHistory.medicalPersonalHistory.problems.functional.date',
        )}: ${
          dayjs(DiagnosticReportResource.effectiveDateTime).format(
            DATE_FORMAT,
          ) || t('no-data')
        }`;
        break;
      case 'Procedure':
        const ProcedureResource = item.resource as IProcedureSummary;
        identification = ProcedureResource.id;
        type = t('shl.summary.procedure');
        info1 = ProcedureResource.code.coding.at(0)?.display || t('no-data');
        info2 = `${t(
          'medicalHistory.medicalPersonalHistory.problems.procedures.bodysite',
        )}: ${
          ProcedureResource.bodySite.at(0)?.coding.at(0)?.display ||
          t('no-data')
        }`;
        info3 = `${t(
          'medicalHistory.medicalPersonalHistory.problems.procedures.date',
        )}: ${
          dayjs(ProcedureResource.performedDateTime).format(DATE_FORMAT) ||
          t('no-data')
        }`;
        break;
      case 'Immunization':
        const ImmunizationResource = item.resource as IImmunizationSummary;
        identification = ImmunizationResource.id;
        type = t('shl.summary.immunization');
        info1 =
          ImmunizationResource.vaccineCode.coding.at(0)?.display ||
          t('no-data');
        info2 = `${t('medicalHistory.immunization.details.batch-number')}: ${
          ImmunizationResource.lotNumber || t('no-data')
        }`;
        info3 = `${t('medicalHistory.immunization.date')}: ${
          dayjs(ImmunizationResource.occurrenceDateTime).format(DATE_FORMAT) ||
          t('no-data')
        }`;
        break;
      case 'Observation':
        const ObservationResource = item.resource as IObservationSummary;
        identification = ObservationResource.id;
        type = 'Test';
        switch (ObservationResource.code.coding.at(0)?.code) {
          case '8310-5': // Body Temperature
          case '29463-7': // Body weight
          case '8867-4': // Heart rate
          case '8302-2': // Body height
          case '9279-1': // Respiratory rate
          case '363812007': // Head circumference
          case '38699-5': // Dichloroethane [Mass/volume] in Air
          case '14258-8': // Dioxane [Mass/volume] in Blood
          case '80628-1': // Methylthioethane [Mass/volume] in Urine
          case '38624-3': // Trichloroethane [Mass/volume] in Air
            type = t('shl.summary.vital-sign');
            info1 =
              ObservationResource.code.coding.at(0)?.display || t('no-data');
            info2 = `${t('shl.summary.measurment')}: ${
              ObservationResource.valueQuantity.value
            } ${ObservationResource.valueQuantity.unit}`;
            info3 = `${t(
              'medicalHistory.medicalPersonalHistory.problems.functional.date',
            )}: ${
              dayjs(ObservationResource.effectiveDateTime).format(
                DATE_FORMAT,
              ) || t('no-data')
            }`;
            break;
          case '11640-0': // Total Births
          case '33065-4': // Total ectopic pregnancies
          case '11612-9': // Total Abortions
            type = t('shl.summary.pregnancy');
            info1 =
              ObservationResource.code.coding.at(0)?.display || t('no-data');
            info2 = `${t('shl.summary.measurment')}: ${
              ObservationResource.valueQuantity.value
            }`;
            info3 = `${t(
              'medicalHistory.medicalPersonalHistory.problems.functional.date',
            )}: ${
              dayjs(ObservationResource.effectiveDateTime).format(
                DATE_FORMAT,
              ) || t('no-data')
            }`;
            break;
          case '11779-6': // Pregnancy expected Delivery (last menstrual period)
          case '11778-8': // Pregnancy expected Delivery (clinical)
          case '11780-4': // Pregnancy expected Delivery (ovulation)
            type = t('shl.summary.pregnancy');
            info1 =
              ObservationResource.code.coding.at(0)?.display || t('no-data');
            info2 = `${t('shl.summary.expectedDate')}: ${
              dayjs(ObservationResource.valueDateTime).format(DATE_FORMAT) ||
              t('no-data')
            }`;
            info3 = `${t(
              'medicalHistory.medicalPersonalHistory.problems.functional.date',
            )}: ${
              dayjs(ObservationResource.effectiveDateTime).format(
                DATE_FORMAT,
              ) || t('no-data')
            }`;
            break;
          case '85354-9': // Blood pressure panel with all children
            type = t('shl.summary.vital-sign');
            info1 =
              ObservationResource.code.coding.at(0)?.display || t('no-data');
            info2 = `${t(
              'medicalHistory.medicalPersonalHistory.problems.functional.date',
            )}: ${
              dayjs(ObservationResource.effectiveDateTime).format(
                DATE_FORMAT,
              ) || t('no-data')
            }`;
            break;
          case '401175000': // Sleep pattern finding
          case '228366006': // drug misuse behavior
          case '82810-3': // Pregnancy status
            type = t('shl.summary.social-history');
            if (ObservationResource.code.coding.at(0)?.code === '82810-3') {
              type = t('shl.summary.pregnancy');
            }
            info1 =
              ObservationResource.code.coding.at(0)?.display || t('no-data');
            info2 =
              ObservationResource.valueCodeableConcept?.coding?.at(0)
                ?.display || t('no-data');
            info3 = `${t(
              'medicalHistory.medicalPersonalHistory.problems.functional.date',
            )}: ${
              dayjs(ObservationResource.effectiveDateTime).format(
                DATE_FORMAT,
              ) || t('no-data')
            }`;
            break;
          case '8691-8': // History of travel
            type = t('shl.summary.travel-history');
            info1 = `${t('shl.summary.country')}: ${
              ObservationResource.valueCodeableConcept.coding.at(0)?.display ||
              t('no-data')
            }`;
            info2 = `${t('medicalHistory.epidemiologicalHistory.arrival')}: ${
              dayjs(ObservationResource.effectivePeriod.start).format(
                DATE_FORMAT,
              ) || t('no-data')
            }`;
            info3 = `${t('medicalHistory.epidemiologicalHistory.departure')}: ${
              dayjs(ObservationResource.effectivePeriod.end).format(
                DATE_FORMAT,
              ) || t('no-data')
            }`;
            break;
          case '80439-3': // Current Drinker
            type = t('shl.summary.social-history');
            info1 =
              ObservationResource.code.coding.at(0)?.display || t('no-data');
            info2 = t('shl.summary.no-drinker');
            if (ObservationResource.component) {
              info2 = `${t(
                'medicalHistory.socialHistory.alcohol-consumption.alcohol-type',
              )}: ${
                ObservationResource.component
                  ?.at(0)
                  ?.extension.at(0)
                  ?.valueCodeableConcept.coding.at(0)?.display || t('no-data')
              }`;
              info3 = `${t(
                'medicalHistory.socialHistory.alcohol-consumption.alcohol-intake-per-day',
              )}: ${
                ObservationResource.component.at(0)?.valueQuantity.value ||
                t('no-data')
              }`;
              info4 = `${t(
                'medicalHistory.medicalPersonalHistory.problems.functional.date',
              )}: ${
                dayjs(ObservationResource.effectiveDateTime).format(
                  DATE_FORMAT,
                ) || t('no-data')
              }`;
            }
            break;
          case '72166-2': // Smoking Status
            type = t('shl.summary.social-history');
            info1 =
              ObservationResource.code.coding.at(0)?.display || t('no-data');
            info2 = `${t('shl.summary.smoking-product')}: ${
              ObservationResource.component
                .at(0)
                ?.valueCodeableConcept.coding.at(0)?.display || t('no-data')
            }`;
            info3 = `${t('shl.summary.smoking-quantity')}: ${
              ObservationResource.component.at(1)?.valueInteger || t('no-data')
            }`;
            info4 = `${t(
              'medicalHistory.medicalPersonalHistory.problems.functional.date',
            )}: ${
              dayjs(ObservationResource.effectiveDateTime).format(
                DATE_FORMAT,
              ) || t('no-data')
            }`;
            break;
          case '55409-7': // Exercise
            type = t('shl.summary.social-history');

            info1 = `${t('shl.summary.activity')}: ${
              ObservationResource.component
                ?.at(0)
                ?.valueCodeableConcept.coding.at(0)?.display || t('no-data')
            }`;
            info2 = `${t(
              'medicalHistory.medicalPersonalHistory.problems.functional.date',
            )}: ${
              dayjs(ObservationResource.effectivePeriod.start).format(
                DATE_FORMAT,
              ) || t('no-data')
            }`;
            break;
          case '99631-4': // Cone beam
          case '96912-1': // CT global noise
          case '36086-7': // CT Abdomen limited
            type = t('shl.summary.imaging');
            info1 =
              ObservationResource.code.coding.at(0)?.display || t('no-data');
            info2 = `${t('shl.summary.measurment')}: ${
              ObservationResource.valueString
            }`;
            info3 = `${t(
              'medicalHistory.medicalPersonalHistory.problems.functional.date',
            )}: ${
              dayjs(ObservationResource.effectiveDateTime).format(
                DATE_FORMAT,
              ) || t('no-data')
            }`;
            break;
          default:
            type = t('shl.summary.unknown');
            info1 =
              ObservationResource.code.coding.at(0)?.display || t('no-data');
        }
        break;
      case 'MedicationRequest':
        const MedicationResource = item.resource as IMedicationSummary;
        const medicine = data?.find(
          entry =>
            entry.resource.id ===
            MedicationResource.medicationReference.reference.split('/')[1],
        )?.resource as IMedication;
        identification = MedicationResource.id;
        type = t('shl.summary.medication');
        info1 =
          medicine.extension.at(1)?.extension.at(0)?.valueString ||
          t('no-data');
        info2 = `${t('shl.summary.quantity')}: ${
          MedicationResource.dispenseRequest.quantity.value || t('no-data')
        }`;
        info3 = `${t('shl.summary.issuedDate')}: ${
          dayjs(MedicationResource.dispenseRequest.validityPeriod.start).format(
            DATE_FORMAT,
          ) || t('no-data')
        }`;
        break;
      case 'Consent':
        const ConsentResource = item.resource as IConsentSummary;
        const practitionerRole = data?.find(
          entry =>
            entry.resource.id ===
            ConsentResource.performer.at(0)?.reference.split('/')[1],
        )?.resource as IPractitionerRole;
        identification = ConsentResource.id;
        type = t('shl.summary.consent');
        info1 = ConsentResource.scope.coding.at(0)?.display || t('no-data');
        info2 = `${t(
          'medicalHistory.medicalPersonalHistory.medication.status',
        )}: ${ConsentResource.status || t('no-data')}`;
        info3 = `${t('shl.summary.provider-role')}: ${
          practitionerRole.code.at(0)?.coding.at(0)?.display || t('no-data')
        }`;
        info4 = `${t('shl.summary.issuedDate')}: ${
          dayjs(ConsentResource.dateTime).format(DATE_FORMAT) || t('no-data')
        }`;
        break;
      default:
        return;
    }

    if (!confirmationPhase && dropdownValue !== t('shl.summary.show-all')) {
      if (!confirmationPhase && dropdownValue !== type) {
        return;
      }
    }
    if (searchQuery !== '') {
      if (
        !type.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !info1.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !info2.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !info3.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !info4.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return;
      }
    }
    return (
      <ResourceIPS
        id={identification}
        selected={selectedStates.includes(item.fullUrl)}
        //ids.filter(id => id !== idToRemove);
        addID={() => setSelectedStates([...selectedStates, item.fullUrl])}
        removeID={() =>
          setSelectedStates(selectedStates.filter(id => id !== item.fullUrl))
        }
        type={type}
        text1={info1}
        text2={info2}
        text3={info3}
        text4={info4}
        phase={confirmationPhase}
      />
    );
  };

  return (
    <SafeAreaView style={styles.modalHeight}>
      <View style={styles.container}>
        <Text style={globalStyle.descriptionBlackL2}>
          {confirmationPhase ? t('shl.confirm-promt') : t('shl.select-promt')}
        </Text>
        {!confirmationPhase && (
          <TouchableOpacity style={styles.row} onPress={handleSelectAll}>
            <Checkbox tintColor={'black'} disabled={true} value={selectAll} />
            <Text style={globalStyle.descriptionBlackL3}>
              {t('shl.select-all')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {!confirmationPhase && (
        <View style={[styles.row, styles.searchContainer]}>
          <CategoryDropdown value={dropdownValue} setValue={setDropdownValue} />
          <View style={[styles.row, styles.searchInput]}>
            <FontAwesomeIcon icon={faSearch} />
            <TextInput
              style={styles.searchInputText}
              placeholder={t('general.search')}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>
      )}

      <FlatList
        style={styles.flatList}
        data={vizualizeData}
        renderItem={renderItem}
        keyExtractor={item => item.fullUrl}
      />
      <View>
        <TouchableOpacity
          style={[globalStyle.Button, styles.continueButton]}
          onPress={() => {
            if (confirmationPhase) {
              const PatientID =
                data.find(item => item.resource.resourceType === 'Patient')
                  ?.fullUrl || 'noPatient';
              const CompositionID =
                data.find(item => item.resource.resourceType === 'Composition')
                  ?.fullUrl || 'noPatient';
              setSelectedStates([PatientID, CompositionID, ...selectedStates]);
              SetSummaryResources(
                new SummaryResources(
                  true,
                  data.filter(item => selectedStates.includes(item.fullUrl)),
                ),
              );
            } else {
              setConfirmationPhase(true);
            }
          }}>
          <Text style={globalStyle.buttonText}>
            {confirmationPhase ? t('shl.confirm') : t('shl.continue')}
          </Text>
        </TouchableOpacity>
        {confirmationPhase && (
          <TouchableOpacity
            style={[globalStyle.Button, styles.backButton]}
            onPress={() => setConfirmationPhase(false)}>
            <Text style={globalStyle.buttonText}>{t('shl.go-back')}</Text>
          </TouchableOpacity>
        )}
      </View>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default ResourceSelection;
