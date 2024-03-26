class MySql {
  async getProctoring(connection) {
    try {
      const query =
        "SELECT * FROM mdl_proctoring_face_images WHERE facefound = '1' ORDER BY id DESC LIMIT 1;";
      return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  }
  async getDataUser(connection, id) {
    try {
      const query = `SELECT * FROM mdl_user WHERE id = ${id}`;
      return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    } catch (error) {
      throw error;
    }
    }
    async getDataCourses(connection, id) {
        try {
          const query = `SELECT * FROM mdl_course WHERE id  = ${id}`;
          return new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
              if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
            });
          });
        } catch (error) {
          throw error;
        }
      }
}

module.exports = new MySql();
