import e from 'express';
import cookieParser from 'cookie-parser';
import AuthRoutes from './src/routes/auth.routes.js';
import UserRoutes from './src/routes/user.routes.js';
import EntityRoutes from './src/routes/entity.routes.js';

// Creates the Express App object.
const app = e();

// App-level middleware
app.use(e.json());
app.use(cookieParser());

// App routes
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/entities', EntityRoutes);

//todo: Crear una ruta para emplooyeeDocuments

//todo: Crear un archivo en routes que se llame employeeDocuments.routes.js
  //? EMPLOYEEDOCUMENTS.ROUTES:
    //todo: Hacer SOLO la ruta de GET pero sin authentication

//todo: Crear un archivo en controllers que se llame employeeDocuments.controller.js
  //? EMPLOYEEDOCUMENTS.CONTROLLER:
    //todo: Hacer SOLO el controller de GET 

//todo: Crear un archivo en service que se llame employeeDocuments.service.js
  //? EMPLOYEEDOCUMENTS.SERVICE:
    //todo: lo mismo (ve revisando los otros archivos para que te vayas guiando)

//todo: Crear un archivo en repository que se llame employeeDocuments.repository.js
  //? EMPLOYEEDOCUMENTS.REPOSITORY:
    //! PENDIENTE (AVISAR CUANDO TEMRINES)

//* Cuando termines has lo mismo pero con Employee (avisame cuando ya empieces esto)

export default app;
