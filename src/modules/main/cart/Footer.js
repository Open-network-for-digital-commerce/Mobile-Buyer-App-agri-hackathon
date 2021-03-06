import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, withTheme} from 'react-native-elements';
import {appStyles} from '../../../styles/styles';

/**
 * Component to render footer in cart
 * @param theme
 * @param onCheckout:function handles click event of check out button
 * @constructor
 * @returns {JSX.Element}
 */
const Footer = ({theme, onCheckout}) => {
  const {colors} = theme;

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          appStyles.container,
          styles.clearCartButton,
          {
            borderColor: colors.accentColor,
            backgroundColor: colors.accentColor,
          },
        ]}
        onPress={onCheckout}>
        <Text style={[styles.text, {color: colors.white}]}>
          {t('main.cart.checkout')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default withTheme(Footer);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 300,
  },
  text: {fontSize: 16, textTransform: 'uppercase'},
  clearCartButton: {
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
  },
  space: {margin: 10},
});
