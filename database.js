const sql = require('mssql');
const SECRETS = require('./secrets');
const dayjs = require('dayjs');

const sqlConfig = {
   server: SECRETS.server,
   database: SECRETS.database,
   user: SECRETS.dbUser,
   password: SECRETS.dbPassword,
   options: {
      trustServerCertificate: true,
      cryptoCredentialsDetails: { minVersion: 'TLSv1' }
   }
}

function getMonday(date = new Date()) {
   date = new Date(date)
   const day = date.getDay()
   const diff = date.getDate() - day + (day === 0 ? -6 : 1)
   return new Date(date.setDate(diff))
}

const GetNetworksAPI = async function () {
   const query =
      `select distinct NeilsonNetCode from dbo.ReconStatus 
      order by NeilsonNetCode asc;`;

   await sql.connect(sqlConfig);
   const { recordset } = await sql.query(query);
   return recordset;
};

const GetReconsAPI = async function () {
   const dateFilter = dayjs(getMonday()).format('YYYY-MM-DD');
   const query =
      `select * from dbo.ReconStatus 
      where ReconDate >= '${dateFilter}' 
      order by NeilsonNetCode, ReconDate;`;

   await sql.connect(sqlConfig);
   const { recordset } = await sql.query(query);
   return recordset;
};

module.exports = {
   GetNetworksAPI,
   GetReconsAPI
};