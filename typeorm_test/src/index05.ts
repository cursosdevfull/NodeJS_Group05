import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import { Car } from './entity/Car';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    const carRepo = getRepository(Car);
    const userRepo = getRepository(User);

    const user = await userRepo.findOne({ id: 1 });

    const car = new Car();
    car.manufacturer = 'Toyota';
    car.description = '';
    car.color = 'red';
    car.year = 2020;
    car.isSold = true;
    car.user = user;

    await carRepo.save(car);
    console.log('car inserted', car);
  })
  .catch((error) => console.log(error));
