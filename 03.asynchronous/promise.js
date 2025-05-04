#!/usr/bin/env node

import sqlite3Module from "sqlite3";
import timers from "timers/promises";
const sqlite3 = sqlite3Module.verbose();
const db = new sqlite3.Database(":memory:");

// Promiseエラーなし
new Promise((resolve) => {
  db.run("CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",()=>{
    resolve();
  })
}).then(()=>{
  return new Promise((resolve) => {
    db.run("INSERT INTO books(title) VALUES (?)", "初めてのJavaScript 第3版", function(){
      console.log(this.lastID);
    })
    resolve();
  })
}).then(()=>{
  return new Promise((resolve) => {
    db.get("SELECT id, title FROM books", function(error, book){
      console.log(`${book.id} : ${book.title}`);
    })
    resolve();
  })
}).then(()=>{
    db.close();
})
