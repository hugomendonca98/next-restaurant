const authConfig = {
  jwt: {
    secret: process.env.API_SECRET || 'default',
    expireIn: '1d',
  },
}

export default authConfig
