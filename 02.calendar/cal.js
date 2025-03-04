#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const now = new Date();
const year = argv.y !== undefined ? argv.y : now.getFullYear();
const month = argv.m !== undefined ? argv.m : now.getMonth() + 1;
const startDate = new Date(year, month - 1, 1);
const lastDate = new Date(year, month, 0);
let indentByStartDay = "";

indentByStartDay = " ".repeat(startDate.getDay() * 3);

process.stdout.write("      ");
console.log(`${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

for (let i = 1; i <= lastDateOfMonth; i++) {
  if (i.getDate() === 1) {
    process.stdout.write(indentByStartDay);
    isFirstLineOfMonth = false;
  }
  if (i < 10) {
    process.stdout.write(` ${String(i.getDate())}`);
  } else {
    process.stdout.write(String(i));
  }
  if (i.getDay() !== 6 && i !== lastDate.getDate()) {
    console.log();
  }
  dayOfWeekCounter++;
}
