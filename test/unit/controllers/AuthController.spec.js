describe("AuthContoller", (done) => {
  describe("login should success", () => {
    before(async() => {
      try {

      const testUser = {
        username: "gita",
        email: "gita@gita.foundation"
      };
      const createdTestUser = await db.User.create(testUser);
      var passport = {
        protocol: 'local',
        password: "gita"
      };
      const createdPassport = await db.Passport.create(passport);
      await createdTestUser.setPassports(createdPassport)
      } catch (e) {
        console.log(e, '===');
      }
    });

    it("execute login by id", (done) => {
      const loginUser = {
        identifier: "gita",
        password: "gita"
      };
      request(sails.hooks.http.app).post("/auth/local").send(loginUser).expect('Location', "/").end(function(err, res) {
        if (res.statusCode === 500) {
          return done(res.body);
        }
        res.statusCode.should.equal(302);
        return done(err);
      });
    });

    it("execute login by id, but wrong password", (done) => {
      const loginUser = {
        identifier: "gita",
        password: "wrong"
      };
      request(sails.hooks.http.app).post("/auth/local").send(loginUser).expect('Location', "/").end(function(err, res) {
        if (res.statusCode === 500) {
          return done(res.body);
        }
        res.statusCode.should.equal(302);
        return done(err);
      });
    });
  });

  it("execute register", (done) => {
    const newUser = {
      contact: "testuser",
      email: "testuser@gita.foundation",
      password: "testuser",
      confirmPassword: "testuser",
      node: 3
    };
    request(sails.hooks.http.app).post("/auth/local/register").send(newUser).end(function(err, res) {
      return db.User.findOne({
        where: {
          email: "testuser@gita.foundation"
        }
      }).then(function(newUser) {
        newUser.email.should.equal("testuser@gita.foundation");
        return done(err);
      });
    });
  });
});
