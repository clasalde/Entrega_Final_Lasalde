const UsersService = require("../services/users.services.js");
const usersService = new UsersService();

const UsersRepository = require("../repositories/users.repository.js");
const usersRepository = new UsersRepository();

const { EErrors } = require("../utils/errors/enums.js");
const CustomError = require("../utils/errors/custom-error.js");

const EmailManager = require("../helpers/email.js");
const emailManager = new EmailManager();

const mongoose = require("mongoose");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

const layer = "Controller";
const router = "Users";

class UsersController {
  async getUsers(req, res) {
    req.logger.info(
      `Request to get users. Layer:${layer}, Router: ${router}, Date: ${new Date()}`
    );
    try {
      const users = await usersRepository.getUsers();
      res.status(200).json(users);
    } catch (err) {
      req.logger.error(
        `Error while getting users. Layer:${layer}, Router: ${router}. Error: ${err}, Date: ${new Date()}`
      );
      res.status(500).json(err);
    }
  }

  async getUserById(req, res) {
    const { pid } = req.params;
    try {
      req.logger.info(
        `Request to get user by id. Layer:${layer}, Router: ${router}, Date: ${new Date()}`
      );
      if (!isValidObjectId(pid)) {
        req.logger.warn(
          `Invalid user. Layer:${layer}, Router: ${router}, Date: ${new Date()}`
        );
        throw CustomError.crearError({
          name: "get user by id",
          cause: `Id not valid`,
          message: `Valid id Paramater needed as param`,
          code: EErrors.MISSING_VALUE,
        });
      } else {
        const user = await usersRepository.findById(pid);
        res.status(200).json(user);
      }
    } catch (err) {
      req.logger.error(
        `Error while getting user by id. Layer:${layer}, Router: ${router}. Error: ${err}, Date: ${new Date()}`
      );
      res.status(500).json(err);
    }
  }

  async deleteUserById(req, res) {
    const { uid } = req.params;
    try {
      req.logger.info(
        `Request to delete user by id. Layer:${layer}, Router: ${router}, Date: ${new Date()}`
      );
      if (!isValidObjectId(uid)) {
        req.logger.warn(
          `Invalid user. Layer:${layer}, Router: ${router}, Date: ${new Date()}`
        );
        throw CustomError.crearError({
          name: "Delete user by id",
          cause: `Invalid id`,
          message: `Valid id Paramater needed as param`,
          code: EErrors.MISSING_VALUE,
        });
      } else {
        const user = await usersRepository.findById(uid);
        await usersRepository.deleteUserById(uid);
        await emailManager.sendDeletedUserMail(user);
        res.status(200).json({ message: `User with id ${uid} deleted` });
      }
    } catch (err) {
      req.logger.error(
        `Error while deleting user by id. Layer:${layer}, Router: ${router}. Error: ${err}, Date: ${new Date()}`
      );
      res.status(500).json(err);
    }
  }

  async deleteInactiveUsers(req, res) {
    try {
      req.logger.info(
        `Request to delete users with last activity older than 2 days. Layer:${layer}, Router: ${router}, Date: ${new Date()}`
      );
      const response = await usersService.deleteInactiveUsers();
      res.status(200).json({ message: `Inactive users deleted` });
    } catch (err) {
      req.logger.error(
        `Error while deleting user by id. Layer:${layer}, Router: ${router}. Error: ${err}, Date: ${new Date()}`
      );
      res.status(500).json(err);
    }
  }
}

module.exports = UsersController;