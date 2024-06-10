const { Pool } = require("pg")


const pool = new Pool({
    connectionString: 'postgres://default:uBhbiy10Tnqd@ep-solitary-hat-a4qzzmis.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
  })
  
pool.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool