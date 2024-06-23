import axios from 'axios';

const API_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach the JWT token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (credentials) => {
  return axiosInstance.post('/auth/signin', credentials); 
};

export const addAdmin = async (adminData) => {
  const key = 'admin123';
  return axiosInstance.post(`/auth/admin/signup/${key}`, adminData);
};

export const findUserById = async (userId) => {
  return axiosInstance.get(`/api/users/user/6`);
};

export const updateUser = async (userId, userData) => {
  return axiosInstance.put(`/api/users/user/${userId}`, userData);
};

export const signUpCustomer = async (customerData) => {
  return axiosInstance.post('/auth/signup', customerData);
};

export const addVehicle = async (vehicleData) => {
  return axiosInstance.post('/api/vehicles/admin/addvehicle', vehicleData);
};

export const getVehicleById = async (vehicleId) => {
  return axiosInstance.get(`/api/vehicles/public/${vehicleId}`);
};

export const getAllVehicles = async () => {
  return axiosInstance.get('/api/vehicles/public/allvehicles');
};

export const updateVehicle = async (vehicleId, vehicleData) => {
  return axiosInstance.put(`/api/vehicles/admin/${vehicleId}`, vehicleData);
};

export const deleteVehicle = async (vehicleId) => {
  return axiosInstance.delete(`/api/vehicles/admin/${vehicleId}`);
};

export const suggestVehicle = async (vehicleInput) => {
  return axiosInstance.get('/api/vehicles/public/suggest', {
    params: vehicleInput,
  });
};

export const addLicense = async (licenseData) => {
  return axiosInstance.post('/api/licences/addlicence', licenseData);
};

export const addServiceDetails = async (serviceDetailsData) => {
  return axiosInstance.post(
    '/api/serviceDetails/addServiceDetails',
    serviceDetailsData
  );
};

export const addInsuranceDetails = async (insuranceDetailsData) => {
  return axiosInstance.post(
    '/api/insuranceDetails/addInsuranceDetails',
    insuranceDetailsData
  );
};

export const addOrder = async (orderData) => {
  return axiosInstance.post('/api/orders/user/createOrder', orderData);
};

export const findOrderById = async (orderId) => {
  return axiosInstance.get(`/api/orders/user/${orderId}`);
};

export const getAllOrders = async () => {
  return axiosInstance.get('/api/orders/admin/all');
};

export const updateOrderByUser = async (orderId, orderData) => {
  return axiosInstance.put(`/api/orders/user/${orderId}`, orderData);
};

export const updateOrderByAdmin = async (orderId, orderData) => {
  return axiosInstance.put(`/api/orders/admin/updateorder`, orderData);
};

export const deleteOrderByUser = async (orderId, userId) => {
  return axiosInstance.delete(`/api/orders/user/${orderId}/${userId}`);
};

export const deleteOrderByAdmin = async (orderId) => {
  return axiosInstance.delete(`/api/orders/admin/${orderId}`);
};
