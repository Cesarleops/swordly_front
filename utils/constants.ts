const production = {
  apiUrl: "https://swordly.onrender.com/api",
};

const development = {
  apiUrl: "http://localhost:3031/api",
};

let envConfig =
  process.env.NODE_ENV === "development" ? development : production;

export default envConfig;
