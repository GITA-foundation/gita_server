/**
Development environment settings

This file can include shared settings for a development team,
such as API keys or remote database passwords.  If you're using
a version control solution for your Sails app, this file will
be committed to your repository unless you add it to your .gitignore
file.  If your repository will be publicly viewable, don't add
any private information to this file!
 */
module.exports = {
  port: process.env.PORT || 1337,
  environment: 'development',
  domain: 'http://localhost:1337',
  appDomain: 'http://localhost:3000',
  createInitData: true,
  initData: 'gita',
  log: {
    level: 'verbose'
  },
  mail: {
    type: 'smtp',
    active: true,
    config: {
      from: 'test@exma-square.co',
      provider: {
        port: 465,
        host: "smtp.gmail.com",
        domains: ["gmail.com", "googlemail.com"],
        secure: true,
        auth: {
          user: '--account--',
          pass: '--password--'
        },
        debug: true,
        authMethod: 'PLAIN'
      }
    }
  },
  forword: {
    active: false,
    orderRecipients: [
      '--gmail--'
    ],
    recipients: [
      '--gmail--'
    ]
  },
  aws: {
    accessKeyId: '--key--',
    secretAccessKey: '--key---',
    myBucket: 'gita.dev',
  },
  db: {
    'username': process.env.MYSQL_USER || "root",
    'password': process.env.MYSQL_PASSWORD || "clonn1234",
    'host': process.env.MYSQL_1_PORT_3306_TCP_ADDR || "127.0.0.1",
    'port': process.env.MYSQL_1_PORT_3306_TCP_PORT || 3306,
    'database': 'gita_dev',
    'dialect': 'mysql',
    'force': true,
    'logging': console.log,
    'timezone': "+08:00"
  },
  store: {
    name: 'GITA Test Service',
    name2: '=== NAME 2 ===',
    name3: '=== NAME 3 ===',
    serviceMail: 'test@exma-square.co'
  },
  googleAnalytics: {
    trackingID: '----',
  },
  jwt: {
    token_secret: '=== YOUR TOKEN SECRET ==='
  },
  passport: {
    local: {
      strategy: require('passport-local').Strategy
    },
    // facebook: {
    //   name: 'Facebook',
    //   protocol: 'oauth2',
    //   strategy: require('passport-facebook').Strategy,
    //   options: {
    //     clientID: '-----',
    //     clientSecret: '------',
    //     scope: ['email', 'public_profile'],
    //     callbackURL: "http://dev.gita.com/api/auth/facebook/callback"
    //   }
    // }
  },
  schemaVersion: 1,
  adminPermission: {
    members: ['members'],
  }
};


/**
Set the default database connection for models in the development       *
environment (see config/connections.js and config/models.js )           *
 */
