#!/usr/bin/env node

import sqlite3Module from "sqlite3";
import timers from "timers/promises";
const sqlite3 = sqlite3Module.verbose();
const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    db.run(
      "INSERT INTO books(title) VALUES (?)",
      "初めてのJavaScript 第3版",
      function () {
        console.log(this.lastID);
        db.get("SELECT id, title FROM books", (error, row) => {
          console.log(`${row.id} : ${row.title}`);
        });
      },
    );
  },
);

await timers.setTimeout(1000);

