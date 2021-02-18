const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const userStory = process.argv[2];
const stack = process.argv[3];

const FRONTEND = "frontend";
const BACKEND = "backend";

if (stack && userStory) {
  runTestsByStack(stack);
} else if (!stack && userStory) {
  runTestsByStory();
} else {
  runAllTests();
}

async function runTestsByStory() {
  await runTestsByStack(FRONTEND);
  await runTestsByStack(BACKEND);
}

async function runAllTests() {
  await runAllTestsFor(FRONTEND);
  await runAllTestsFor(BACKEND);
}

function runAllTestsFor(stack) {
  return runSpawn("npm", [
    "run",
    "test",
    "--prefix",
    `${stack === FRONTEND ? "./front-end" : "./back-end"}`,
  ]);
}

function runConfig(stack, value = "", set = true) {
  return runSpawn("npm", [
    "config",
    set ? "set" : "delete",
    stack === FRONTEND
      ? "starter-restaurant-reservation-front-end:testFile"
      : "starter-restaurant-reservation-back-end:testFile",
    value,
  ]);
}

function runTestsByStack(stack) {
  const folderPath = path.join(
    __dirname,
    "..",
    stack === FRONTEND ? "front-end/e2e" : "back-end/test"
  );

  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, async (error, files) => {
      if (error) {
        reject(`error: ${error.message}`);
      }

      const filePath = path.join(
        folderPath,
        files.find(
          (file) => parseInt(file.split("-")[1]) === parseInt(userStory)
        )
      );
      await runConfig(stack, filePath);
      await runSpawn("npm", ["run", `test:${stack}`]);
      await runConfig(stack, "", false);
      resolve();
    });
  });
}

function runSpawn(command, args = []) {
  const childProcess = spawn(command, args);
  return new Promise((resolve, reject) => {
    childProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    childProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
    childProcess.on("error", (error) => {
      reject(`${stack} error: ${error.message}`);
    });
    childProcess.on("close", (code) => {
      resolve(`npm process exited with code ${code}`);
    });
  });
}
