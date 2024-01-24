declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      NODE_ENV?: "development" | "production";
      PORT?: string;
      JSON_SECRET: string;
      PRODUCT_PER_PAGE?: string;
    }
  }
}

export {};
