import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import { Car } from './entity/Car';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    const carRepo = getRepository(Car);
    const userRepo = getRepository(User);

    const car1 = new Car();
    car1.manufacturer = 'Toyota';
    car1.description = '';
    car1.color = 'red';
    car1.year = 2020;
    car1.isSold = true;

    const car2 = new Car();
    car2.manufacturer = 'Chevrolet';
    car2.description = '';
    car2.color = 'orange';
    car2.year = 2022;
    car2.isSold = true;

    /*     await carRepo.save(car1);
    await carRepo.save(car2); */

    const user = new User();
    user.firstName = 'Evelyn';
    user.lastName = 'Nieto';
    user.age = 10;
    user.cars = [car1, car2];

    await userRepo.save(user);
  })
  .catch((error) => console.log(error));
