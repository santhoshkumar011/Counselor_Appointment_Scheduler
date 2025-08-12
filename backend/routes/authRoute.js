import express from 'express'
import {CreateUser} from '../controllers/authController/createUserController.js'
import { GetUser } from '../controllers/authController/getUserController.js';
import {GetAllUsers} from '../controllers/authController/getAllUserController.js'


const route = express.Router()

route.post('/createUser', CreateUser);
route.get('/getUser', GetUser);
route.get('/getAllUser', GetAllUsers);

export default route;