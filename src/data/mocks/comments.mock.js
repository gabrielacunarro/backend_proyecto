import { faker } from '@faker-js/faker';
import commentsRepository from '../../repositories/comments.repositories.js';
import winston from '../../utils/logger/winston.utils.js';
import "dotenv/config.js";

function commentsMock(uid, postId) {
    return {
        text: faker.music.songName(),
        user_id: uid,
        pid: postId
    };
}


export default async function createComment(id) {
    try {
        const data = commentsMock(id);
        const comment = await commentsRepository.create(data);
        winston.INFO("COMMENT CREATED:", comment);
    } catch (error) {
        winston.WARN("Error creating comment:", error);
    }
}

