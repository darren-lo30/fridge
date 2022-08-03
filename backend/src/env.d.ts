/* eslint-disable @typescript-eslint/no-unused-vars */

// Used to set environment variables
namespace NodeJS {
  export interface ProjectEnv {
    NODE_ENV: 'development' | 'production';
    PORT?: string,
    DATABASE_URL: string;
    SESSION_SECRET: string;
  }

  export interface ProcessEnv extends ProjectEnv {}
}
