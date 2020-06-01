import db from "../config/db.ts";
import * as types from "../types.ts";

const database = db.getDatabase();
const User = database.collection("users");

async function index() {
  try {
    const userList = await User.find();
    if (userList) {
      return userList;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function create(data: types.User) {
  try {
    const newUser = await User.insertOne(data);
    return newUser;
  } catch (error) {
    throw new Error("Unable to add new user");
  }
}

async function showProfile(id: string) {
  const profile = await User.find({ _id: { $oid: id } });
  return profile;
}

export default { index, create, showProfile };
