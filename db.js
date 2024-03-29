const { Pool } = require("pg")


const pool = new Pool({
    connectionString: 'postgres://default:76SuxrvNzMKg@ep-sweet-night-a2kqai9z-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require',
  })
  
pool.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool