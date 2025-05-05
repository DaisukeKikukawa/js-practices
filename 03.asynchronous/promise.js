#!/usr/bin/env node

import sqlite3Module from "sqlite3";
import timers from "timers/promises";
import { runQuery, getRow, closeDb } from "./db_operation.js";
const sqlite3 = sqlite3Module.verbose();
const db = new sqlite3.Database(":memory:");

runQuery(
  db,
  "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runQuery(
      db,
      "INSERT INTO books(title) VALUES (?)",
      "初めてのJavaScript 第3版",
    );
  })
  .then((result) => {
    console.log(result.lastID);
  })
  .then(() => {
    return getRow(db, "SELECT id, title FROM books");
  })
  .then((row) => {
    console.log(`${row.id} : ${row.title}`);
  });

await timers.setTimeout(1000);

runQuery(db, "INSERT INTO Book(title) VALUES (?)", "初めてのJavaScript 第3版")
  .catch((error) => {
    console.error(error.message);
  })
  .then(() => {
    return runQuery(db, "SELECT id, title FROM Book");
  })
  .catch((error) => {
    console.error(error.message);
  })
  .then(() => {
    closeDb(db);
  });
