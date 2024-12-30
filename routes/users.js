// const express = require('express');
import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

// get all users
router.get("/", getUsers);

// get single user
router.get("/:id", getUserById);

// create user
router.post("/", createUser);

// update user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

export default router;
