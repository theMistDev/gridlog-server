import axios, { AxiosError, AxiosResponse } from 'axios';

export class Siri {
  private _publicAppToken = process.env.WAFCONNECT_PUBLIC_APP_TOKEN as string;
  private _vinAPI = process.env.WAFCONNECT_VIN_API as string;

  private _privateOptions = {
    method: 'GET',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': this._publicAppToken,
    },
  };

  private _publicOptions = {
    method: 'GET',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  private _get = async (url: string) => {
    try {
      const response = await axios.get(url, this._privateOptions);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  };

  public get = async (url: string) => {
    try {
      const response = await axios.get(url, this._publicOptions);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  };

  getVIN = async (vin: string) => {
    const url = `${this._vinAPI}/vin/${vin}`;
    return await this._get(url);
  };
}
