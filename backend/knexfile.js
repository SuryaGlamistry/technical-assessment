export default {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "RootPassword123!", // must match docker-compose.yml
      database: process.env.DB_NAME || "mini_hiring"
    },
    migrations: {
      directory: "./migrations"
    }
  }
};
