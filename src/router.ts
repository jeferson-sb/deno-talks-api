import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getTalks,
  getTalk,
  addTalk,
  deleteTalk,
  updateTalk,
} from "./controllers/TalkController.ts";
import { getUsers, registerUser } from "./controllers/UserController.ts";
import { getProfile } from "./controllers/ProfileController.ts";
import { addLike } from "./controllers/LikeController.ts";
import { addDislike } from "./controllers/DislikeController.ts";

const router = new Router();

router
  .get("/api/v1/talks", getTalks)
  .get("/api/v1/talks/:id", getTalk)
  .post("/api/v1/talks", addTalk)
  .put("/api/v1/talks/:id", updateTalk)
  .delete("/api/v1/talks/:id", deleteTalk);

router.get("/api/v1/users", getUsers).post("/api/v1/users", registerUser);

router.get("/api/v1/profile", getProfile);
router.post("/api/v1/talks/:id/like", addLike);
router.post("/api/v1/talks/:id/dislike", addDislike);

export default router;
