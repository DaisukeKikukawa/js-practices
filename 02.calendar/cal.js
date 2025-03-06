#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const now = new Date();
const year = argv.y !== undefined ? argv.y : now.getFullYear();
const month = argv.m !== undefined ? argv.m : now.getMonth() + 1;
const startDate = new Date(year, month - 1, 1);
const lastDate = new Date(year, month, 0);
let indentByStartDay = " ".repeat(startDate.getDay() * 3);

process.stdout.write("      ");
console.log(`${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write(indentByStartDay);

for (let date = new Date(startDate.getTime()); date <= lastDate; date.setDate(date.getDate() + 1)) {
  if (date.getDate() < 10) {
    process.stdout.write(` ${String(date.getDate())}`);
  } else {
    process.stdout.write(String(date.getDate()));
  }
  if (date.getDay() !== 6 && date.getDate() !== lastDate.getDate()) {
    process.stdout.write(" ");
  }
  if (date.getDay() === 6) {
    console.log();
  }
}
