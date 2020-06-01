import db from "../config/db.ts";

const database = db.getDatabase();
const Talk = database.collection("talks");
const User = database.collection("users");

async function store(talkId: string, userId: string) {
  try {
    const talk = await Talk.findOne({ _id: { $oid: talkId } });
    const user = await User.findOne({ _id: { $oid: userId } });
    const talkLiked = talk._id.$oid;

    await User.updateOne(
      { _id: { $oid: userId } },
      { $set: { likes: [...(user.likes ?? []), talkLiked] } }
    );

    await Talk.updateOne({ _id: talk._id }, { $inc: { likes: 1 } });

    return talk;
  } catch (error) {
    throw new Error(error);
  }
}

export default { store };
