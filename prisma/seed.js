import { faker } from '@faker-js/faker';

for (let i = 0; i <120; i++) {
  
  console.log(faker.datatype.boolean())
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
    employee_id: "",
  };
};

export function createEntity(){
  const entity = {
    id: faker.string.uuid(),
    legal_name: faker.company.name(),
    tax_id: faker.lorem.word({ length: { min: 12, max: 15 }, strategy: 'fail' }),
    address_line_one: faker.location.streetAddress() ,
    address_line_two: "",
    subscription_status: "Active",
    // Estara relacionado con User Branch y Position
  }
  return entity;
};

export function createBranch(){
  const branch = {
    id: faker.string.uuid(),
    name: faker.company.name(),
    address_line_one: faker.location.streetAddress() ,
    address_line_two: "",
    enitity_id: "",
    // Estara relacionado con Entity, Shift, Area, Employee
  }
  return branch;
};

export function createPosition(){
  const position ={
    id: faker.string.uuid(),
    title: faker.lorem.word({ length: { min: 3, max: 10 }, strategy: 'closest' }),
    description: faker.lorem.sentence(),
    entity_id: "",
  };
};

export function createShift(){
  const shift ={
    id: faker.string.uuid(),
    name: faker.lorem.word({ length: { min: 3, max: 10 }, strategy: 'closest' }),
    branch_id: "",
    start_time: faker.date.anytime(),
    end_time: faker.date.anytime(),
    hours: faker.number.float({ fractionDigits: 2 }),
  };
};

export function createArea(){
  const area ={
    id: faker.string.uuid(),
    name: faker.lorem.word({ length: { min: 3, max: 10 }, strategy: 'closest' }),
    branch_id: "",
  };
 };

export function createEmployee(){
 const employee ={
  id: faker.string.uuid(),
  email: faker.internet.email(),
  first_name: faker.person.firstName(),
  middle_name: faker.person.middleName(),
  last_name: faker.person.lastName(), 
  branch_id: "",          
  area_id: "",                    
  position_id: "",                
  shift_id: "",                   
  manager_id: "",                                             
  documents: "",             
  address_line_one: faker.location.direction(),     
  address_line_two: faker.location.direction(),     
  address_city: faker.location.city(),         
  address_state: faker.location.state(),        
  address_zip_code: faker.location.zipCode(),     
  is_manager: faker.datatype.boolean(),                    
  telephone_number: faker.phone.number(),     
  tax_id: faker.lorem.word({ length: { min: 12, max: 15 }, strategy: 'closest' }),             
  date_of_birth: faker.date.birthdate(),         
  city_of_birth: faker.location.city(),        
  gender: faker.person.gender(),              
  study:  faker.lorem.word({ length: { min: 3, max: 30 }, strategy: 'closest' }),              
  id_document_type: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),       
  id_document_number: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),  
  citizen_id_number: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),   
  ssn: faker.lorem.word({ length: { min: 5, max: 20 }, strategy: 'closest' }),                  
  ssn_issue_date: faker.date.anytime(),       
  pay_cadence: faker.lorem.word({ length: { min: 3, max: 10 }, strategy: 'closest' }),        
  daily_wage: faker.number.bigInt({ min: 2n, max: 12n }),           
  attendance_bonus: faker.number.bigInt({ min: 2n, max: 12n }),     
  other_bonus: faker.number.bigInt({ min: 2n, max: 12n }),         
  incentives: faker.number.bigInt({ min: 2n, max: 12n }),           
  complimentary_payroll: faker.number.bigInt({ min: 2n, max: 15n }), 
  regular_payroll:  faker.number.bigInt({ min: 2n, max: 15n }),    
  bank_name: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),          
  bank_account_number: faker.finance.accountNumber(),   
  date_of_hire: faker.date.anytime(),        
  date_of_termination: "", 
  status: faker.lorem.word({ length: { min: 3, max: 10 }, strategy: 'closest' }),          
  housing_credit_number: faker.datatype.boolean(),
  has_social_security: faker.datatype.boolean(),
  has_housing_credit: faker.datatype.boolean(),
  id_document_copy: faker.datatype.boolean(),        
  citizen_id_copy: faker.datatype.boolean(),      
  job_application_form: faker.datatype.boolean(),  
  proof_of_address: faker.datatype.boolean(),      
  proof_of_studies: faker.datatype.boolean(),               
 };
};

export function createEmployeeDocument(){
  const employeeDocument = {
    id: faker.string.uuid(),
    employee_id: "",
    name: faker.lorem.word(),
    url: faker.internet.url(),
    description: faker.lorem.sentence(),
    // Estara relacionado con Employee
  }
  return employeeDocument;
};




