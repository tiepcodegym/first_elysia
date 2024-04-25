import { Elysia } from 'elysia'
import PostController from "../controllers/PostController";
// import postController from "../controllers/PostController";
const router = new Elysia();

const postController = new PostController()
router.group('/test', (app) =>
    app
        .get("/posts", postController.getAll.bind(postController))
        .post("/post/create", postController.create.bind(postController))
        .put("/post/update/:id", postController.update.bind(postController))
        .delete("/post/delete/:id", postController.delete.bind(postController))
)
export default router;