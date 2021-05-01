import 'reflect-metadata';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { Car } from './entity/Car';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    const obj = await getRepository(User)
      .createQueryBuilder('usuario')
      .select('usuario')
      /*       .from(User, 'usuario') */
      .where('usuario.id = :id', { id: 2 });

    const user = await obj.getOne();
    const userSql = obj.getSql();

    console.log('user', user);
    console.log('userSql', userSql);

    const update = await getRepository(User)
      .createQueryBuilder()
      .update(User)
      .set({ firstName: 'Sergio', lastName: 'Hidalgo' })
      .where('user.id = :id', { id: 2 })
      .execute();

    console.log(update);

    const userDeleted = await getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('user.id = :id and user.age = :age', { id: 1, age: 23 })
      .execute();
  })
  .catch((error) => console.log(error));
