const { Pool } = require("pg")


const pool = new Pool({
    connectionString: process.env.POSTGRES_URL ,
  })
  
pool.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool