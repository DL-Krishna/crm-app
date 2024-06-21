// Import necessary modules and types
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import './config';
import { checkDatabaseAvailability, sequelize } from './database';

import { apiDocumentation } from './docs/api-doc';

import userRouter from './routes/users.router';
import courseRouter from './routes/courses.router';
import leadRouter from './routes/leads.router';
import attendanceRouter from './routes/attendances.router';
import taskRouter from './routes/tasks.router';
import meetingRouter from './routes/meetings.router';
import emailRouter from './routes/emails.router';
import messageRouter from './routes/messages.router';
import callRouter from './routes/calls.router';

const app = express();

// Configure middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.options('*', cors());

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-type, Accept');
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/leads', leadRouter);
app.use('/api/v1/attendance', attendanceRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/meetings', meetingRouter);
app.use('/api/v1/emails', emailRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/calls', callRouter);

app.get('/', function(req, res) {
  res.status(200);
  res.send({message: 'dl crm services is up on running.'});
});

sequelize.sync({force:true}).then(()=>{
  console.log('Database tables crated!');
})

async function startServer() {
  try {
      const isDatabaseAvailable = await checkDatabaseAvailability();
      if (isDatabaseAvailable) {
        // Start the server only if the database is available
        console.log('Started database server');
      } else {
        console.log('Server cannot start due to database unavailability.');
      }
  } catch (err) {
      console.error('Error starting server:', err);
  }
}

// Set up the Express application to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("DB Name: ", process.env.DB_DATABASE);
  startServer();
});
