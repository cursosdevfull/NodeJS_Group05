import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import { Car } from './entity/Car';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    const userRepo = getRepository(User);
    const carRepo = getRepository(Car);

    const user = await userRepo.findOne({ id: 3 });

    const car = new Car();
    car.manufacturer = 'Daewoo';
    car.description = '----';
    car.color = 'skyblue';
    car.year = 2000;
    car.isSold = false;
    car.user = user;

    await carRepo.save(car);
    console.log('Car inserted', car);
  })
  .catch((error) => console.log(error));
