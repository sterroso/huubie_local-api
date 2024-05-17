import { faker } from '@faker-js/faker';
import fs from 'node:fs'

// Funcion para generar entidades
export function createEntity() {
  const id = faker.string.uuid();
  const entity = {
    id: id,
    legal_name: faker.company.name(),
    tax_id: faker.string.alphanumeric({ length: { min: 12, max: 13 } }),
    address_line_one: faker.location.streetAddress() ,
    address_line_two: "",
    subscription_status: "Active",
  };
  return entity;
}


// Función para generar USERS
export function createUser(entityId, employee) {
  const user = {
    id: faker.string.uuid(),
    email: employee?.email || faker.internet.email(),
    first_name: employee?.first_name || faker.person.firstName(),
    middle_name: employee?.middle_name || faker.person.middleName(),
    last_name: employee?.last_name || faker.person.lastName(),
    avatar_url: employee?.avatar_url || faker.image.avatarLegacy(),
    entity_id: entityId,
    employee_id: employee?.id || "",
  };
  return user;
}

// Función para generar sucursales (branches)
export function createBranch(entityId) {
  const id = faker.string.uuid();
  const branch = {
    id: id,
    entity_id: entityId,
    name: faker.company.name(),
    address_line_one: faker.location.streetAddress() ,
    address_line_two: "",
  };
  return branch;
}

// Función para generar empleados
export function createEmployee(branchId, areaId, shiftId, positionId, isManager, managerId) {
  const id = faker.string.uuid();
  const myManager = isManager ? "" : faker.helpers.arrayElement(managerId);
  
  const employee = {
    id: id,
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    middle_name: faker.person.middleName(),
    last_name: faker.person.lastName(), 
    branch_id: branchId,          
    area_id: areaId,                    
    position_id: positionId,                
    shift_id: shiftId,                   
    manager_id: myManager,               
    address_line_one: faker.location.direction(),     
    address_line_two: faker.location.direction(),     
    address_city: faker.location.city(),         
    address_state: faker.location.state(),        
    address_zip_code: faker.location.zipCode(),     
    is_manager: isManager,                    
    telephone_number: faker.phone.number(),     
    tax_id: faker.database.mongodbObjectId(),           
    date_of_birth: faker.date.birthdate(),//TODO: Quitar la hora de la fecha       
    city_of_birth: faker.location.city(),        
    gender: faker.person.gender(),              
    study:  faker.lorem.word({ length: { min: 3, max: 30 }, strategy: 'closest' }),              
    id_document_type: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),       
    id_document_number: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),  
    citizen_id_number: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),   
    ssn: faker.lorem.word({ length: { min: 5, max: 20 }, strategy: 'closest' }),                  
    ssn_issue_date: faker.date.anytime(),   //TODO: Quitar la hora de la fecha       
    pay_cadence: faker.lorem.word({ length: { min: 3, max: 10 }, strategy: 'closest' }),        
    daily_wage: faker.number.bigInt({ min: 2n, max: 12n }),      //TODO: Investigar como se guardara el salario y actualizar con otro metodo de faker     
    attendance_bonus: faker.number.bigInt({ min: 2n, max: 12n }),    //TODO: Investigar como se guardara el salario y actualizar con otro metodo de faker
    other_bonus: faker.number.bigInt({ min: 2n, max: 12n }),        //TODO: Investigar como se guardara el salario y actualizar con otro metodo de faker
    incentives: faker.number.bigInt({ min: 2n, max: 12n }),      //TODO: Investigar como se guardara el salario y actualizar con otro metodo de faker
    complimentary_payroll: faker.number.bigInt({ min: 2n, max: 15n }), //TODO: Investigar como se guardara el salario y actualizar con otro metodo de faker
    regular_payroll:  faker.number.bigInt({ min: 2n, max: 15n }),    //TODO: Investigar como se guardara el salario y actualizar con otro metodo de faker
    bank_name: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),          
    bank_account_number: faker.finance.accountNumber(),   
    date_of_hire: faker.date.anytime(), //TODO: Quitar la hora de la fecha       
    date_of_termination: "", 
    status: (Math.random() < 0.9) ? "Activo" : "Inactivo",          
    housing_credit_number: faker.datatype.boolean(),
    has_social_security: faker.datatype.boolean(),
    has_housing_credit: faker.datatype.boolean(),
    id_document_copy: faker.datatype.boolean(),        
    citizen_id_copy: faker.datatype.boolean(),      
    job_application_form: faker.datatype.boolean(),  
    proof_of_address: faker.datatype.boolean(),      
    proof_of_studies: faker.datatype.boolean(),    
  };
  return employee;
}

// Funcion para generar documentos de empleados
export function createEmployeeDocument(employeeId) {
  const id = faker.string.uuid();
  const employeeDocument = {
    id: id,
    employee_id: employeeId,
    name: faker.lorem.word(),
    url: faker.internet.url(),
    description: faker.lorem.sentence(),
  };
  return employeeDocument;
}


// Funcion para generar shifts (shifts -> turnos)
export function createShift(branchId) {
  const id = faker.string.uuid(); 
  let shiftName = "";
  let startTime = "";
  let endTime = "";

   if (Math.random() < 0.4) {
    shiftName = "Matutino";
    startTime = "1970-01-01 07:00:00.000"; 
    endTime = "1970-01-01 14:00:00.000"; 
  } else if (Math.random() < 0.7) { 
    shiftName = "Vespertino";
    startTime = "1970-01-01 14:00:00.000"; 
    endTime = "1970-01-01 21:00:00.000"; 
  } else { 
    shiftName = "Nocturno";
    startTime = "1970-01-01 21:00:00.000"; 
    endTime = "1970-01-01 04:00:00.000"; 
  }

  const shift = {
    id: id,
    name: shiftName,
    branch_id: branchId,
    start_time: startTime,
    end_time: endTime,
    hours: 7,
  };
  return shift;
}


// Funcion para generar positions
function createPosition(entityId) {
  const id = faker.string.uuid();
  let positions = ["Mesero", "Cocinero", "Chef", "Lavaplatos", "Cajero"];

  const position = {
    id: id,
    title: faker.helpers.arrayElement(positions),
    description: faker.lorem.paragraph(),
    entity_id: entityId,
  };
  return position;
}


// Funcion para generar areas
export function createArea(branchId) {
  const id = faker.string.uuid();
  const area = {
    id: id,
    name: faker.lorem.word({ length: { min: 3, max: 15 }, strategy: 'closest' }),
    branch_id: branchId,
  };
  return area;
}


export function generateEntityData() {
  const entities = [];
  const currentEntity = createEntity()
  //* CREATE ENTITY
  entities.push(currentEntity); 

  //* Aqui se guardara toda la data
  const branches = []; 
  const employees = []; 
  const employeeDocuments = []; 
  const areas = []; 
  const shifts = [];
  const positions = [];
  const users = [];
  const managerIds = [];

  // Aqui se crea la BRANCH
  for (let i = 0; i < 3; i++) {
    const branch = createBranch(entities.id); 
    branches.push(branch); 

    const position = createPosition(entities.id);
    positions.push(position);

    const area = createArea(branch.id); 
    areas.push(area);

    const shift = createShift(branch.id);
    shifts.push(shift);

    //Aqui se crea EMPLOYEE
    for (let j = 0; j < (1 + Math.floor(Math.random() * 5)); j++) { 
      const isManager = faker.datatype.boolean(0.1);

      if (managerIds.length === 0 || isManager) {
        const siSoyManager = true
        const manager = createEmployee(branch.id, area.id, shift.id, position.id, siSoyManager, "");
        employees.push(manager);
        managerIds.push(manager.id); 
      } 
    
      const employee = createEmployee(branch.id, area.id, shift.id, position.id, isManager, managerIds);
      employees.push(employee);

      const employeeDocument = createEmployeeDocument(employee.id); 
      employeeDocuments.push(employeeDocument); 

    }
  }

  for(let j = 0; j < 5; j++){
      const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
      users.push(createUser(currentEntity.id, randomEmployee))
    }

  const data = { entities, branches, employees, employeeDocuments, areas, shifts, positions, users };
  console.log(data)
  return data
}

// Generar datos para múltiples entidades
export function generateData(numEntities) {
  const data = [];
  for (let i = 0; i < numEntities; i++) {
    data.push(generateEntityData());
  }
  return data;
}

// Generar datos
const data = generateData(1);

// Exportar los datos generados
const content = { data };