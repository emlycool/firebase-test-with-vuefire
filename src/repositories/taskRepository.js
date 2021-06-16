// import {Message} from 'element-ui'
import baseRepository from '@/repositories/baseRepository'


class taskRepository extends baseRepository
{
    constructor(){
        super("tasks");
        this.tasks = []
    }

    getTasks(){
        this.getCollection((data) => this.tasks = data)
        return this
    }
}


export default new taskRepository