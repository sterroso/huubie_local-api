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

export default app;
