import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import { Car } from './entity/Car';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    const carRepo = getRepository(Car);
    const userRepo = getRepository(User);

    const users = await userRepo.find({ relations: ['cars'] });
    console.log('users', JSON.stringify(users, null, '\t'));

    const cars = await carRepo.find({ relations: ['users'] });
    console.log('cars', JSON.stringify(cars, null, '\t'));
  })
  .catch((error) => console.log(error));
