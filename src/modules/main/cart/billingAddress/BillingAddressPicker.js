import {useIsFocused} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {CheckBox, Text, withTheme} from 'react-native-elements';
import ContainButton from '../../../../components/button/ContainButton';
import {Context as AuthContext} from '../../../../context/Auth';
import useNetworkErrorHandling from '../../../../hooks/useNetworkErrorHandling';
import {strings} from '../../../../locales/i18n';
import {appStyles} from '../../../../styles/styles';
import {getData} from '../../../../utils/api';
import {
  BASE_URL,
  BILLING_ADDRESS,
  GET_ADDRESS,
} from '../../../../utils/apiUtilities';
import {skeletonList} from '../../../../utils/utils';
import AddressCard from '../addressPicker/AddressCard';
import AddressCardSkeleton from '../addressPicker/AddressCardSkeleton';
import Header from '../addressPicker/Header';

const buttonTitle = strings('main.cart.next');
const selectAddress = strings('main.cart.select_address_title');
const emptyListMessage = strings('main.order.list_empty_message');

/**
 * Component to render list of address
 * @param navigation: required: to navigate to the respective screen
 * @param theme:application theme
 * @constructor
 * @returns {JSX.Element}
 */
const BillingAddressPicker = ({navigation, theme, route: {params}}) => {
  const {colors} = theme;
  const [list, setList] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [checked, setChecked] = useState(false);
  const isFocused = useIsFocused();
  const {
    state: {token},
  } = useContext(AuthContext);
  const {handleApiError} = useNetworkErrorHandling();
  const {selectedAddress} = params;

  /**
   * function to get list of address from server
   * @returns {Promise<void>}
   */
  const getAddressList = async () => {
    try {
      const {data} = await getData(`${BASE_URL}${BILLING_ADDRESS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let newList = data.map(element => {
        element.id = Math.random().toString();
        return element;
      });

      setList(newList);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setList([]);
        } else {
          handleApiError(error);
        }
      }
    }
  };

  /**
   * function handles click event of next button
   */
  const onPressHandler = () => {
    if (checked) {
      navigation.navigate('Confirmation', {
        selectedAddress,
        selectedBillingAddress: selectedAddress,
      });
    } else {
      navigation.navigate('Confirmation', {
        selectedAddress,
        selectedBillingAddress: selectedBillingAddress,
      });
    }
  };

  /**
   * Function is used to render single address card in the list
   * @param item: single object from address list
   * @returns {JSX.Element}
   */
  const renderItem = ({item}) => {
    return item.hasOwnProperty('isSkeleton') && item.isSkeleton ? (
      <AddressCardSkeleton item={item} />
    ) : (
      <AddressCard
        item={item}
        selectedAddress={selectedBillingAddress}
        setSelectedAddress={setSelectedBillingAddress}
      />
    );
  };

  useEffect(() => {
    if (isFocused) {
      getAddressList()
        .then(() => {})
        .catch(() => {});
    }
  }, [isFocused]);

  const listData = list ? list : skeletonList;

  return (
    <SafeAreaView
      style={[appStyles.container, {backgroundColor: colors.backgroundColor}]}>
      <View
        style={[
          appStyles.container,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <Header
          title={'Billing Address'}
          show={selectedAddress}
          navigation={navigation}
        />

        <FlatList
          data={listData}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            return <Text>{emptyListMessage}</Text>;
          }}
          contentContainerStyle={
            listData.length > 0
              ? styles.contentContainerStyle
              : [appStyles.container, styles.emptyContainer]
          }
        />
        <CheckBox
          title={'Same as delivery address'}
          checked={checked}
          onPress={() => {
            setChecked(!checked);
          }}
        />

        {(selectedBillingAddress !== null || checked) && (
          <View style={styles.buttonContainer}>
            <ContainButton title={buttonTitle} onPress={onPressHandler} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default withTheme(BillingAddressPicker);
const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  contentContainerStyle: {paddingHorizontal: 10, paddingBottom: 10},
  emptyContainer: {justifyContent: 'center', alignItems: 'center'},
});