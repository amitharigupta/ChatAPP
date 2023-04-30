require("dotenv").config();

function getBool () {
  return !!JSON.parse(String(process.env.DB_LOGGING).toLocaleLowerCase())
}

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "ecommerce_oy4k_user",
    "password": process.env.DB_PASSWORD || "sZY5fJATV8UmTVZol3tATr9FwDn5PdPf",
    "database": process.env.DB_NAME || "ecommerce_oy4k",
    "host": process.env.DB_HOST || "dpg-cgip8khr8t1g7lqshdcg-a.singapore-postgres.render.com",
    "port": process.env.DB_PORT || 5432,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": true,
      "native":true
    },
    "logging": getBool()
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
