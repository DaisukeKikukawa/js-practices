#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const now = new Date();
const year = argv.y ?? now.getFullYear();
const month = argv.m ?? now.getMonth() + 1;
const startDate = new Date(year, month - 1, 1);
const lastDate = new Date(year, month, 0);
let indentByStartDay = " ".repeat(startDate.getDay() * 3);

process.stdout.write("      ");
console.log(`${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write(indentByStartDay);

for (
  let date = new Date(startDate.getTime());
  date <= lastDate;
  date.setDate(date.getDate() + 1)
) {
  process.stdout.write(
    date.getDate() < 10 ? ` ${date.getDate()}` : String(date.getDate()),
  );
  if (date.getDay() === 6 || date.getDate() === lastDate.getDate()) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
}
