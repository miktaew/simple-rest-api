const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const Employee = require('./models/Employee');
const authenticationMiddleware = require('./middleware/authentication');

const express = require('express');
require('express-async-errors');

const cors = require('cors');

const app = express();

//connect db
const connectDB = require('./db/connect');

//routers
const employeeRouter = require('./routes/users');
const bookRouter = require('./routes/books');

//error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.json());
app.use(cors());

//routes
app.use('/api/employee', authenticationMiddleware, employeeRouter);
app.use('/api/books', bookRouter);

//use middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );

    const hasAdmin = await Employee.findOne({login: 'admin'});
    if(!hasAdmin) {
      await Employee.create({name: 'default admin', 
                             login: 'admin', 
                             is_admin: true,
                             password: process.env.ADMIN_PASSWORD});
      console.log("Created the default admin account. Don't forget to change the password!");
    }

  } catch (error) {
    console.log(error);
  }
};

start();