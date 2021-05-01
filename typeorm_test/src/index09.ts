import 'reflect-metadata';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { Car } from './entity/Car';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    /*     const userRepo = getRepository(User)
    await userRepo.find() */

    // await getRepository(User).find()
    const user = await getRepository(User)
      .createQueryBuilder('usuario') // select * from user as usuario
      .where('usuario.id = :id', { id: 2 })
      .getSql();
    // .getOne();

    console.log('user', user);

    const obj = getConnection()
      .createQueryBuilder()
      .select(['usuario.firstName', 'usuario.lastName'])
      .from(User, 'usuario')
      .where('usuario.id = :id', { id: 2 });

    const userOne = await obj.getOne();
    const userOneSQL = obj.getSql();

    console.log('userOne', userOne);
    console.log('userOneSQL', userOneSQL);
  })
  .catch((error) => console.log(error));
