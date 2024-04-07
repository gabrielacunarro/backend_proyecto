import { faker } from '@faker-js/faker';
import commentsRepository from '../../repositories/comments.repositories.js';
import dbConnection from '../../utils/db.js';
import "dotenv/config.js";

function commentsMock(userId, postId) {
    return {
        text: faker.music.songName(),
        user_id: userId,
        pid: postId
    };
}


export default async function createComment(id) {
    try {
        const data = commentsMock(id);
        const comment = await commentsRepository.create(data);
        console.log("COMMENT CREATED:", comment);
    } catch (error) {
        console.error("Error creating comment:", error);
    }
}

