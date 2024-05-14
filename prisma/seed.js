import { faker } from '@faker-js/faker';

for (let i = 0; i <120; i++) {
  
  console.log(faker.person.lastName())
}

export function createUser(){
  const   user = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    first_name: faker.person.firstName(),
    middle_name: faker.person.middleName(),
    last_name: faker.person.lastName(),
    avatar_url: faker.image.avatar(),
    entity_id: faker.string.uuid(),
    employee_id: faker.string.uuid(),
  }
};




