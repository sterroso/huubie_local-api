//* Los repositories sirven para extraer exactamente la info que quieras, 
//* el problema de estos es que es una logica para extraer info pero de la
//* base de datos y no del json.

//todo: Aqui crearas una logica para extraer la info de json y enviarla al controller.

//? Asi es como lo estoy haciendo (no funcion pero te puede servir para encaminarte):
// import { promises as fs } from 'fs'; //* el file system te ayuda a leer la informacion de json
// import path from 'path';

// export const getEntitiesFromDbJson = async () => {
// 	try {
// 		const filePath = path.join(process.cwd(), 'prisma', 'db.json');  //*Estas tres lineas te sirven para buscar el path del json
// 		const data = await fs.readFile(filePath, 'utf-8'); //*Aqui lo lee
// 		const jsonData = JSON.parse(data); //* y aqui te lo parsea

// 		const allEntities = jsonData.entities.map(entity => ({ //*Aqui mi idea era hacer un map para que te envie todas la entities pero no funciona jajaja
// 			id: entity.id,
// 			legal_name: entity.legal_name,
// 			tax_id: entity.tax_id,
// 			address_line_one: entity.address_line_one,
// 			address_line_two: entity.address_line_two,
// 			subscription_status: entity.subscription_status,
// 		}));

//? En Thunder Client o en Postman te van a ayudar para saber si esta funcionando

//* y hasta aqui llegaria.
//* El JSON nos servira aqui para que se extraiga la info con fs y se envie a los 
//* controllers y estos lo evien al front cuando el front lo necesite



// 		return allEntities;
// 	} catch (error) {
// 		throw new Error(`Failed to read or parse db.json: ${error.message}`);
// 	}
// };

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const createArea = async (data) => {
// 	return await prisma.area.create({
// 		data: data,
// 		select: {
// 			id: true,
// 			name: true,
// 			branch_id: true,
// 			employees: true,
// 		},
// 	});
// };

// export const getAreaById = async (id) => {
// 	return await prisma.area.findUniqueOrThrow({
// 		where: { id: id, deleted: false },
// 		select: {
// 			id: true,
// 			name: true,
// 			branch_id: true,
// 			employees: true,
// 		},
// 	});
// };

// export const getAreas = async (page = 1, pageSize = 10, query = {}) => {
// 	const offset = pageSize * (page - 1);

// 	return await prisma.area.findMany({
// 		where: { ...query, deleted: false },
// 		skip: offset,
// 		take: pageSize,
// 		select: {
// 			id: true,
// 			name: true,
// 			branch_id: true,
// 			employees: true,
// 		},
// 	});
// };
