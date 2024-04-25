import PostService from "../service/PostService";

class PostController {
    private readonly postService: PostService;

    constructor() {
        this.postService = new PostService();
    }
    async getAll() {
        console.log(this)
        let listPost = await this.postService.getAll()
        return listPost;
    }
    //es6
    create = async ({body}) => {
        try {
            let data = {
                title: body.title,
                content: body.content,
                user_id: body.user_id
            };
            await this.postService.create(data)
            return "create success";
        } catch (error) {
            console.error("Lỗi khi thêm mới bài viết:", error);
            return "Đã xảy ra lỗi khi thêm mới bài viết";
        }

    }
    update = async ({body, params}) => {
        try {
            await this.postService.update(params.id, {
                title: body.title,
                content: body.content
            });
            return 'update success'
        } catch (error) {
            console.error("Lỗi khi cập nhật bài viết:", error);
            return "Đã xảy ra lỗi khi cập nhật bài viết";
        }
    }
    delete = async ({params}) => {
        await this.postService.delete(params.id)
        return 'Delete success';
    }
}

export default PostController;