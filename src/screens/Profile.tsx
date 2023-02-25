import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from 'native-base';

import { ScreenHeader } from '@components/ScreenHearder';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

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
                source={{ uri: 'https://github.com/lilicrst.png' }}
                alt='Foto do usuário'
                size={PHOTO_SIZE}
              />
          }

          <TouchableOpacity>
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
          <Heading color='gray.100' fontSize='md' mb={2} >
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