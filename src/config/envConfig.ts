import dotenv from "dotenv";

dotenv.config();

//Database
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
};
// /- Database

//Server
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};
// /- Server

//JWT
const JWT_KEY = process.env.JWT_KEY || "";

const JWT = {
  key: JWT_KEY,
};
// /- JWT

const config = {
  mysql: MYSQL,
  server: SERVER,
  jwtoken: JWT,
};

export default config;
