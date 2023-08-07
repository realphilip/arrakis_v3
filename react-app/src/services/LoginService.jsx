import { hostNameUrl } from "../config/api";
import axios from "axios";


export const SignIn = async (emailReceived, passwordReceived ) => {
    
    try {
      
      
      const response = await axios.post(`${hostNameUrl}/users/signin`, {
        email: emailReceived,
        password: passwordReceived
      });
      localStorage.setItem('jwtToken', response.data);
      if(localStorage.getItem('jwtToken') != null){
        localStorage.setItem('authenticated', 'true');
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching bonds:", error);
      throw error;
    }
  };