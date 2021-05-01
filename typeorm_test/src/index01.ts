import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Car } from './entity/Car';

createConnection()
  .then(async (connection) => {
    const car = new Car();
    car.manufacturer = 'Kia';
    car.description = 'Un auto muy económico';
    car.year = 2020;
    car.color = 'red wine';
    car.isSold = false;

    const carRepo = connection.getRepository(Car);

    /*     const carInserted = await carRepo.save(car);
    console.log('carInserted', carInserted); */

    const allCars = await carRepo.find();
    console.log('allCars', allCars);

    const firstCar = await carRepo.findOne();
    console.log('fistCar', firstCar);

    const kiaCar = await carRepo.find({ manufacturer: 'Kia' });
    console.log('kiaCar', kiaCar);

    const carsByYear = await carRepo.find({ year: 2020 });
    console.log('carsByYear', carsByYear);

    const carsSold = await carRepo.find({ isSold: true });
    console.log('carsSold', carsSold);

    const [records, carCount] = await carRepo.findAndCount();
    console.log('records', records);
    console.log('carCount', carCount);
  })
  .catch((error) => console.log(error));
