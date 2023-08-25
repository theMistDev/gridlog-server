import UserModel from '../entity/user';
import firebaseAdmin from '../services/firebase';

export class UserDataManager {
  private _generateJWT = async (uid: string) => {
    const jwt = await firebaseAdmin.auth().createCustomToken(uid);
    if (jwt) {
      return {
        success: true,
        message: 'successful',
        data: { jwt: jwt },
      };
    } else {
      return {
        success: false,
        message: 'no jwt generated.',
        data: {},
      };
    }
  };

  update = async (field: string, value: string, uid: string) => {
    try {
      const user = await UserModel.findOne({ uid }).lean();
      if (!user || user.uid !== uid) {
        return {
          success: false,
          message: 'unauthorized',
          data: {},
        };
      }
      const firebaseUser = await firebaseAdmin.auth().getUser(uid);

      const jwtData = await this._generateJWT(uid);
      return {
        success: jwtData.success,
        message: jwtData.message,
        data: jwtData.success ? { jwt: jwtData.data.jwt, userData: user } : {},
      };
    } catch (error) {
      return {
        success: false,
        message: `Error: ${error}`,
        data: error,
      };
    }
  };
}
