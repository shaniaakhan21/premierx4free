module.exports = {
  apps: [
    {
      name: 'premierx-backend',
      script: './dist/server.js',
      env_production: {
        NODE_ENV: 'development',
        MONGO_URI:
          'mongodb+srv://adm:dszSgUOIPfa3qD6i@dev-test.d4soidj.mongodb.net/premierx4free_live?retryWrites=true&w=majority',
        TOKEN_SECRET: 'abc20fd4-c03e-44f1-b05i-cb30e1aa9a60',
        EMAIL_HOST: 'smtp.office365.com',
        EMAIL_PORT: 587,
        EMAIL_FROM: 'PremieRx4Free <info@premierx4free.com>',
        EMAIL_USERNAME: 'info@premierx4free.com',
        EMAIL_PASSWORD: 'rT@6_7cqT$',
        FRONTEND_URL: 'https://premierx4free.com',
        NOTIFY_COMPANY_CREATE: 'info@premierx4free.com',
        AWS_ACCESS_KEY_ID: 'DO00YTWHX9E8V6PXDQ9B',
        AWS_SECRET_ACCESS_KEY: 'tkOSuUFrZyoXktunYauz+UjA2nqa8M/jKWfqDVeY62U',
        AWS_REGION: 'us-east-1',
        AWS_ENDPOINT: 'https://nsur.nyc3.digitaloceanspaces.com'
      }
    }
  ]
}
