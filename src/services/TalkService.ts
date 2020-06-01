import db from "../config/db.ts";
import * as types from "../types.ts";

const database = db.getDatabase();
const Talk = database.collection("talks");
const User = database.collection("users");

async function index(userId?: string) {
  try {
    if (userId) {
      const userInterests = await User.findOne({ _id: { $oid: userId } });
      const talkList = await Talk.find({
        topics: { $in: userInterests.topics },
      });
      if (talkList) {
        return talkList;
      }
    } else {
      const talkList = await Talk.find();
      if (talkList) {
        return talkList;
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function show(id: number) {
  try {
    const talk = await Talk.find({ _id: { $oid: id } });
    if (talk) {
      return talk;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function store(data: types.Talk) {
  try {
    const newTalk = await Talk.insertOne(data);
    const user = await User.findOne({ _id: { $oid: data.speaker } });
    const previousTalks = user.talks || [];

    await User.updateOne(
      { _id: user._id },
      { $set: { talks: [...previousTalks, newTalk] } }
    );

    return newTalk;
  } catch (error) {
    throw new Error("Unable to add new talk");
  }
}

async function update(id: number, speaker: string, updatedData: any) {
  try {
    const updatedTalk = await Talk.updateOne(
      { _id: { $oid: id }, speaker },
      { $set: updatedData }
    );
    return updatedTalk;
  } catch (error) {
    throw new Error(`Unable to update talk: ${error.message}`);
  }
}

async function destroy(id: number, speaker: string) {
  try {
    await Talk.deleteOne({ _id: { $oid: id }, speaker });
  } catch (error) {
    throw new Error(`Unable to delete talk: ${error.message}`);
  }
}

export default { index, show, store, destroy, update };
