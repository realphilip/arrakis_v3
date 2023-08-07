import { HttpService } from "./HttpService";
import axios from 'axios';

const data = {"03-08-2021":{"CORP":1},"30-07-2021":{"CORP":1},"05-08-2021":{"SOVN":1,"CORP":1},"09-08-2021":{"GOVN":1},"06-08-2021":{"SOVN":1}}
const hostNameUrl = "http://localhost:8080";

let jwtTokenService = null;
let headers = null;
export const setJwtToken = (token) => {
  jwtTokenService = token;
  headers = {
    'Authorization': `Bearer ${jwtTokenService}`,
    'Content-Type': 'application/json', // Add other headers as needed
  };

}

export const getJwtToken = () => {
  return jwtTokenService;
}


export const getAllBonds = async () => {
  try {
    const response = await axios.get(`${hostNameUrl}/bonds`, { headers });
    const bonds = response.data;
    return bonds;
  } catch (error) {
    console.error("Error fetching bonds:", error);
    throw error;
  }
};

export const getAllTradesByISIN = async (isin) => {
  try {
    const response = await axios.get(`${hostNameUrl}/trades/isin/${isin}`, { headers });
    const trades = response.data;
    return trades;
  } catch (error) {
    console.error("Error fetching trades:", error);
    throw error;
  }
};

export const getAllBondsForBusinessDaysBeforeAndAfter = async (date) => {
  const daysBefore = 5;
  const daysAfter = 5;
  try {
    const response = await axios.get(`${hostNameUrl}/bonds/dates/${date}/${daysBefore}/${daysAfter}`, { headers });
    const bonds = response.data;
    return bonds;
  } catch (error) {
    console.error("Error fetching bonds:", error);
    throw error;
  }
};

export const getUserData = async () => {
  
  try {
    const response = await axios.get(`${hostNameUrl}/users/getuser`, { headers });
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}

export const getMyBondsData = async (date) => {
  const daysBefore = 5;
  const daysAfter = 5;
  try {
    const response = await axios.get(`${hostNameUrl}/bonds/email/dates/${date}/${daysBefore}/${daysAfter}`, { headers });
    const bonds = response.data;
    return bonds;
  } catch (error) {
    console.error("Error fetching bonds:", error);
    throw error;
  }
}

export const getMaturedBondsByBondTypeAndDate = async (bondType, date) => {
  try {
    const response = await axios.get(
      `${hostNameUrl}/bonds/bondType/${bondType}/date/${date}`, { headers }
    );
    const maturedBonds = response.data;
    return maturedBonds;
  } catch (error) {
    console.error("Error fetching matured bonds:", error);
    throw error;
  }
};

export const getIssuerNameByID = async (id) => {
  try {
    const response = await axios.get(`${hostNameUrl}/issuer/${id}`, { headers });
    const issuerName = response.data;
    return issuerName;
  } catch (error) {
    console.error("Error fetching issuer name:", error);
    throw error;
  }
};

export const getBondHolderNameById = async (id) => {
  try {
    const response = await axios.get(`${hostNameUrl}/bondHolderId/${id}`, { headers });
    const issuerName = response.data;
    return issuerName;
  } catch (error) {
    console.error("Error fetching bond holder name:", error);
    throw error;
  }
};

export const getStatsByBondHolderID = async (bondHolderId) => {
  try {
    const response = await axios.get(`${hostNameUrl}/stats/bondHolderId/${bondHolderId}`, { headers });
    const stats = response.data;
    return stats;
  } catch (error) {
    console.error("Error fetching bond holder stats:", error);
    throw error;
  }
};

export const triggerBondRedemption = async (isin) => {
  try {
    const response = await axios.patch(`${hostNameUrl}/bonds/redemption/${isin}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error triggering bond redemption:", error);
    throw error;
  }
};