const express = require('express')
const cors = require('cors')
const sql = require('mssql')
const SECRETS = require('./secrets')

const app = express()
app.use(cors())
app.get('/ReconStatus', (req, res) => {
   getReconStatus().then(json => res.json(json))
})

const getReconStatus = async () => {
   await sql.connect({
      server: SECRETS.server,
      database: SECRETS.database,
      user: SECRETS.dbUser,
      password: SECRETS.dbPassword,
      options: {
         trustServerCertificate: true,
         cryptoCredentialsDetails: { minVersion: 'TLSv1' }
      }
   });

   const { recordset } = await sql.query(
      `select * from dbo.ReconStatus
       where ReconDate >= '2021-12-15' 
       order by NeilsonNetCode, ReconDate;`
   );

   return recordset
}

const port = 5000
app.listen(port, () => {
   console.log(`>> API listening on http://localhost:${port}`)
})