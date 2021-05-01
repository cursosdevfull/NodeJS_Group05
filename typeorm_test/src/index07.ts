import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import { Car } from './entity/Car';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    const carRepo = getRepository(Car);
    const userRepo = getRepository(User);

    const car1 = new Car();
    car1.manufacturer = 'Hyundai';
    car1.color = 'whitesmoke';
    car1.description = 'Auto compacto';
    car1.isSold = false;
    car1.year = 2020;

    const car2 = new Car();
    car2.manufacturer = 'Kia';
    car2.color = 'greenlemon';
    car2.description = 'SUV';
    car2.isSold = false;
    car2.year = 2020;

    const user1 = new User();
    user1.firstName = 'Alberto';
    user1.lastName = 'Zapata';
    user1.age = 23;
    user1.cars = [car1, car2];

    const user2 = new User();
    user2.firstName = 'Pedro';
    user2.lastName = 'Garzón';
    user2.age = 28;
    user2.cars = [car2];

    await userRepo.save(user1);
    await userRepo.save(user2);
  })
  .catch((error) => console.log(error));
