import {Elysia, t} from "elysia";
import {PostService} from "../service/PostService";
import {AppRole} from "../enum";

const postService = new PostService;
const routes = (app: any) => {
    app.get("/posts", async () => {
        let listPost = await postService.getAll()
        return listPost;
        });

    app.post("/post/create", async ({body}) => {
        const {title, content,user_id} = body;
        await postService.create({
            title: title,
            content: content,
            user_id: user_id
        })
        return 'create success';
    });

    app.put("/post/update/:id", async ({body,params}) => {
        const post_id = params.id;
        await postService.update(post_id,body)
        return 'update success';
    });

    app.delete("/post/delete/:id", async ({params}) => {
        const post_id = params.id;
        await postService.delete(post_id)
        return 'Delete success';
    });

}

export default routes;