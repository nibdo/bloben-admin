import { AxiosResponse } from 'axios';

import { APP_API_VERSION_1 } from '../data/constants';
import { CommonResponse } from '../data/interface';
import {
  EnableTwoFactorRequest,
  GetTwoFactorSecretResponse,
  LoginWithTwoFactorAdminResponse,
  LoginWithTwoFactorRequest,
} from '../bloben-interface/2fa/2fa';

import Axios, { config } from '../lib/Axios';

const V1_BASE_PATH = `/admin/${APP_API_VERSION_1}/auth/two-factor`;

const AdminApi = {
  loginWith2FA: async (
    data: LoginWithTwoFactorRequest
  ): Promise<AxiosResponse<LoginWithTwoFactorAdminResponse>> => {
    return Axios.post(`${V1_BASE_PATH}/login`, data, config);
  },
  generate2FA: async (): Promise<AxiosResponse<GetTwoFactorSecretResponse>> => {
    return Axios.post(`${V1_BASE_PATH}`, {});
  },
  delete2FA: async (): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.delete(`${V1_BASE_PATH}`, {});
  },
  enable2FA: async (
    data: EnableTwoFactorRequest
  ): Promise<AxiosResponse<CommonResponse>> => {
    return Axios.post(`${V1_BASE_PATH}/enable`, data);
  },
};

export default AdminApi;
