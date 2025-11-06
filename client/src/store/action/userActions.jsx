// import axios from '../../api/config'
import { loadUser, removeUser} from '../reducers/userSlice';

// Register
import axios from "axios";
// import { loadUser } from "./userActions"; // adjust import

const API_URL = "https://e-commerce1-w4y4.onrender.com/api/auth"; // change to your deployed backend URL

export const asyncRegisterUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/register`, user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(loadUser(data));
    console.log("✅ User registered:", data);
  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};

export const asyncLoginUsers = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(loadUser(data));
    console.log("✅ User logged in:", data);
  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};



export const asyncCurrentUsers = () => async (dispatch) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(loadUser(storedUser));
    } else {
      console.log("No user logged in");
    }
  } catch (error) {
    console.error("Error loading current user:", error);
  }
};



export const asyncLogoutUsers = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeUser());
    console.log("User logged out");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
