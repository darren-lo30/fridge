/* eslint-disable @typescript-eslint/no-unused-vars */

// Used to set environment variables
namespace NodeJS {
  export interface ProjectEnv {
    NODE_ENV: 'development' | 'production';
    APP_PORT?: string,
    DATABASE_URL: string;
    SESSION_SECRET: string;
    LOG_ERRORS: string;
    FRONT_END_URL: string,
  }

  export interface ProcessEnv extends ProjectEnv {}
}
