import { User } from '../entity/user';
import firebaseAdmin from '../services/firebase';

export class AuthManager {
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

  loginOnServer = async (
    uid: string,
    token: string,
    emailVerified: boolean
  ) => {
    try {
      const loggedUser = await User.findOneBy({ uid });
      if (!loggedUser || loggedUser.uid !== uid) {
        return {
          success: false,
          message: 'unauthorized Staff',
          data: {},
        };
      }
      const validation = await firebaseAdmin.auth().verifyIdToken(token);
      if (uid === validation.uid) {
        //email verification
        if (loggedUser.emailVerified !== emailVerified) {
          loggedUser.emailVerified = emailVerified;
          await loggedUser.save();

          return {
            success: true,
            message: 'user UID is valid',
            data: { jwt: token, user: loggedUser },
          };
        } else
          return {
            success: true,
            message: 'user UID is valid',
            data: { jwt: token, user: loggedUser },
          };
      } else {
        return {
          success: false,
          message: 'Unauthorised user',
          data: {},
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Error: ${error}`,
        data: error,
      };
    }
  };

  registerOnServer = async (
    email: string,
    firstName: string,
    lastName: string,
    department: string,
    level: string
  ) => {
    try {
      if (!email || !firstName || !lastName || !department || !level) {
        return {
          success: false,
          message: 'Cannot validate user details',
          data: {},
        };
      }
      const userRecord = await firebaseAdmin.auth().createUser({
        email: email,
        displayName: `${firstName} ${lastName}`,
        password: 'Password',
        emailVerified: false,
      });

      if (!userRecord) {
        //handle errors
      }
      const newUser = new User();
      newUser.uid = userRecord.uid;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.emailVerified = userRecord.emailVerified;
      newUser.disabled = userRecord.disabled;
      await newUser.save();

      const jwtData = await this._generateJWT(userRecord.uid);
      return {
        success: jwtData.success,
        message: jwtData.message,
        data: jwtData.success ? { staff: newUser } : {},
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
