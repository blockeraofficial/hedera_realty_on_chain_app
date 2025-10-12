import { useEffect, useState } from "react";
import axios from "axios";

// const ACCOUNT_URL  = "https://testnet.mirrornode.hedera.com/api/v1/accounts/0.0.6853757";
// const CONTRACT_URL = "https://testnet.mirrornode.hedera.com/api/v1/accounts/0.0.6873175";
// const TARGET_TOKEN = "0.0.6873059";

// BACKEND CALLS
// burda call at

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  // baseURL: "https://stellar-kickstart-backend.onrender.com/api",
});

const ResponseInterceptor = (response) => {
  return response.data;
};

const RequestInterceptor = async (requestConfig) => {
  /* requestConfig.headers.Authorization = "Bearer ABCD1234"; */
  return requestConfig;
};

API.interceptors.request.use(RequestInterceptor);

API.interceptors.response.use(ResponseInterceptor, (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      // Unauthorized
      return Promise.reject(error);
    }
    return Promise.reject(error.response.data.message);
  } else if (error.request) {
    return Promise.reject(error);
  } else {
    return Promise.reject(error);
  }
});

const getStellarContractAssets = async () => {
  const assets = await API.get("/contract-assets");
  return assets;
};

// Do it later

// const buildTrustline = async () => {
//   const trustlineResponse = await API.get("/build-trustline")
//   return trustlineResponse;
// }

export { API, getStellarContractAssets };
