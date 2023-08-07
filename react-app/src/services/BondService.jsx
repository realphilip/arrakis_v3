import { hostNameUrl } from "../config/api";
import { HttpService } from "./HttpService";

const data = {"03-08-2021":{"CORP":1},"30-07-2021":{"CORP":1},"05-08-2021":{"SOVN":1,"CORP":1},"09-08-2021":{"GOVN":1},"06-08-2021":{"SOVN":1}}


export const getAllBonds = async () => {
  try {
    const response = await HttpService.get(`/bonds`);
    const bonds = response.data;
    return bonds;
  } catch (error) {
    console.error("Error fetching bonds:", error);
    throw error;
  }
};

export const getAllTradesByISIN = async (isin) => {
  try {
    const response = await HttpService.get(`${hostNameUrl}/trades/isin/${isin}`);
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
    const response = await HttpService.get(`/bonds/dates/${date}/${daysBefore}/${daysAfter}`);
    const bonds = response.data;
    return bonds;
  } catch (error) {
    console.error("Error fetching bonds:", error);
    throw error;
  }
};

export const getMyBondsData = async (date) => {
  const daysBefore = 5;
  const daysAfter = 5;
  try {
    const response = await HttpService.get(`/bonds/email/dates/${date}/${daysBefore}/${daysAfter}`);
    const bonds = response.data;
    return bonds;
  } catch (error) {
    console.error("Error fetching bonds:", error);
    throw error;
  }
}

export const getMaturedBondsByBondTypeAndDate = async (bondType, date) => {
  try {
    const response = await HttpService.get(
      `${hostNameUrl}/bonds/bondType/${bondType}/date/${date}`
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
    const response = await HttpService.get(`${hostNameUrl}/issuer/${id}`);
    const issuerName = response.data;
    return issuerName;
  } catch (error) {
    console.error("Error fetching issuer name:", error);
    throw error;
  }
};

export const getBondHolderNameById = async (id) => {
  try {
    const response = await HttpService.get(`${hostNameUrl}/bondHolderId/${id}`);
    const issuerName = response.data;
    return issuerName;
  } catch (error) {
    console.error("Error fetching bond holder name:", error);
    throw error;
  }
};

export const getStatsByBondHolderID = async (bondHolderId) => {
  try {
    const response = await HttpService.get(`${hostNameUrl}/stats/bondHolderId/${bondHolderId}`);
    const stats = response.data;
    return stats;
  } catch (error) {
    console.error("Error fetching bond holder stats:", error);
    throw error;
  }
};

export const triggerBondRedemption = async (isin) => {
  try {
    const response = await HttpService.patch(`/bonds/redemption/${isin}`);
    return response.data;
  } catch (error) {
    console.error("Error triggering bond redemption:", error);
    throw error;
  }
};