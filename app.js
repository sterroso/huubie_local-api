import e from 'express';
import cookieParser from 'cookie-parser';
import AuthRoutes from './src/routes/auth.routes.js';
import UserRoutes from './src/routes/user.routes.js';

// Creates the Express App object.
const app = e();

// App-level middleware
app.use(e.json());
app.use(cookieParser());

// App routes
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/users', UserRoutes);

export default app;
