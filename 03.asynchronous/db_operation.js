export const runQuery = function (db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (error) {
      if (error) return reject(error);
      return resolve(this);
    });
  });
};

export const getRow = function (db, sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, function (error, row) {
      if (error) return reject(error);
      return resolve(row);
    });
  });
};

export const closeDb = (db) => {
  return new Promise((resolve) => {
    db.close();
    return resolve();
  });
};
