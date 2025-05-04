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

await timers.setTimeout(1000);

// Promiseエラーあり
const firstPromiseFunc = () => {
  return new Promise((resolve) => {
  db.run("CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",()=>{
      resolve();
    })
  })
}

const secondPromiseFunc = () => {
  return new Promise((resolve,reject) => {
    db.run("INSERT INTO book(title) VALUES (?)", "初めてのJavaScript 第3版", function(err){
      if (err) {
        return reject(err);
      } else {
        return resolve(this.lastID);
      }
    })
  })
}

const thirdPromiseFunc = () => {
  return new Promise((resolve,reject) => {
    db.get("SELECT id, title FROM book", function(err, row){
      if (err) {
        return reject(err);
      } else {
        return resolve(`${row.id} : ${row.title}`);
      }
    })
  })
}

firstPromiseFunc()
  .then(()=>{
    return secondPromiseFunc();
  })
  .catch((error)=>{
    console.error(error.message)
  })
  .then(()=>{
    return thirdPromiseFunc();
  })
  .catch((error)=>{
    console.error(error.message)
  })
  .then(()=>{
    db.close();
  })
