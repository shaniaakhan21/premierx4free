module.exports = {
  apps: [
    {
      name: 'premierx-backend',
      script: './dist/server.js',
      env_production: {
        NODE_ENV: 'production',
        MONGO_URI:
          'mongodb+srv://adm:dszSgUOIPfa3qD6i@dev-test.d4soidj.mongodb.net/premierx4free_live?retryWrites=true&w=majority',
        TOKEN_SECRET: 'abc20fd4-c03e-44f1-b05i-cb30e1aa9a60'
      }
    }
  ]
}
