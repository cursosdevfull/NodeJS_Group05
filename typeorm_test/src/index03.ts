import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Car } from './entity/Car';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    const carRepo = connection.getRepository(Car);

    const list = await carRepo.find({
      relations: ['user'],
      where: { year: 2019 },
    });
    console.log(list);
  })
  .catch((error) => console.log(error));
