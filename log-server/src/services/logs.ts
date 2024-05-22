import { Request, Response } from 'express';
import fs from 'fs';
import sqlite3 from 'sqlite3';
// const dbMemory = new sqlite3.Database(':memory:'); // or specify your database file
const path = './database';
if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true });
}

const db = new sqlite3.Database('./database/log.db', (err) => {
  if (err) {
    return console.error('Could not connect to database', err);
  }
  console.log('Connected to database');
});

db.run(
  'CREATE TABLE IF NOT EXISTS logs(id INTEGER PRIMARY KEY AUTOINCREMENT,event_id INTEGER NOT NULL,category TEXT NOT NULL,subject TEXT NOT NULL,user NOT NULL,action NOT NULL,timestamp NOT NULL,activity TEXT,details TEXT)',
  (err) => {
    if (err) {
      return console.error('Could not create table', err);
    }
    console.log('Table created or already exists logs');
  },
);
// db.run(
//   `ALTER TABLE logs ADD COLUMN event_id INTEGER NOT NULL DEFAULT 0`,
//   (err) => {
//     if (err) {
//       return console.error('Error adding new column', err);
//     }
//     console.log('Column log_level added successfully');
//   },
// );

// Close the database connection
// db.close();
class LOGSERVICE {
  static async NewLog(req: Request, res: Response) {
    const formattedTimestamp = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '')
      .slice(0, 23);

    const {
      id,
      eventId,
      category,
      subject,
      user,
      action,
      timestamp,
      details,
      activity,
    } = req.body;

    let detailsStr: string;
    let activityStr: string;

    try {
      detailsStr = JSON.stringify(details);
      activityStr = JSON.stringify(activity);
    } catch (err) {
      return res
        .status(400)
        .send('Details and activity must be valid JSON objects');
    }

    try {
      db.serialize(() => {
        db.run(
          'INSERT INTO logs(event_id, category, subject, user, action, timestamp, details, activity) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
          [
            eventId,
            category,
            subject,
            user,
            action,
            timestamp || formattedTimestamp,
            detailsStr,
            activityStr,
          ],
          function (err) {
            if (err) {
              console.error(err.message);
              return res.status(500).send('Error adding log');
            }
            console.log(`New log has been added with ID = ${this.lastID}`);
            return res.status(200).json({
              message: 'New log has been added into the database',
              id: this.lastID,
            });
          },
        );
      });
    } catch (err) {
      console.log('NEW LOG BODY ERR:::', err);
      return res.status(500).send('Error processing request');
    }
  }
  static Logs(req: Request, res: Response) {
    let rows: any = [];
    db.serialize(() => {
      db.each(
        'SELECT * FROM logs',
        (err, row: any) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Error encountered while displaying');
          }

          try {
            row.details = JSON.parse(row.details);
          } catch (e) {
            console.error('Error parsing details field:', e);
            row.details = null;
          }
          delete row.id;
          delete row.event_id;
          delete row.activity;
          rows.push(row);
          console.log(rows);
        },
        (err, num) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Error encountered while displaying');
          }
          res.json(rows);
          console.log('Entries displayed successfully');
        },
      );
    });
  }
  static UpdateLog(req: Request, res: Response) {
    const { eventId, details } = req.body;

    db.serialize(() => {
      // Step 1: Retrieve the existing details
      db.get(
        'SELECT details FROM logs WHERE event_id = ?',
        [eventId],
        (err: any, row: any) => {
          if (err) {
            res.status(500).send('Error retrieving existing details');
            return console.error(err.message);
          }

          let existingDetails = [];
          if (row && row.details) {
            try {
              existingDetails = JSON.parse(row.details);
            } catch (parseError: any) {
              res.status(500).send('Error parsing existing details');
              return console.error(parseError.message);
            }
          }

          // Step 2: Append the new details
          existingDetails.push(...details);

          // Step 3: Update the details column in the database
          db.run(
            'UPDATE logs SET details = ? WHERE event_id = ?',
            [JSON.stringify(existingDetails), eventId],
            (updateErr) => {
              if (updateErr) {
                res.status(500).send('Error encountered while updating');
                return console.error(updateErr.message);
              }
              res.send('Entry updated successfully');
              console.log('Entry updated successfully');
            },
          );
        },
      );
    });
  }

  static DeleteLog(req: Request, res: Response) {
    db.serialize(() => {
      db.run('DELETE FROM logs WHERE id = ?', req.params.id, function (err) {
        if (err) {
          res.send('Error encountered while deleting');
          return console.error(err.message);
        }
        res.send('Entry deleted');
        console.log('Entry deleted');
      });
    });
  }

  static LogById(req: Request, res: Response) {
    const { id } = req.params;
    db.serialize(() => {
      db.each(
        'SELECT id ID, name NAME FROM logs WHERE id = ?',
        [id],
        (err, row: any) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Error encountered while displaying');
          }
          res.send(`ID: ${row.ID}, Name: ${row.NAME}`);
          console.log('Entry displayed successfully');
        },
      );
    });
  }
}
export default LOGSERVICE;
