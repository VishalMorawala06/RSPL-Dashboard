module.exports = {
  user: "rs_development",
  password: "P8L5fE123456_",
  database: "RSPL_Dashboard",
  server: "192.168.27.3",
  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
  },
};
