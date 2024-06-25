// src/scripts/insertAdminUser.ts

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const insertAdminUser = async () => {
  try {
    const response = await axios.post(`${process.env.SERVER_URL || 'http://localhost:3000'}/api/v1/users/register`, {
      empCode: "DL001",
      name: "admin",
      email: "admin@gmail.com",
      mobile: "8686897800",
      username: "admin",
      password: "admin",
      role: "admin"
    });
    console.log(response.data);
  } catch (error:any) {
    console.error('Error inserting admin user:', error.response ? error.response.data : error.message);
  }
};

insertAdminUser();
