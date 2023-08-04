import { hostNameUrl } from "../config/api";
import axios from "axios";

const data = {"03-08-2021":{"CORP":1},"30-07-2021":{"CORP":1},"05-08-2021":{"SOVN":1,"CORP":1},"09-08-2021":{"GOVN":1},"06-08-2021":{"SOVN":1}}


export const getAllBonds = async () => {
  try {
    const response = await axios.get(`${hostNameUrl}/bonds`);
    const bonds = response.data;
    return bonds;
  } catch (error) {
    console.error("Error fetching bonds:", error);
    throw error;
  }
};

export const getAllTradesByISIN = async (isin) => {
  try {
    const response = await axios.get(`${hostNameUrl}/trades/isin/${isin}`);
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
    const response = await axios.get(`${hostNameUrl}/bonds/dates/${date}/${daysBefore}/${daysAfter}`);
    const bonds = response.data;
    // const bonds = new Promise((resolve, reject) => {
    //   // Simulating an asynchronous operation (e.g., fetching data from an API)
    //   setTimeout(() => {
    //     resolve(data); // Resolving the promise with an array of values
    //   }, 100);
    // })
    return bonds;
  } catch (error) {
    console.error("Error fetching bonds:", error);
    throw error;
  }
};

export const getMaturedBondsByBondTypeAndDate = async (bondType, date) => {
  try {
    const response = await axios.get(
      `${hostNameUrl}/bonds/bondType/${bondType}/date/${date}`
    );
    const maturedBonds = response.data;
    return maturedBonds;
  } catch (error) {
    console.error("Error fetching matured bonds:", error);
    throw error;
  }
};