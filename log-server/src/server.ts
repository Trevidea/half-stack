import express from 'express';
import http from 'http';
import cors from 'cors';
import quotesRouter from './routes/logs';
const app = express();
const port = process.env.PORT || 8283;
app.use(cors());
app.use(express.json());
app.use('/api', quotesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// // Ensure the database directory exists
// if (!fs.existsSync(path)) {
//   fs.mkdirSync(path, { recursive: true });
// }

// // Connect to the SQLite database
// const db = new sqlite3.Database('./database/employee.db', (err) => {
//   if (err) {
//     return console.error('Could not connect to database', err);
//   }
//   console.log('Connected to database');
// });

// // Create the 'emp' table if it doesn't already exist
// db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)', (err) => {
//   if (err) {
//     return console.error('Could not create table', err);
//   }
//   console.log('Table created or already exists');
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// // Route to add a new employee
// app.get('/add/:id/:name', (req, res) => {
//   const { id, name } = req.params;
//   db.serialize(() => {
//     db.run('INSERT INTO emp(id, name) VALUES(?, ?)', [id, name], (err) => {
//       if (err) {
//         console.error(err.message);
//         return res.status(500).send('Error adding employee');
//       }
//       console.log('New employee has been added');
//       res.send(
//         `New employee has been added into the database with ID = ${id} and Name = ${name}`,
//       );
//     });
//   });
// });

// // Route to view an employee by ID
// app.get('/view/:id', (req, res) => {
//   const { id } = req.params;
//   db.serialize(() => {
//     db.each(
//       'SELECT id ID, name NAME FROM emp WHERE id = ?',
//       [id],
//       (err, row: any) => {
//         if (err) {
//           console.error(err.message);
//           return res.status(500).send('Error encountered while displaying');
//         }
//         res.send(`ID: ${row.ID}, Name: ${row.NAME}`);
//         console.log('Entry displayed successfully');
//       },
//     );
//   });
// });
// app.get('/update/:id/:name', function (req, res) {
//   db.serialize(() => {
//     db.run(
//       'UPDATE emp SET name = ? WHERE id = ?',
//       [req.params.name, req.params.id],
//       function (err) {
//         if (err) {
//           res.send('Error encountered while updating');
//           return console.error(err.message);
//         }
//         res.send('Entry updated successfully');
//         console.log('Entry updated successfully');
//       },
//     );
//   });
// });
// app.get('/del/:id', function (req, res) {
//   db.serialize(() => {
//     db.run('DELETE FROM emp WHERE id = ?', req.params.id, function (err) {
//       if (err) {
//         res.send('Error encountered while deleting');
//         return console.error(err.message);
//       }
//       res.send('Entry deleted');
//       console.log('Entry deleted');
//     });
//   });
// });
