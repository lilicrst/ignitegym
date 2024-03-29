import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHearder';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/lilicrst.png');

  const toast = useToast();

  async function handleUserPhotoSelect() {

    try {
      setPhotoIsLoading(true);

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if(photoInfo.size && (photoInfo.size / 1024 / 1024 > 5)) {
          return toast.show({
            title: "Use uma imagem de até 5MB",
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }      

    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }


  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10} >
          {
            photoIsLoading
              ?
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded='full'
                startColor='gray.500'
                endColor='gray.400'
              />
              :
              <UserPhoto
                source={{ uri: userPhoto }}
                alt='Foto do usuário'
                size={PHOTO_SIZE}
              />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect} >
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8} >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder='Nome'
            bg='gray.600'
          />
          <Input
            placeholder='E-mail'
            bg='gray.600'
            isDisabled
          />
        </Center>

        <VStack px={10} mt={8} mb={9} >
          <Heading color='gray.100' fontSize='md' fontFamily='heading' mb={2} >
            Alterar senha
          </Heading>

          <Input
            placeholder='Senha antiga'
            bg='gray.600'
            secureTextEntry
          />
          <Input
            placeholder='Nova senha'
            bg='gray.600'
            secureTextEntry
          />
          <Input
            placeholder='Confirme a nova senha'
            bg='gray.600'
            secureTextEntry
          />

          <Button
            title='Atualizar'
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}