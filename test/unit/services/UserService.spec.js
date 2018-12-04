describe("UserService", () => {

  it("Create",async() =>{
    let user = {
      username: "testUserService2",
      email: "testUserService2@gmail.com",
    }
    let newUser = await UserService.create(user);
    newUser.dataValues.should.have.keys([
      'type', 'isPaid', 'isVerified', 'isPrivacyTermsAgreed', 'id',
      'username', 'email', 'updatedAt', 'createdAt', 'isDisabled', 'role'
    ]);
    newUser.username.should.be.equal(user.username);
    newUser.email.should.be.equal(user.email);
  });

});
