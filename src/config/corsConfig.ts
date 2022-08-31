import { CorsOptions } from 'cors';

const corsConfig : CorsOptions = {
  origin: process.env.FRONT_END_URL,
  credentials: true,
};

export default corsConfig;
