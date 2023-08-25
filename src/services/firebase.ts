import * as admin from 'firebase-admin';
require('dotenv').config();
const { FIREBASE_ENCODED } = process.env;

class FB {
  private _bufferAdapter = () => {
    const bufferedKey = Buffer.from(FIREBASE_ENCODED || '', 'base64');
    const stringKey = bufferedKey.toString('utf8');
    return JSON.parse(stringKey);
  };

  private _keys = this._bufferAdapter();

  private _config = {
    project_id: this._keys.project_id as string,
    private_key_id: this._keys.private_key_id,
    private_key: this._keys.private_key,
    clientEmail: this._keys.client_email,
    client_id: this._keys.client_id,
    auth_uri: this._keys.auth_uri,
    token_uri: this._keys.token_uri,
    auth_provider_x509_cert_url: this._keys.auth_provider_x509_cert_url,
    client_x509_cert_url: this._keys.client_x509_cert_url,
    universe_domain: this._keys.universe_domain,
  };

  private _getFirebaseConfig = () => {
    if (
      !this._config ||
      !this._config.project_id ||
      !this._config.private_key ||
      !this._config.clientEmail
    ) {
      throw new Error(
        'No Firebase configuration object provided.' +
          '\n' +
          "Add your web app's configuration object to firebase-config.js"
      );
    } else {
      return this._config;
    }
  };

  app = () => {
    return admin.initializeApp({
      credential: admin.credential.cert(this._getFirebaseConfig()),
    });
  };

  createUser = () => {
    app.auth().createUser({
      email: 'user@example.com',
      emailVerified: false,
      phoneNumber: '+11234567890',
      password: 'secretPassword',
      displayName: 'John Doe',
      photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: false,
    });
  };
}
const app = new FB().app();

export default app;
