import React, {useContext} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Divider, Icon, Text, withTheme} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {appStyles} from '../../../styles/styles';
import {Context as AuthContext} from '../../../context/Auth';
import OptionCard from './OptionCard';

const list = [
  {id: 'gvjh', name: 'Profile', icon: 'user'},
  {id: 'nmnvh', name: 'Log Out', icon: 'sign-out'},
];

/**
 * @constructor
 * @returns {JSX.Element}
 */
const More = ({theme, navigation}) => {
  const {colors} = theme;

  const renderItem = ({item}) => {
    return <OptionCard item={item} navigation={navigation} />;
  };
  return (
    <SafeAreaView style={appStyles.container}>
      <View style={appStyles.container}>
        <FlatList
          data={list}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(More);

const styles = StyleSheet.create({
  contentContainerStyle: {padding: 0},
  text: {fontSize: 18, marginLeft: 16},
  container: {flexDirection: 'row', padding: 20},
});