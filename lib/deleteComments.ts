import type { Comment } from "@prisma/client";
import prismadb from "./prismadb";

/**
 * Prisma doesnt allow onDelete: Cascade for self relations. Must do it manually. 
 * Be sure to execute this first before deleting other properties.
 * @param comments 
 */
export default async function deleteComments(comments: Comment[]) {
    const deleteReplies = []
    const deleteParentComments = []

    for (let comment of comments) {
        const replies = prismadb.comment.deleteMany({
            where: { parentCommentId: comment.id }
        })

        const parentComment = prismadb.comment.delete({
            where: { id: comment.id }
        })

        deleteReplies.push(replies)
        deleteParentComments.push(parentComment)
    }

    // Delete replies first to prevent prisma error
    await Promise.all(deleteReplies)
    await Promise.all(deleteParentComments)
}