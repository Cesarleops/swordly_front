const production = {
  apiUrl: "https://swordly.onrender.com/api",
  clientUrl: "https://swordly-front.vercel.app",
};

const development = {
  apiUrl: "http://localhost:3031/api",
  clientUrl: "http:localhost:3000",
};

let envConfig =
  process.env.NODE_ENV === "development" ? development : production;

export default envConfig;
