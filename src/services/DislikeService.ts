import db from "../config/db.ts";

const database = db.getDatabase();
const Talk = database.collection("talks");
const User = database.collection("users");

async function store(talkId: string, userId: string) {
  try {
    const talk = await Talk.findOne({ _id: { $oid: talkId } });
    const user = await User.findOne({ _id: { $oid: userId } });
    const talkDisliked = talk._id.$oid;

    const isLiked = user.likes.find(
      (talkLiked: string) => talkId === talkLiked
    );

    if (!isLiked) {
      await User.updateOne(
        { _id: { $oid: userId } },
        { $set: { dislikes: [...(user.dislikes ?? []), talkDisliked] } }
      );
    } else {
      const filteredLikes = user.likes.filter((talk: string) => {
        return talkId !== talk;
      });
      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            likes: filteredLikes,
            dislikes: [...(user.dislikes ?? []), talkDisliked],
          },
        }
      );
    }

    return talk;
  } catch (error) {
    throw new Error(error);
  }
}

export default { store };
