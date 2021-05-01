import 'reflect-metadata';
import {
  Brackets,
  createConnection,
  getConnection,
  getManager,
  getRepository,
} from 'typeorm';
import { Car } from './entity/Car';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: 2 })
      .getOne();

    console.log('user', user);

    const userParameters = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id')
      .setParameters({ id: 2 })
      //.setParameter("id", 2)
      .getOne();

    console.log('userParameters', userParameters);

    const userAge = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.age >= 20 and user.age<=30')
      .getMany();

    console.log('userAge', userAge);

    const usersInAge = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.age IN (:...ages)', { ages: [20, 25] })
      .getMany();

    console.log('usersInAge', usersInAge);

    const usersOrWhere = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName: 'Sergio' })
      .orWhere('user.age >= :age', { age: 25 })
      .getMany();
    console.log('userOrWhere', usersOrWhere);

    const usersFields = await getRepository(User)
      .createQueryBuilder('user')
      .select(['user.id', 'user.firstName'])
      .where('user.firstName = :firstName', { firstName: 'Sergio' })
      .orWhere('user.age >= :age', { age: 25 })
      .getMany();
    console.log('usersFields', usersFields);

    const usersBrackets = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id > :id', { id: 2 })
      .andWhere(
        new Brackets((qb) => {
          qb.where('user.firstName = :firstName', {
            firstName: 'Andrea',
          }).orWhere('user.age > 40', { age: 30 });
        })
      );

    const objSql = usersBrackets.getSql();
    const results = await usersBrackets.getMany();

    console.log('objSql', objSql);
    console.log('results', results);

    const sumaTotal = await getRepository(User)
      .createQueryBuilder('user')
      .select('SUM(user.age)', 'sum')
      .where('user.age > :age', { age: 20 })
      .getRawOne();

    console.log('sumaTotal', sumaTotal);

    const { suma, total } = await getRepository(User)
      .createQueryBuilder('user')
      .select(['SUM(user.age) suma', 'count(*) total'])
      .where('user.age > :age', { age: 20 })
      .getRawOne();

    console.log('resultados', suma, total);

    const resultadosAgrupadosPorEdad = await getRepository(User)
      .createQueryBuilder('user')
      .select('user.age age')
      .addSelect('SUM(user.age)', 'sum')
      .groupBy('user.age')
      .getRawMany();

    console.log('resultadosAgrupadosPorEdad', resultadosAgrupadosPorEdad);

    const usersHaving = await getRepository(User)
      .createQueryBuilder('user')
      .having('user.id > :id', { id: 2 })
      .getRawMany();

    console.log('usersHaving', usersHaving);

    const usersOrder = await getRepository(User)
      .createQueryBuilder('user')
      .orderBy('user.age', 'DESC')
      .addOrderBy('user.firstName', 'ASC')
      .getRawMany();

    console.log('usersOrder', usersOrder);

    const usersLimit = await getRepository(User)
      .createQueryBuilder('user')
      .orderBy('user.age', 'DESC')
      .addOrderBy('user.firstName', 'ASC')
      .limit(2)
      .getRawMany();

    console.log('usersLimit', usersLimit);

    const usersOffset = await getRepository(User)
      .createQueryBuilder('user')
      .orderBy('user.age', 'DESC')
      .addOrderBy('user.firstName', 'ASC')
      .limit(2)
      .offset(2)
      .getRawMany();

    console.log('usersOffset', usersOffset);

    const usersLeftJoin = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.cars', 'cars')
      .getSql();

    console.log(usersLeftJoin);

    const usersPagination = await getRepository(User)
      .createQueryBuilder('user')
      .skip(2)
      .take(1)
      .getMany();

    console.log('usersPagination', usersPagination);

    const entityManager = getManager();
    const resultados = await entityManager.query('select * from car');
    console.log('resultados', resultados);

    const resultadosSP = await entityManager.query('call listado(1)');
    console.log('resultadosSP', resultadosSP);
  })
  .catch((error) => console.log(error));
