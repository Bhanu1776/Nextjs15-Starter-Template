#!/usr/bin/env node

const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone https://github.com/Bhanu1776/Nextjs15-Starter-Template.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && rm -rf bin .github && rm .npmrc CHANGELOG.md && npm install `;

console.log(`Init project '${repoName}' ✨`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log("Installing dependencies...🔥");
const installDeps = runCommand(installDepsCommand);
if (!installDeps) process.exit(-1);

console.log("SaxX! You are ready. Follow the following commands to start 🚀");
console.log("");
console.log(`Make sure you follow below steps to start fresh:`);
console.log(`- Rename 'name' and 'author' fields in package.json`);
console.log(`- Change the author name in "LICENSE"`);
console.log(`- Change the title and description in "layout.tsx"`);
console.log(`- Modify the 'manifest' in public folder`);
console.log(`- Clean up the "README.md"`);
