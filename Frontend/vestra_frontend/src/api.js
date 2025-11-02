import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api', // backend root
});

// ✅ JWT Token Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;


 //🧡 WISHLIST APIs
export const addWishList = async (item) => {
  return await API.post('/wishlist/add', item);
};
export const removeWishList = async (userEmail, productId) => {
  return await API.delete(`/wishlist/remove/${userEmail}/${productId}`);
};
export const getWishlist = async (userEmail) => {
  return await API.get(`/wishlist/${userEmail}`);
};

// 🛒 CART APIs

export const addToCart = async (cartItem) => {
  return await API.post('/cart/add', cartItem);
};
export const removeFromCart = async (userEmail, productId) => {
  return await API.delete(`/cart/remove/${userEmail}/${productId}`);
};
export const getCartItems = async (userEmail) => {
  return await API.get(`/cart/${userEmail}`);
};

// ✅ Place Order
export const placeOrder = async (orderData) => {
  return await API.post("/orders/save", orderData);
};
export const getUserOrders = async (email) => {
  return await API.get(`/orders/user/${email}`);
};


// ✅ Get All Orders (Admin purpose)
export const getAllOrders = async () => {
  return await API.get("/orders");
};
// ✅ Get Admin Stats
export const getAdminStats = async () => {
  return await API.get("/admin/stats");
};
