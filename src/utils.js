import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

export const generateProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        code: faker.string.nanoid(10),
        status: true,
        price: parseFloat(faker.commerce.price()),
        stock: parseInt(faker.number.int({ min: 20, max: 100 })),
        category: faker.commerce.department(),
        thumbnail: [faker.image.url()],
    };
};

export const generateRandomString = (num) => {
    return [...Array(num)].map(() => {
        const randomNum = ~~(Math.random() * 36);
        return randomNum.toString(36);
    })
        .join('')
        .toUpperCase();
}

export const createHash = password => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds)
}