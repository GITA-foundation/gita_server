import { formSchema } from './formSchema';
import fs from 'fs-extra';

var self = module.exports = {

  databaseDropAndCreate: async () => {
    if(sails.config.db.dialect == 'mysql'){
      await db.sequelize.query(
        `DROP DATABASE IF EXISTS ${sails.config.db.database};`);
      await db.sequelize.query(
        `CREATE DATABASE IF NOT EXISTS ${sails.config.db.database} CHARACTER SET utf8 COLLATE utf8_unicode_ci;`);
      await db.sequelize.query(`USE ${sails.config.db.database};`);
    }
    else if (sails.config.db.dialect == 'sqlite'){
      await fs.removeSync(sails.config.db.storage);
    }
  },

  database: async () => {
    let force = sails.config.db.force;
    await db.sequelize.sync({force});
  },

  basicData: async () => {
    const formOpts = { where: { id: 1 }, defaults: { schema: formSchema }};
    await db.FormSchema.findOrCreate(formOpts);
    await self.createAdminUser();
  },

  testData: async () => {
    await self.createSuperNodeUser();

    await self.createNodeUser();

    const entityUsers = await self.createBasicUsersReturnEntityUsers();

    await self.createProjects(entityUsers);
  },

  createAdminUser: async (role = 'admin') => {
    const admin = {
      username: role,
      fullName: role,
      contact: role,
      email: `${role}@gita.foundation`,
      type: 'personal',
      title: 'Admin',
      company: role,
      phone: '0900000000',
      country: 'Taiwan',
      address: '',
      isVerified: true,
      role
    };

    const userOptions = { where: { username: role }, defaults: admin }
    const [createdAdmin] = await db.User.findOrCreate(userOptions);

    const passport = {
      protocol: 'local',
      password: 'admin',
      UserId: createdAdmin.id
    };

    const passportOptions = { where: {UserId: createdAdmin.id}, defaults: passport }
    await db.Passport.findOrCreate(passportOptions);
  },


  createSuperNodeUser: async (role = 'supernode') => {
    const newSuperNode = {
      fullName: 'Gita Foundation',
      username: `${role}@gita.foundation`,
      email: `${role}@gita.foundation`,
      type: 'entity',
      avatar: 'https://image.freepik.com/free-photo/cute-cat-picture_1122-449.jpg',
      role,
      address: `No.1, Sec. 1, Rd., Da-an District, Taipei City 10603, Taiwan (R.O.C.).`,
      phone: '0955666888',
      company: 'Gita Foundation',
      title: 'co-founder',
      NodeId: 1,
      isVerified: true,
      contact: role,
    };

    const createNewSuperNode = await db.User.create(newSuperNode);

    const passport = {
      protocol: 'local',
      password: 'supernode',
      UserId: createNewSuperNode.id
    };

    await db.Passport.create(passport);

  },

  createNodeUser: async (role = 'node') => {
    const newNode = {
      fullName: 'TestNode',
      username: `${role}@gita.foundation`,
      email: `${role}@gita.foundation`,
      type: 'entity',
      avatar: 'https://image.freepik.com/free-photo/cute-cat-picture_1122-449.jpg',
      role,
      address: 'No.$, Sec. $, Rd., Da-an District, Taipei City 10603, Taiwan (R.O.C.).',
      phone: '0955666888',
      company: 'Node',
      title: 'co-founder',
      NodeId: 1,
      isVerified: false
    };
    const createNewNode = await db.User.create(newNode);
    const passport = {
      protocol: 'local',
      password: 'node',
      UserId: createNewNode.id
    };
    await db.Passport.create(passport);
  },

  createBasicUsersReturnEntityUsers: async (role = 'user') => {
    let entityUsers = [];
    for (let i=0; i <= 3; i++) {
      let type = i % 2 === 0 ? 'entity' : 'personal';
      let newUser = {
        fullName: `TestUser${i}`,
        username: `user${i}@gita.foundation`,
        email: `user${i}@gita.foundation`,
        type,
        contact: type === 'personal' ? 'Contact-Alice' : `USER${i}`,
        company: `USER${i}`,
        title: 'CEO',
        avatar: 'https://image.freepik.com/free-photo/cute-cat-picture_1122-449.jpg',
        role,
        address: `No.${i}, Sec. ${i}, Rd., Da-an District, Taipei City 10603, Taiwan (R.O.C.).`,
        phone: '0937397377',
        NodeId: 3,
        isVerified: _.sample([true, false]),
      };

      let createNewUser = await db.User.create(newUser);
      if (type === 'entity') entityUsers.push(createNewUser);
      let passport = {
        protocol: 'local',
        password: `user${i}`,
        UserId: createNewUser.id
      };
      await db.Passport.create(passport);
    }
    return entityUsers;
  },

  createProjects: async (entityUsers) => {
    const projects = [
      {
        logo: '/projects/ubex.png',
        title: 'Ubex',
        token: 'UBEX',
        UserId: entityUsers[0].id
      },
      {
        logo: '/projects/pgc.jpeg',
        title: 'Paygine',
        token: 'PGC',
        UserId: entityUsers[1].id
      }
    ];

    for (let i=0; i < projects.length; i++) {
      let newData = projects[i];
      newData.status = 'publish';
      newData.isVerified = true;
      newData.AdminUserId = 2;
      newData.items = {}
      await db.Project.create(newData);
    }
  }
}
