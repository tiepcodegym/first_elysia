import {AppDataSource} from "../data-source";
import {Post} from "../entity/Post";
export class PostService {
    private repository = AppDataSource.getRepository(Post)
    getAll = async () => {
        return await this.repository.find()
    }
    create = async (data) => {
        return await this.repository.save(data)
    }
    findById = async (id) => {
        return await this.repository.find({where: {id: id}})
    }
    update = async (id,data) => {
        return await this.repository.update(id,data)
    }
    delete = async (id) => {
        await this.repository.delete(id)
    }
}
export default PostService;