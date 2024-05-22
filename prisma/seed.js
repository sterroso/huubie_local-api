import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";
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

const main = async () => {
  try {
    // 1. Create Builtin Roles
    // 1.1. Huubie Superuser Builtin Role
    const huubieSuperUserRole = await prisma.role.create({
      data: {
        name: "Huubie Superuser",
        is_builtin: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    // 1.2. Entity Owner Builtin Role
    const entityOwnerRole = await prisma.role.create({
      data: {
        name: "Entity Owner",
        is_builtin: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    // 1.3. Entity Admin Builtin Role
    const entityAdminRole = await prisma.role.create({
      data: {
        name: "Entity Admin",
        is_builtin: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    // 1.4. Entity User Builtin Role
    const entityUserRole = await prisma.role.create({
      data: {
        name: "Entity User",
        is_builtin: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    // 2. Create Huubie Superuser Builtin user
    const builtinSuperUser = await prisma.user.create({
      data: {
        email: "huubie_superuser@test.com",
        password: await hash("unbreakable", SALT_LENGTH),
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
    // 4.1. Entity Owner
    const testEntityOwner = await prisma.user.create({
      data: {
        email: "entity_owner@test.com",
        password: await hash("owner1pass", SALT_LENGTH),
        first_name: "Propietario",
        last_name: "Entidad de Prueba",
        entity_id: testEntity.id,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });

    // 4.2. Entity Admin
    const testEntityAdmin = await prisma.user.create({
      data: {
        email: "entity1_admin@test.com",
        password: await hash("admin1pass", SALT_LENGTH),
        first_name: "Admin",
        last_name: "Entidad de Prueba",
        entity_id: testEntity.id,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });

    const positions = [];
    // 5. Create Test Entity Positions
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

      positions.push(newPosition);
    });

    // 6. Create Test Entity Branches
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

      // 6.2. Create Areas for the new Branch
      const areasCount = getRandomInt(MIN_AREAS_COUNT, MAX_AREAS_COUNT);

      // 6.2.1 Always create an Administration area per branch.
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

      // 6.2.2 Create non-administrative areas
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
      }

      // 6.3 Create Shifts for the new Branch
      const newBranchShifts = [];
      const randomShiftsType = getRandomShiftTypeIndex();
      switch (randomShiftsType) {
        case "SINGLE_SHIFT_MORNINGS":
          newBranchShifts.push(
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
          newBranchShifts.push(
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
            newBranchShifts.push(newShift);
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
            newBranchShifts.push(newShift);
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
            newBranchShifts.push(newShift);
          });
          break;
        default:
          break;
      }

      // 6.4 Create Employees for the new Branch
      const employeesCount = getRandomInt(
        MIN_EMPLOYEES_COUNT_BY_BRANCH,
        MAX_EMPLOYEES_COUNT_BY_BRANCH
      );

      const managersCount = getRandomInt(
        MIN_MANAGERS_COUNT,
        Math.max(MIN_MANAGERS_COUNT, Math.floor(employeesCount * 0.1))
      );

      // 6.4.1 Create Managers
      const branchManagers = [];
      const managerPositionsTaken = [];
      for (let j = 0; j < managersCount; j++) {
        const newManagerGender = fakerES_MX.person.sexType();
        const newManagerFirstName =
          fakerES_MX.person.firstName(newManagerGender);
        const newManagerLastName = fakerES_MX.person.lastName();
        const newManagerEmail = fakerES_MX.internet.email({
          firstName: newManagerFirstName,
          lastName: newManagerLastName,
          provider: "huubie.dev",
        });
        const testManagerPositions = TEST_POSITIONS.filter(
          (position) => position.is_manager
        );
        const managerPositionsAvailable = positions.filter((position) =>
          testManagerPositions.some(
            (element) =>
              element.name === position.title &&
              !managerPositionsTaken.includes(position.title)
          )
        );
        const newManagerPositionIndex = Math.floor(Math.random() * managerPositionsAvailable.length);
        const newManagerPosition = managerPositionsAvailable[newManagerPositionIndex];
        managerPositionsTaken.push(newManagerPosition.title);
        const newManager = await prisma.employee.create({
          data: {
            branch_id: newBranch.id,
            email: newManagerEmail,
            first_name: newManagerFirstName,
            last_name: newManagerLastName,
            gender: newManagerGender === "female" ? "femenino" : "masculino",
            area_id: newBranchAdministrationArea.id,
            shift_id: newBranchShifts[0].id,
            is_manager: true,
            telephone_number: fakerES_MX.helpers.fromRegExp('\+52 \([0-9]{3}\) [0-9]{3}\-[0-9]{4}'),
            position_id: newManagerPosition.id,
            tax_id: fakerES_MX.helpers.fromRegExp('[A-Z]{4}[0-9]{6}[A-Z0-9]{3}'),
            citizen_id_number: fakerES_MX.helpers.fromRegExp('[A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[A-Z]{3}[A-Z0-9]{2}'),
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
      for (let j = 0; j < employeesCount; j++) {}
    }
  } catch (err) {}
};

try {
  await main();
  await prisma.$disconnect();
} catch (error) {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
}
