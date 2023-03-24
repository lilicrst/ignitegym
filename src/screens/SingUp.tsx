import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 caracteres'),
  password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'A confirmação da senha não confere')
});

export function SingUp() {

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSingUp({ name, email, password, password_confirm }: FormDataProps) {
    console.log({name, email, password, password_confirm});
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
      <VStack flex={1} px={9} >
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode='contain'
          position="absolute"
        />

        <Center my={24} >
          <LogoSvg />
          <Text color="gray.100" fontSize="sm" >
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center mt={10} >
          <Heading color="gray.100" fontSize="xl" fontFamily="heading" mb={6} >
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name='name'            
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='email'            
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            rules={{
              required: 'Informe a senha'
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                secureTextEntry
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password_confirm'
            rules={{
              required: 'Informe a senha novamente'
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirme a senha'
                secureTextEntry
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSingUp)}
                returnKeyType='send'
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title='Criar e acessar'
            onPress={handleSubmit(handleSingUp)}
          />
        </Center>

        <Button
          title='Voltar para o login'
          variant="outline"
          mt={16}
          onPress={handleGoBack}
        />

      </VStack>
    </ScrollView>
  );
}