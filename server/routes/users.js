import express from "express";
import {userRegister ,userLogin} from '../controller/users.js';

const route = express.Router();
route.post('/register', userRegister);
route.post('/login',userLogin);

export default route;