import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import users from './routes/users.js';
import logger from './middelware/logger.js';
import errorHandeler from './middelware/error.js';
import notFound from './middelware/notFound.js';

const port = process.env.PORT || 8000;

const app = express();

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Setup static folder and middleware
app.use(express.static(path.join(__dirname, 'public')));

// Setup routes
app.use('/api/v1/users', users);

/*
* Error handler middleware
* @description: This function is used to handle 404 errors
*/
app.use(notFound);
app.use(errorHandeler);

app.listen(port ,() => console.log(`Server is running on port ${port}`));