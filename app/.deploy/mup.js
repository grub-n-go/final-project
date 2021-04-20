module.exports = {
  servers: {
    one: {
      host: 'grubngo.xyz',
      username: 'root',
      password: 'grub-n-go'
    }
  },

  app: {
    name: 'grub-n-go',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      ROOT_URL: 'https://grubngo.xyz/',
      MONGO_URL: 'mongodb://mongodb/grub-n-go',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },

    docker: {
      image: 'abernix/meteord:node-12-base',
    },

    enableUploadProgressBar: true
  },

  proxy: {
    domains: 'grubngo.xyz',
    ssl: {
      letsEncryptEmail: 'vizcarra@hawaii.edu',
      forceSSL: true
    }
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },
};