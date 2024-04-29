const { Pool } = require("pg")


const pool = new Pool({
    connectionString: 'postgres://default:f1qAXSg9ZwUN@ep-small-tree-a2e2sef6.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require',
  })
  
pool.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool