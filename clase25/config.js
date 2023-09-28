
module.exports = () => ({
  db_user: process.env.DB_USER || 'FERPE',
  db_host: process.env.DB_HOST || 'FERPE',
  db_password: process.env.DB_PASSWORD || 'FERPE',
  db_name: process.env.DB_NAME || 'FERPE'
})