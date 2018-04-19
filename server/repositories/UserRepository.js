import {User} from "../models";
import BaseRepository from "./BaseRepository";
export default class UserRepository extends BaseRepository {
    constructor() {
        super('User');
    }
}
