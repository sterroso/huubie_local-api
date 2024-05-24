import e from "express";
import cookieParser from "cookie-parser";
import AuthRoutes from "./src/routes/auth.routes.js";
import UserRoutes from "./src/routes/user.routes.js";
import EntityRoutes from "./src/routes/entity.routes.js";
import PositionRoutes from "./src/routes/position.routes.js";
import AreaRoutes from "./src/routes/area.routes.js";
import EmployeeRoutes from "./src/routes/employee.routes.js";

// Creates the Express App object.
const app = e();

// App-level middleware
app.use(e.json());
app.use(cookieParser());

// App routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/entities", EntityRoutes);
app.use("/api/v1/positions", PositionRoutes);
app.use("/api/v1/areas", AreaRoutes);
app.use("/api/v1/employees", EmployeeRoutes);

//! Para que veas mas ordenadas las tareas y los comentario, instala la extension: Better Comments es de Aaron Bond

//* Aqui inicia todo, con el enrutado => http://localhost:4000/api/v1/areas
//* y la modularizacion de las rutas.

//todo: Tu te encargaras de conectar el back con el front de AREAS, solo nos enfocaremos en los get
//* Ahora ve a area.routes ahi te explicare los siguientes pasos =>

export default app;
