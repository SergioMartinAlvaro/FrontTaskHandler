import config from "../config/config";
import axios from "axios";
import { IUser } from "../models/IUser";
import { v4 as uuidv4 } from "uuid";
import { IKey } from "../models/IKey";

const apiUrl = config.apiUrl;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
const api = axios.create({
  baseURL: apiUrl, // Reemplaza con la URL de tu servidor
  withCredentials: true, // Permite enviar cookies y credenciales en la solicitud
});

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const getKeyByUSerID = async (userId: string) => {
  try {
    const response = await api.get(`keys/getKeysByUserId/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllKeys = async () => {
    try {
      const response = await api.get(`keys/getAllKeys`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
};

export const deleteKey = async (keyId: string) => {
  try {
    const response = await api.delete(`keys/deleteKey/${keyId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}


export const createKey = async (key: IKey) => {
  try {
    const response = await api.post(`keys/createKey`, {
      id: uuidv4(),
      text: key.text,
      dateAssigned: null,
      assignedTo: key.assignedTo
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export const assignKeyService = async (keyId: string, userToAssign: IUser) => {
    try {
      const response = await api.put(`keys/assignKey/${keyId}`, {
        id: userToAssign.id,
        name: userToAssign.name,
        password: userToAssign.password,
        role: userToAssign.role,
        dataAllTasksCompleted: userToAssign.dataAllTasksCompleted
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
};
