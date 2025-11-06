import axios from "../../api/config";
import { loadProduct } from "../reducers/productSlice";



export const asyncLoadProducts = () => async(dispatch, getState)=>{
    try {
        
         const {data} = await axios.get("/products")
         dispatch(loadProduct(data))
    } catch (error) {
        console.log(error);
        
    }
}



export const asyncCreateProduct = (product) => async (dispatch) => {
  try {
    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }

    // ✅ Get token from nested "user" object if needed
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    console.log("Token being sent:", token);

    const response = await axios.post(
      "https://e-commerce1-w4y4.onrender.com/api/products",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Product created successfully:", response.data);
    dispatch(asyncLoadProducts());
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
      console.error("Status:", error.response.status);
    } else if (error.request) {
      console.error("No Response:", error.request);
    } else {
      console.error("Request Error:", error.message);
    }
  }
};





// import axios from "axios";
// import { asyncLoadProducts } from "./productActions";

export const asyncUpdateProduct = (id, formData) => async (dispatch, getState) => {
  try {
    const { user } = getState().usersReducer;
    if (!user?.token) return console.error("❌ No token found");

    const config = {
      headers: {
        // Let axios set the Content-Type (including boundary) for multipart/form-data
        Authorization: `Bearer ${user.token}`,
      },
    };

    const res = await axios.put(
      `https://e-commerce1-w4y4.onrender.com/api/products/${id}`,
      formData,
      config
    );

    console.log("✅ Updated product:", res.data);
    dispatch(asyncLoadProducts());
  } catch (error) {
    console.error("❌ Error updating product:", error.response?.data || error.message);
  }
};







export const asyncRemoveProduct = (id) => async (dispatch) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    const response = await axios.delete(
      `https://e-commerce1-w4y4.onrender.com/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Product deleted:", response.data);
    dispatch(asyncLoadProducts());
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
      console.error("Status:", error.response.status);
    } else if (error.request) {
      console.error("No Response:", error.request);
    } else {
      console.error("Request Error:", error.message);
    }
  }
};
