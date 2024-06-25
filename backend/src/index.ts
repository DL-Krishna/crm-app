// // Import necessary modules and types
// import express from 'express';
// import cors from 'cors';
// import swaggerUi from 'swagger-ui-express';

// import './config';
// import { checkDatabaseAvailability, sequelize } from './database';

// import { apiDocumentation } from './docs/api-doc';

// import userRouter from './routes/users.router';
// import courseRouter from './routes/courses.router';
// import leadRouter from './routes/leads.router';
// import attendanceRouter from './routes/attendances.router';
// import taskRouter from './routes/tasks.router';
// import meetingRouter from './routes/meetings.router';
// import emailRouter from './routes/emails.router';
// import messageRouter from './routes/messages.router';
// import callRouter from './routes/calls.router';

// const app = express();

// // Configure middleware for parsing JSON and URL-encoded data
// app.use(express.json({ limit: '5mb' }));
// app.use(express.urlencoded({ extended: false }));

// app.use(cors());
// app.options('*', cors());

// app.use((req, res, next) => {
//   res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
//   res.header('Pragma', 'no-cache');
//   res.header('Expires', '0');
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-type, Accept');
//   next();
// });

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/courses', courseRouter);
// app.use('/api/v1/leads', leadRouter);
// app.use('/api/v1/attendance', attendanceRouter);
// app.use('/api/v1/tasks', taskRouter);
// app.use('/api/v1/meetings', meetingRouter);
// app.use('/api/v1/emails', emailRouter);
// app.use('/api/v1/messages', messageRouter);
// app.use('/api/v1/calls', callRouter);

// app.get('/', function(req, res) {
//   res.status(200);
//   res.send({message: 'dl crm services is up on running.'});
// });

// // new 
// // sequelize.sync({force:true}).then(()=>{
// //   console.log('Database tables created!');
  
// // })

// app.get('/api/v1/sync-db', async (req: Request, res: Response) => {
//   // Sync the models with the database
//   sequelize.sync({ alter: true })
//     .then(() => {
//       console.log('Database synchronized');
//       res.json({
//         message: 'Database synchronized'
//       });
//     })
//     .catch((error) => {
//       console.error('Error synchronizing database:', error);
//       res.json({
//         message: 'Error synchronizing database'
//       });
//     });
// });

// async function startServer() {
//   try {
//       const isDatabaseAvailable = await checkDatabaseAvailability();
//       if (isDatabaseAvailable) {
//         // Start the server only if the database is available
//         console.log('Started database server');
//       } else {
//         console.log('Server cannot start due to database unavailability.');
//       }
//   } catch (err) {
//       console.error('Error starting server:', err);
//   }
// }

// // Set up the Express application to listen on port 3000
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log("DB Name: ", process.env.DB_DATABASE);
//   startServer();
// });


// Import necessary modules and types
// import express, { Request, Response, NextFunction } from 'express';
// import cors from 'cors';
// import swaggerUi from 'swagger-ui-express';

// import './config';
// import { checkDatabaseAvailability, sequelize } from './database';

// import { apiDocumentation } from './docs/api-doc';

// import userRouter from './routes/users.router';
// import courseRouter from './routes/courses.router';
// import leadRouter from './routes/leads.router';
// import attendanceRouter from './routes/attendances.router';
// import taskRouter from './routes/tasks.router';
// import meetingRouter from './routes/meetings.router';
// import emailRouter from './routes/emails.router';
// import messageRouter from './routes/messages.router';
// import callRouter from './routes/calls.router';

// const app = express();

// // Configure middleware for parsing JSON and URL-encoded data
// app.use(express.json({ limit: '5mb' }));
// app.use(express.urlencoded({ extended: false }));

// app.use(cors());
// app.options('*', cors());

// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
//   res.header('Pragma', 'no-cache');
//   res.header('Expires', '0');
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-type, Accept');
//   next();
// });

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/courses', courseRouter);
// app.use('/api/v1/leads', leadRouter);
// app.use('/api/v1/attendance', attendanceRouter);
// app.use('/api/v1/tasks', taskRouter);
// app.use('/api/v1/meetings', meetingRouter);
// app.use('/api/v1/emails', emailRouter);
// app.use('/api/v1/messages', messageRouter);
// app.use('/api/v1/calls', callRouter);

// app.get('/', (req: Request, res: Response) => {
//   res.status(200).send({ message: 'dl crm services is up on running.' });
// });

// // Route to synchronize the database
// app.get('/api/v1/sync-db', async (req: Request, res: Response) => {
//   try {
//     await sequelize.sync({ alter: true });
//     console.log('Database synchronized');
//     res.status(200).json({
//       message: 'Database synchronized'
//     });
//   } catch (error) {
//     console.error('Error synchronizing database:', error);
//     res.status(500).json({
//       message: 'Error synchronizing database',
//       error: (error instanceof Error) ? error.message : 'Unknown error'
//     });
//   }
// });

// async function startServer() {
//   try {
//     const isDatabaseAvailable = await checkDatabaseAvailability();
//     if (isDatabaseAvailable) {
//       // Start the server only if the database is available
//       console.log('Started database server');
//     } else {
//       console.log('Server cannot start due to database unavailability.');
//     }
//   } catch (err) {
//     console.error('Error starting server:', err);
//   }
// }

// // Set up the Express application to listen on port 3000
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log("DB Name: ", process.env.DB_DATABASE);
//   startServer();
// });

// export default app;


import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import axios from 'axios'; // <-- Import axios

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

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());

app.use((req: Request, res: Response, next: NextFunction) => {
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

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'dl crm services is up on running.' });
});

// Route to synchronize the database
app.get('/api/v1/sync-db', async (req: Request, res: Response) => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
    res.status(200).json({
      message: 'Database synchronized'
    });
  } catch (error) {
    console.error('Error synchronizing database:', error);
    res.status(500).json({
      message: 'Error synchronizing database',
      error: (error instanceof Error) ? error.message : 'Unknown error'
    });
  }
});

// Define the syncDatabase function
const syncDatabase = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL || 'http://localhost:3000'}/api/v1/sync-db`);
    console.log(response.data.message);
    return true;
  } catch (error:any) {
    console.error('Error synchronizing database:', error.response ? error.response.data : error.message);
    return false;
  }
};

async function startServer() {
  try {
    const isDatabaseAvailable = await checkDatabaseAvailability();
    if (isDatabaseAvailable) {
      // Synchronize the database
      const isDbSynced = await syncDatabase();
      
      if (isDbSynced) {
        console.log('Database synchronized, now inserting initial data.');
        
        // Insert initial data
        await import('./scripts/insertAdminUser');
      } else {
        console.error('Failed to synchronize database.');
      }
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

export default app;
