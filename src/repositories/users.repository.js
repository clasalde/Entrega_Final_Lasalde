const UserModel = require("../models/user.model.js");

class UserRepository {
  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      return await UserModel.find();
    } catch (err) {
      throw err;
    }
  }

  async deleteUserById(id) {
    try {
      await UserModel.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  async findInactiveUsers(dateLimit) {
    return await UserModel.find({ last_connection: { $lt: dateLimit } })
  }
}

module.exports = UserRepository;
