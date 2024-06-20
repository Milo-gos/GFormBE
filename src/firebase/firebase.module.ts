import { Module } from '@nestjs/common';
import { FirebaseController } from './firebase.controller';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

const firebaseProvider = {
  provide: 'FIREBASE_ADMIN',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      type: configService.get<string>('FIREBASE_TYPE'),
      project_id: configService.get<string>('FIREBASE_PROJECT_ID'),
      private_key_id: configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
      private_key: configService
        .get<string>('FIREBASE_PRIVATE_KEY')
        ?.replace(/\\n/g, '\n'),
      client_email: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      client_id: configService.get<string>('FIREBASE_CLIENT_ID'),
      auth_uri: configService.get<string>('FIREBASE_AUTH_URI'),
      token_uri: configService.get<string>('FIREBASE_TOKEN_URI'),
      auth_provider_x509_cert_url: configService.get<string>(
        'FIREBASE_AUTH_PROVIDE_X509_CERT_URL',
      ),
      client_x509_cert_url: configService.get<string>(
        'FIREBASE_CLIENT_X509_CERT_URL',
      ),
      universe_domain: configService.get<string>('FIREBASE_UNIVERSE_DOMAIN'),
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Module({
  controllers: [FirebaseController],
  providers: [firebaseProvider],
  exports: [firebaseProvider.provide],
})
export class FirebaseModule {}
