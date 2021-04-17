module.exports = {
  servers: {
    one: {
      host: '143.110.230.194',
      username: 'root',
      password: 'thisIsThePassw0rd'
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
      ROOT_URL: 'http://143.110.230.194',
      MONGO_URL: 'mongodb://mongodb/grub-n-go',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },

    docker: {
      image: 'abernix/meteord:node-12-base',
    },

    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },
};