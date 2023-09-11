const mysql = require('mysql');

const Person = {
  // Database connection information
  connection: mysql.createConnection({
    host: 'sql3.freesqldatabase.com',
    user: 'sql3645708',
    password: 'XgJcg71W7r',
    database: 'sql3645708',
  }),

  // Create a person
  create(name) {
    return this.connection.query(`
      INSERT INTO persons (name) VALUES (?)
    `, [name]);
  },

  // Find all people
  findAll() {
    return this.connection.query(`
      SELECT * FROM persons
    `);
  },

  // Find a person by name
  findOne(name) {
    return this.connection.query(`
      SELECT * FROM persons WHERE name = ?
    `, [name]);
  },

  // Update a person
  update(name, newName) {
    return this.connection.query(`
      UPDATE persons SET name = ? WHERE name = ?
    `, [newName, name]);
  },

  // Delete a person
  delete(name) {
    return this.connection.query(`
      DELETE FROM persons WHERE name = ?
    `, [name]);
  },
};
