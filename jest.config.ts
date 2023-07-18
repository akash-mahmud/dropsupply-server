import type { Config } from 'jest';
const config: Config = {
  clearMocks: true,


  setupFiles: ["dotenv/config"],

  verbose: true,

  preset: "ts-jest",
  testEnvironment: "node",

};
module.exports = config;
