const UsersRepository = require("../repositories/users.repository.js");
const usersRepository = new UsersRepository();

const EmailManager = require("../helpers/email.js");
const emailManager = new EmailManager();

class UsersService {
  async deleteInactiveUsers() {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const inactiveUsers = usersRepository.findInactiveUsers(twoDaysAgo);
    for (let inactiveUser of inactiveUsers) {
      await usersRepository.deleteUserById(inactiveUser);
      await emailManager.sendDeletedUserMail(inactiveUser);
    }
  }
}

module.exports = UsersService;