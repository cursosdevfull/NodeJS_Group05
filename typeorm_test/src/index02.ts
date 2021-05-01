import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Car } from './entity/Car';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    // const userRepo = connection.getRepository(User);
    const carRepo = connection.getRepository(Car);

    const user = new User();
    user.firstName = 'Carmela';
    user.lastName = 'Nieto';
    user.age = 35;

    //const userInserted = await userRepo.save(user);

    const car = new Car();
    car.manufacturer = 'Datsun';
    car.description = 'SUV';
    car.color = 'brown';
    car.year = 2018;
    car.isSold = true;
    car.user = user;

    const carInserted = await carRepo.save(car);

    console.log('carInserted', carInserted);
  })
  .catch((error) => console.log(error));
