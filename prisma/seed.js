import { faker } from '@faker-js/faker';
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'; // Importa el método fileURLToPath para convertir la URL a una ruta de archivo
import { dirname, join } from 'node:path';

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
    date_of_birth: faker.date.birthdate().toISOString().slice(0,10),         
    city_of_birth: faker.location.city(),        
    gender: faker.person.gender(),              
    study:  faker.lorem.word({ length: { min: 3, max: 30 }, strategy: 'closest' }),              
    id_document_type: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),       
    id_document_number: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),  
    citizen_id_number: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),   
    ssn: faker.lorem.word({ length: { min: 5, max: 20 }, strategy: 'closest' }),                  
    ssn_issue_date: faker.date.anytime().toISOString().slice(0,10),           
    pay_cadence: faker.lorem.word({ length: { min: 3, max: 10 }, strategy: 'closest' }),        
    daily_wage: 249.00,
    attendance_bonus: 5500.00,
    other_bonus: 1800.00,
    incentives: 1550.00,
    complimentary_payroll: 1800.00, 
    regular_payroll: 7468.00,
    bank_name: faker.lorem.word({ length: { min: 3, max: 20 }, strategy: 'closest' }),          
    bank_account_number: faker.finance.accountNumber(),   
    date_of_hire: faker.date.anytime().toISOString().slice(0,10),        
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
  const shifts = [
    { name: "Matutino", start_time: "1970-01-01 07:00:00.000", end_time: "1970-01-01 14:00:00.000" },
    { name: "Vespertino", start_time: "1970-01-01 14:00:00.000", end_time: "1970-01-01 21:00:00.000" },
    { name: "Nocturno", start_time: "1970-01-01 21:00:00.000", end_time: "1970-01-01 04:00:00.000" }
  ];

  return shifts.map(shift => ({
    id: faker.string.uuid(),
    name: shift.name,
    branch_id: branchId,
    start_time: shift.start_time,
    end_time: shift.end_time,
    hours: 7
  }));
}


// Funcion para generar positions
function createPosition(entityId) {
  const positions = ["Mesero", "Cocinero", "Chef", "Lavaplatos", "Cajero"];

  return positions.map(position => ({
    id: faker.string.uuid(),
    title: position,
    description: faker.lorem.paragraph(),
    entity_id: entityId
  }));
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
  const positions = createPosition(currentEntity.id);
  const users = [];
  const managerIds = [];

  // Aqui se crea la BRANCH
  for (let i = 0; i < 3; i++) {
    const currentBranch = createBranch(currentEntity.id); 
    branches.push(currentBranch); 

    const branchShifts = createShift(currentBranch.id);
    shifts.push(...branchShifts);


    //Aqui se crea EMPLOYEE
    for (let j = 0; j < 7; j++) { 
      const area = createArea(currentBranch.id); 
      areas.push(area);

      const shift = faker.helpers.arrayElement(branchShifts);
      const position = faker.helpers.arrayElement(positions);
      
      const isManager = faker.datatype.boolean(0.1);

      if (managerIds.length === 0 || isManager) {
        const siSoyManager = true
        const manager = createEmployee(currentBranch.id, area.id, shift.id, position.id, siSoyManager, "");
        employees.push(manager);
        managerIds.push(manager.id); 
      } 
    
      const employee = createEmployee(currentBranch.id, area.id, shift.id, position.id, isManager, managerIds);
      employees.push(employee);

      const employeeDocument = createEmployeeDocument(employee.id); 
      employeeDocuments.push(employeeDocument); 

    }
  }

  // CREACION DE USERS
  for (let j = 0; j < 5; j++) {
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
const data = generateData(3);

// Esto es para generar el archivo db.json dentro del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, 'db.json');

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

console.log('Archivo db.json creado con éxito en:', filePath);