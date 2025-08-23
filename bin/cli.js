#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ANSI escape codes for colors and styles
const styles = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
};

const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (err) {
    console.error(
      `${styles.red}${styles.bright}Error: ${styles.reset}${styles.red}${err}${styles.reset}`
    );
    return false;
  }
  return true;
};

const removeItems = (dir, items) => {
  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    try {
      if (fs.existsSync(itemPath)) {
        if (fs.lstatSync(itemPath).isDirectory()) {
          fs.rmSync(itemPath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(itemPath);
        }
      }
    } catch (err) {
      console.error(
        `${styles.red}Error removing ${item}: ${err}${styles.reset}`
      );
    }
  });
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone https://github.com/Bhanu1776/Nextjs15-Starter-Template.git "${repoName}"`;

// Fancy banner
console.log("\n" + "=".repeat(60));
console.log(
  `${styles.cyan}${styles.bright}🚀 Initializing Project: ${styles.magenta}'${repoName}'${styles.reset}`
);
console.log("=".repeat(60) + "\n");

const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

// Remove the .git directory to prevent staging
const gitDirPath = path.join(repoName, ".git");
if (fs.existsSync(gitDirPath)) {
  fs.rmSync(gitDirPath, { recursive: true, force: true });
}

// Remove unnecessary items
const itemsToRemove = ["bin", ".github", ".npmrc", "CHANGELOG.md"];
removeItems(repoName, itemsToRemove);

console.log(
  `\n${styles.yellow}${styles.bright}📦 Installing dependencies...${styles.reset}`
);
const installDeps = runCommand(`cd "${repoName}" && npm install`);
if (!installDeps) process.exit(-1);

// Success message and instructions
console.log("\n" + "=".repeat(60));
console.log(
  `${styles.green}${styles.bright}✨ Success! Project setup complete!${styles.reset}`
);
console.log("=".repeat(60) + "\n");

console.log(`${styles.blue}${styles.bright}📝 Next Steps:${styles.reset}`);
console.log(
  `${styles.cyan}Follow these steps to customize your project:${styles.reset}\n`
);

const steps = [
  "Rename 'name' and 'author' fields in package.json",
  'Change the author name in "LICENSE"',
  'Change the title and description in "layout.tsx"',
  "Modify the 'manifest' in public folder",
  'Clean up the "README.md"',
];

steps.forEach((step, index) => {
  console.log(
    `${styles.yellow}${index + 1}.${styles.reset} ${styles.bright}${step}${styles.reset}`
  );
});

console.log(
  `\n${styles.green}${styles.bright}Happy coding! 🎉${styles.reset}\n`
);
