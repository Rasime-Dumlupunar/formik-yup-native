//import liraries
import {Button, Input, Layout, Toggle} from '@ui-kitten/components';
import {Formik} from 'formik';
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import * as Yup from 'yup';

const FormikYup = () => {
  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Zorunlu Alah!'),
    surmame: Yup.string().required('Zorunlu Alan!'),
    phone: Yup.string()
      .required('Zorunlu Alan!')
      .min(10, 'Lütfen en az 10 hane olarak giriniz.')
      .max(11, 'Lütfen en çok 11 hane olarak giriniz.'),
    email: Yup.string()
      .required('')
      .email('Lütfen geçerli bir email adresi giriniz.!!'),
    password: Yup.string()
      .required('Zorunlu Alan')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir, ayrıca 8-40 karakter uzunluğunda olmalıdır.',
      ),
    passwordConfirm: Yup.string()
      .required('Zorunlu Alan')
      .oneOf([Yup.ref('password')], 'Şifreler uyuşmuyor'),
    agrementConfirm: Yup.bool()
      .required('Zorunlu Alan')
      .oneOf([true], 'Sözleşmeyi onaylamanız gerekiyor'),
  });

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.text}>KAYIT OLUŞTUR</Text>
      </View>
      <View style={styles.form}>
        <ScrollView>
          <Formik
            initialValues={{
              name: '',
              surname: '',
              phone: '',
              email: '',
              password: '',
              passwordConfirm: '',
              agrementConfirm: '',
            }}
            validationSchema={registerSchema}
            onSubmit={values =>
              Alert.alert('Form Değerleri', JSON.stringify(values, null, 2))
            }>
            {({handleChange, handleSubmit, values, setFieldValue, errors}) => (
              <View>
                <Layout style={styles.rowContainer} level="1">
                  <Input
                    style={styles.input}
                    placeholder="Name giriniz..."
                    size="medium"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    label={'İsim'}
                    caption={errors.name}
                    status={errors.name ? 'danger' : 'basic'}
                  />
                  <Input
                    style={styles.input}
                    placeholder="Surname giriniz..."
                    size="medium"
                    value={values.surname}
                    onChangeText={handleChange('surname')}
                    label={'Soy İsim'}
                    caption={errors.surname}
                    status={errors.surname ? 'danger' : 'basic'}
                  />
                </Layout>
                <Input
                  style={styles.input}
                  placeholder="Phone giriniz..."
                  size="medium"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  label={'Telefon'}
                  caption={errors.phone}
                  status={errors.phone ? 'danger' : 'basic'}
                />
                <Input
                  style={styles.input}
                  placeholder="Email giriniz..."
                  size="medium"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  label={'Email'}
                  caption={errors.email}
                  status={errors.email ? 'danger' : 'basic'}
                />
                <Input
                  style={styles.input}
                  placeholder="Password giriniz..."
                  size="medium"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  label={'Şifre'}
                  caption={errors.password}
                  status={errors.password ? 'danger' : 'basic'}
                />
                <Input
                  style={styles.input}
                  placeholder="Pasword Confirm giriniz..."
                  size="medium"
                  value={values.passwordConfirm}
                  onChangeText={handleChange('passwordConfirm')}
                  label={'Şifre Onay'}
                  caption={errors.passwordConfirm}
                  status={errors.passwordConfirm ? 'danger' : 'basic'}
                />
                <View>
                  <Toggle
                    checked={values.agrementConfirm}
                    status="danger"
                    onChange={value => setFieldValue('agrementConfirm', value)}>
                    Kullanıcı Gizlilik Anlaşmasını Kabul Ediyorum.
                  </Toggle>
                  {errors.agrementConfirm && (
                    <Text style={{color: 'red'}}>{errors.agrementConfirm}</Text>
                  )}
                </View>
                <Button
                  onPress={handleSubmit}
                  style={styles.button}
                  status="danger">
                  KAYDET
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    padding: 20,
    minHeight: 125,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFD5CD',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B2E4A',
  },
  form: {
    flex: 1,
    padding: 10,
    marginVertical: 10,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    marginVertical: 10,
  },
  button: {
    marginTop: 15,
    borderRadius: 5,
  },
});

//make this component available to the app
export default FormikYup;
