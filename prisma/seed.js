import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { fakerES_MX } from "@faker-js/faker";

const prisma = new PrismaClient();

const SALT_LENGTH = 9;

const BRANCHES_COUNT = 7;
const MIN_EMPLOYEES_COUNT_BY_BRANCH = 18;
const MAX_EMPLOYEES_COUNT_BY_BRANCH = 54;
const MIN_MANAGERS_COUNT = 1;

const TEST_POSITIONS = [
  { name: "Gerente General", is_manager: true },
  { name: "Gerent Regional", is_manager: true },
  { name: "Gerente de Sucursal", is_manager: true },
  { name: "Gerente de Turno", is_manager: true },
  { name: "Cheff", is_manager: true },
  { name: "Sous Chef", is_manager: true },
  { name: "Gerente Administrativo", is_manager: true },
  { name: "Jefe de Recursos Humanos", is_manager: true },
  { name: "Jefe de Mercadotecnia", is_manager: true },
  { name: "Jefe de Relaciones Publicas", is_manager: true },
  { name: "Jefe de Mantenimiento", is_manager: true },
  { name: "Disenador(a) Grafico(a)", is_manager: false },
  { name: "Tecnico de Soporte", is_manager: false },
  { name: "Analista de Nomina", is_manager: false },
  { name: "Analista de Reclutamiento y Seleccion", is_manager: false },
  { name: "Capacitador", is_manager: false },
  { name: "Barista", is_manager: false },
  { name: "Barman", is_manager: false },
  { name: "Parrillero", is_manager: false },
  { name: "Hostess/Host", is_manager: false },
  { name: "Mesera(o)", is_manager: false },
  { name: "Cocinera(o)", is_manager: false },
  { name: "Ayudante de Cocina", is_manager: false },
  { name: "Cajera(o)", is_manager: false },
  { name: "Garrotero", is_manager: false },
  { name: "Chofer", is_manager: false },
  { name: "Conserje de Limpieza", is_manager: false },
];

const TEST_AREAS_NAMES = [
  "Administracion",
  "Caja",
  "Cocina caliente",
  "Cocina fria",
  "Parrilla",
  "Barra",
  "Recepcion",
  "Terraza",
  "Patio",
  "Planta Baja, Zona A",
  "Planta Baja, Zona B",
  "Planta Baja, Zona C",
  "Piso 1, Zona D",
  "Piso 1, Zona E",
  "Piso 2",
];

const EMPLOYEES_STATUS = [
  "Alta",
  "Descanso",
  "Vacaciones",
  "Incapacidad",
  "Baja temporal",
  "Baja permanente",
];

const EMPLOYEES_ID_DOCUMENT_TYPES = [
  "INE",
  "Pasaporte",
  "DNI",
  "Otro"
];

const EMPLOYEES_STUDIES = [
  "Ninguno",
  "Primaria",
  "Secundaria",
  "Medio",
  "Licenciatura",
  "Maestria o superior",
  "No especificado"
];

const MIN_AREAS_COUNT = 3;
const MAX_AREAS_COUNT = TEST_AREAS_NAMES.length;

const SINGLE_SHIFT_MORNINGS = {
  start_time: "1970-01-01 07:00:00.000",
  end_time: "1970-01-01 15:00:00.000",
  hours: 8,
};

const SINGLE_SHIFT_NIGHT = {
  start_time: "1970-01-01 20:00:00.000",
  end_time: "1970-01-02 03:00:00.000",
  hours: 7,
};

const DOUBLE_SHIFTS_MORNING = [
  {
    name: "Desayunos",
    start_time: "1970-01-01 07:00:00.000",
    end_time: "1970-01-01 15:00:00.000",
    hours: 8,
  },
  {
    name: "Comidas",
    start_time: "1970-01-01 12:00:00.000",
    end_time: "1970-01-01 20:00:00.000",
    hours: 8,
  },
];

const DOUBLE_SHIFTS_EVENING = [
  {
    name: "Tarde",
    start_time: "1970-01-01 12:00:00.000",
    end_time: "1970-01-01 20:00:00.000",
    hours: 8,
  },
  {
    name: "Noche",
    start_time: "1970-01-01 18:00:00.000",
    end_time: "1970-01-02 01:00:00.000",
    hours: 7,
  },
];

const TRIPLE_SHIFTS = [
  {
    name: "Matutino",
    start_time: "1970-01-01 07:00:00.000",
    end_time: "1970-01-01 15:00:00.000",
    hours: 8,
  },
  {
    name: "Vespertino",
    start_time: "1970-01-01 14:00:00.000",
    end_time: "1970-01-01 22:00:00.000",
    hours: 8,
  },
  {
    name: "Nocturno",
    start_time: "1970-01-01 20:00:00.000",
    end_time: "1970-01-02 03:00:00.000",
    hours: 7,
  },
];

const SHIFTS_TYPE = [
  "SINGLE_SHIFT_MORNINGS",
  "SINGLE_SHIFT_NIGHT",
  "DOUBLE_SHIFTS_MORNING",
  "DOUBLE_SHIFTS_EVENING",
  "TRIPLE_SHIFTS",
];

const getRandomShiftTypeIndex = () => {
  return Math.floor(SHIFTS_TYPE.length * Math.random());
};

const getRandomInt = (min, max) => {
  const range = max - min;

  return min + Math.floor(Math.random() * range);
};

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

const main = async () => {
  try {
    // 1. Create Builtin Roles
    console.info("📋 Creando Roles...");
    // 1.1. Huubie Superuser Builtin Role
    console.info("\tCreando Rol de HuubieSuperuser");
    const huubieSuperUserRole = await prisma.role.create({
      data: {
        name: "HuubieSuperuser",
        is_builtin: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    // 1.2. Entity Owner Builtin Role
    console.info("\t✔️ Creando Rol de EntityOwner");
    const entityOwnerRole = await prisma.role.create({
      data: {
        name: "EntityOwner",
        is_builtin: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    // 1.3. Entity Admin Builtin Role
    console.info("\t✔️ Creando Rol de EntityAdmin");
    const entityAdminRole = await prisma.role.create({
      data: {
        name: "EntityAdmin",
        is_builtin: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    // 1.4. Entity User Builtin Role
    console.info("\t✔️ Creando Rol de EntityUser");
    const entityUserRole = await prisma.role.create({
      data: {
        name: "EntityUser",
        is_builtin: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    // 2. Create Builtin Users
    console.info("👥 Creando Usuarios...")

    // 2.1 Create Huubie Superuser
    console.info("\t✔️ Creando HuubieSuperuser");
    const builtinSuperUser = await prisma.user.create({
      data: {
        email: "huubie_superuser@test.com",
        password: await bcrypt.hash("unbreakable", SALT_LENGTH),
        first_name: "Superuser",
        last_name: "Huubie",
        role_id: huubieSuperUserRole.id,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });

    // 3. Create Test Entity
    console.info("🏢 Creando Entidad de prueba")
    const testEntity = await prisma.entity.create({
      data: {
        legal_name: "Entidad de Prueba, S.A. de C.V.",
        tax_id: "XAXX010101000",
      },
      select: {
        id: true,
        legal_name: true,
        tax_id: true,
      },
    });

    // 4. Create Test Entity Users
    console.info("👤 Creando usuarios de la Entidad de prueba...")
    // 4.1. Entity Owner
    console.info("\t✔️ Creando Usuario EntityOwner (propietario o representante legal de la Entidad de prueba)");
    const testEntityOwner = await prisma.user.create({
      data: {
        email: "entity_owner@test.com",
        password: await bcrypt.hash("owner1pass", SALT_LENGTH),
        first_name: "Propietario",
        last_name: "Entidad de Prueba",
        entity_id: testEntity.id,
        role_id: entityOwnerRole.id,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });

    // 4.2. Entity Admin
    console.info("\t✔️ Creando Usuario EntityAdmin (administrador de la Entidad de prueba)");
    const testEntityAdmin = await prisma.user.create({
      data: {
        email: "entity1_admin@test.com",
        password: await bcrypt.hash("admin1pass", SALT_LENGTH),
        first_name: "Admin",
        last_name: "Entidad de Prueba",
        entity_id: testEntity.id,
        role_id: entityAdminRole.id,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });

    const branchPositions = [];
    // 5. Create Test Entity Positions
    console.info("🕴️ Creando Puestos para la Entidad de prueba");
    TEST_POSITIONS.forEach(async (position) => {
      const newPosition = await prisma.position.create({
        data: {
          title: position.name,
          description: fakerES_MX.lorem.sentence,
          entity_id: testEntity.id,
        },
        select: {
          id: true,
          title: true,
        },
      });

      branchPositions.push(newPosition);
    });

    // 6. Create Test Entity Branches
    const entityBranches = [];
    console.log("🏤 Creando Sucursales para la Entidad de prueba");
    for (let i = 0; i < BRANCHES_COUNT; i++) {
      // 6.1. Create a new branch
      const newBranch = await prisma.branch.create({
        data: {
          entity_id: testEntity.id,
          name: fakerES_MX.company.name(),
          address_line_one: fakerES_MX.location.streetAddress(true),
        },
        select: {
          id: true,
          name: true,
        },
      });
      entityBranches.push(newBranch);
      console.log(`\tCreada la Sucursal '${newBranch.name}'`);

      // 6.2. Create Areas for the new Branch
      console.info(`\t\t🛠️ Creando Areas para la Sucursal '${newBranch.name}'`);
      const branchAreas = [];
      const areasCount = getRandomInt(MIN_AREAS_COUNT, MAX_AREAS_COUNT);

      // 6.2.1 Always create an Administration area per branch.
      console.info("\t\t\t✔️ Administracion");
      const newBranchAdministrationArea = await prisma.area.create({
        data: {
          name: "Administracion",
          branch_id: newBranch.id
        },
        select: {
          id: true,
          name: true
        }
      });
      branchAreas.push(newBranchAdministrationArea);

      // 6.2.2 Create non-administrative areas
      console.info("\t\t\t✔️ Areas no administrativas")
      const areasCreated = ["Administracion"];
      for (let j = 0; j < areasCount; j++) {
        const areasLeft = TEST_AREAS_NAMES.filter(
          (area) => !areasCreated.includes(area)
        );
        const randomIndex = Math.floor(areasLeft.length * Math.random());
        const newAreaName = areasLeft[randomIndex];
        const newArea = await prisma.area.create({
          data: {
            name: newAreaName,
            branch_id: newBranch.id,
          },
          select: {
            id: true,
            name: true,
          },
        });
        areasCreated.push(newArea.name);
        branchAreas.push(newArea);
      }

      // 6.3 Create Shifts for the new Branch
      console.info(`\t\t🕑 Creando Turno(s) para la Sucursal '${newBranch.name}'`)
      const branchShifts = [];
      const randomShiftsType = getRandomShiftTypeIndex();
      switch (randomShiftsType) {
        case "SINGLE_SHIFT_MORNINGS":
          branchShifts.push(
            await prisma.shift.create({
              data: {
                name: "Unico",
                start_time: SINGLE_SHIFT_MORNINGS.start_time,
                end_time: SINGLE_SHIFT_MORNINGS.end_time,
                hours: SINGLE_SHIFT_MORNINGS.hours,
              },
              select: {
                id: true,
                name: true,
                start_time: true,
                end_time: true,
                hours: true,
              },
            })
          );
          break;
        case "SINGLE_SHIFT_NIGHT":
          branchShifts.push(
            await prisma.shift.create({
              data: {
                name: "Unico",
                start_time: SINGLE_SHIFT_NIGHT.start_time,
                end_time: SINGLE_SHIFT_NIGHT.end_time,
                hours: SINGLE_SHIFT_NIGHT.hours,
              },
              select: {
                id: true,
                name: true,
                start_time: true,
                end_time: true,
                hours: true,
              },
            })
          );
          break;
        case "DOUBLE_SHIFTS_MORNING":
          DOUBLE_SHIFTS_MORNING.forEach(async (shift) => {
            const newShift = await prisma.shift.create({
              data: {
                name: shift.name,
                start_time: shift.start_time,
                end_time: shift.end_time,
                hours: shift.hours,
              },
              select: {
                id: true,
                name: true,
                start_time: true,
                end_time: true,
                hours: true,
              },
            });
            branchShifts.push(newShift);
          });
          break;
        case "DOUBLE_SHIFTS_EVENING":
          DOUBLE_SHIFTS_EVENING.forEach(async (shift) => {
            const newShift = await prisma.shift.create({
              data: {
                name: shift.name,
                start_time: shift.start_time,
                end_time: shift.end_time,
                hours: shift.hours,
              },
              select: {
                id: true,
                name: true,
                start_time: true,
                end_time: true,
                hours: true,
              },
            });
            branchShifts.push(newShift);
          });
          break;
        case "TRIPLE_SHIFTS":
          TRIPLE_SHIFTS.forEach(async (shift) => {
            const newShift = await prisma.shift.create({
              data: {
                name: shift.name,
                start_time: shift.start_time,
                end_time: shift.end_time,
                hours: shift.hours,
              },
              select: {
                id: true,
                name: true,
                start_time: true,
                end_time: true,
                hours: true,
              },
            });
            branchShifts.push(newShift);
          });
          break;
        default:
          break;
      }

      // 6.4 Create Employees for the new Branch
      console.info(`\t\t👷 Creando Empleados para la sucursal '${newBranch.name}'`)
      const managersCount = getRandomInt(
        MIN_MANAGERS_COUNT,
        Math.max(MIN_MANAGERS_COUNT, Math.floor(employeesCount * 0.1))
      );

      const employeesCount = getRandomInt(
        MIN_EMPLOYEES_COUNT_BY_BRANCH,
        MAX_EMPLOYEES_COUNT_BY_BRANCH
      );

      // 6.4.1 Create Managers
      console.info("\t\t\t✔️ Gerentes");
      const branchManagers = [];
      const managerPositionsTaken = [];
      const testManagerPositions = TEST_POSITIONS.filter(
        (position) => position.is_manager
      );
      const managerPositionsAvailable = branchPositions.filter((position) =>
        testManagerPositions.some(
          (element) =>
            element.name === position.title &&
            !managerPositionsTaken.includes(position.title)
        )
      );
    for (let j = 0; j < managersCount; j++) {
        const newManagerGender = fakerES_MX.person.sexType();
        const newManagerFirstName =
          fakerES_MX.person.firstName(newManagerGender);
        const newManagerLastName = fakerES_MX.person.lastName();
        const newManagerEmail = fakerES_MX.internet.email({
          firstName: newManagerFirstName,
          lastName: newManagerLastName,
          provider: "huubie.dev.test",
        });
        const newManagerPositionIndex = Math.floor(Math.random() * managerPositionsAvailable.length);
        const newManagerPosition = managerPositionsAvailable.splice(newManagerPositionIndex, 1)[0];
        managerPositionsTaken.push(newManagerPosition.title);
        const newManager = await prisma.employee.create({
          data: {
            branch_id: newBranch.id,
            email: newManagerEmail,
            first_name: newManagerFirstName,
            last_name: newManagerLastName,
            gender: newManagerGender === "female" ? "femenino" : "masculino",
            area_id: newBranchAdministrationArea.id,
            shift_id: branchShifts[0].id,
            is_manager: true,
            telephone_number: fakerES_MX.helpers.fromRegExp('\+52 \([0-9]{3}\) [0-9]{3}\-[0-9]{4}'),
            position_id: newManagerPosition.id,
            tax_id: fakerES_MX.helpers.fromRegExp('[A-Z]{4}[0-9]{6}[A-Z0-9]{3}'),
            date_of_hire: fakerES_MX.date.past({ years: 10 }),
            citizen_id_number: fakerES_MX.helpers.fromRegExp('[A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[A-Z]{3}[A-Z0-9]{2}'),
            date_of_birth: fakerES_MX.date.birthdate({ min: 18, max: 54, mode: 'age' }),
            status: getRandomElement(EMPLOYEES_STATUS),
            study: getRandomElement(EMPLOYEES_STUDIES),
            id_document_type: getRandomElement(EMPLOYEES_ID_DOCUMENT_TYPES),
            id_document_number: fakerES_MX.helpers.fromRegExp('[A-Z]{3}\-[0-9]{3}\-[0-9]{3}\-[A-Z0-9]{4}'),
            ssn: fakerES_MX.string.numeric(11),
            daily_wage: fakerES_MX.number.int({ min: 100000, max: 400000 }),
          },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        });

        branchManagers.push(newManager);
      }

      // 6.4.2 Create Non-managers
      console.info("\t\t\t✔️ Puestos no gerenciales");
      const branchEmployees = [];
      for (let j = 0; j < employeesCount; j++) {
        const newEmployeeGender = fakerES_MX.person.sexType();
        const newEmployeeFirstName = fakerES_MX.person.firstName(newEmployeeGender);
        const newEmployeeLastName = fakerES_MX.person.lastName(newEmployeeGender);
        const newEmployeeEmail = fakerES_MX.internet.email({
          firstName: newEmployeeFirstName,
          lastName: newEmployeeLastName,
          provider: "huubie.dev.test"
        });
        const newEmployeeArea = getRandomElement(branchAreas.filter((area) => area.name !== "Administration"));
        const newEmployeeShift = getRandomElement(branchShifts);
        const newEmployeeManager = getRandomElement(branchManagers);
        const newEmployeePosition = getRandomElement(branchPositions);
        const newEmployee = await prisma.employee.create({
          data: {
            email: newEmployeeEmail,
            first_name: newEmployeeFirstName,
            last_name: newEmployeeLastName,
            gender: newEmployeeGender === "female" ? "femenino" : "masculino",
            area_id: newEmployeeArea.id,
            shift_id: newEmployeeShift.id,
            is_manager: false,
            manager_id: newEmployeeManager.id,
            telephone_number: fakerES_MX.helpers.fromRegExp('\+52 \([0-9]{3}\) [0-9]{3}\-[0-9]{4}'),
            position_id: newEmployeePosition.id,
            tax_id: fakerES_MX.helpers.fromRegExp('[A-Z]{4}[0-9]{6}[A-Z0-9]{3}'),
            date_of_hire: fakerES_MX.date.past({ years: 8 }),
            citizen_id_number: fakerES_MX.helpers.fromRegExp('[A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[A-Z]{3}[A-Z0-9]{2}'),
            date_of_birth: fakerES_MX.date.birthdate({ min: 18, max: 36, mode: 'age' }),
            status: getRandomElement(EMPLOYEES_STATUS),
            study: getRandomElement(EMPLOYEES_STUDIES),
            id_document_type: getRandomElement(EMPLOYEES_ID_DOCUMENT_TYPES),
            id_document_number: fakerES_MX.helpers.fromRegExp('[A-Z]{3}\-[0-9]{3}\-[0-9]{3}\-[A-Z0-9]{4}'),
            ssn: fakerES_MX.string.numeric(11),
            daily_wage: fakerES_MX.number.int({ min: 25000, max: 80000 }),
          },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true
          }
        });

        branchEmployees.push(newEmployee);
      }

      // 6.5 Assign users to Branch Employees
      console.info(`\t\tAsignando usuarios a los Empleados de la Sucursal '${newBranch.name}'`);
      branchEmployees.forEach(async (employee) => {
        newEntityUser = await prisma.user.create({
          data: {
            email: employee.email,
            password: await bcrypt.hash(employee.tax_id, SALT_LENGTH),
            first_name: employee.first_name,
            last_name: employee.last_name,
            role_id: entityUserRole.id,
            entity_id: testEntity.id,
          },
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          }
        });
      });
    }
    console.info("👌 Se han creado los datos semilla en la base de datos.");
  } catch (err) {
    console.error("❗ Ocurrio un error en la creacion de los datos semilla en la base de datos.");
    console.error(err);
  }
};

try {
  await main();
  await prisma.$disconnect();
} catch (error) {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
}
