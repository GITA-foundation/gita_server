describe("API ProjectController", () => {
  describe("get public project list", () => {
    it.skip('Get /api/project/list', (done) => {
      request(sails.hooks.http.app)
        .get('/api/project/list')
        .end((err, res) => {

          res.status.should.be.equal(200)
          res.body.length.should.be.above(0);
          res.body[0].should.have.keys([
            'AdminUser', 'identity', 'isGitaStandard', 'logo', 'percent', 'title', 'token'
          ]);

          return done(err);
        });
    });
  });

  describe("get public project one", async () => {
    let project;
    before(async() => {
      const where = { status: 'publish' };
      project = await db.Project.findOne({ where });
    });

    it('Get /api/project/:id', async () => {
      request(sails.hooks.http.app)
        .get(`/api/project/${project.identity}`)
        .end((err, res) => {
          res.status.should.be.equal(200)
          res.body.should.be.an('object');
          res.body.should.have.keys([
            'identity', 'title', 'items', 'logo', 'status', 'token'
          ]);
        });
    });
  });

  describe("Create project by user", async () => {
    let user;
    let authorizationValue;

    before(async() => {
      user = await db.User.findOne();
      let token = TokenAuth.issueToken({
        sub: user.dataValues.id
      });
      authorizationValue = 'Bearer ' + token;
    });

    it.skip('POST /api/project', async () => {
      let projectData = {
        project_name: 'Project Name',
        token_ticker: 'Hii'
      };

      request(sails.hooks.http.app)
      .post('/api/project')
      .set('Authorization', authorizationValue)
      .send({ data: projectData })
      .end((err, res) => {
          res.status.should.be.equal(200)
          res.body.result.should.be.an('object');
          res.body.result.id.should.be.a('string');
        });
    });

  });



});
