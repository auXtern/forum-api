const ThreadCommentReplyRepository = require('../ThreadCommentReplyRepository');

describe('ThreadCommentReplyRepository interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        // Arrange
        const threadCommentReplyRepository = new ThreadCommentReplyRepository();

        // Action and Assert
        await expect(threadCommentReplyRepository.addThreadCommentReply({})).rejects.toThrowError('THREAD_COMMENT_REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(threadCommentReplyRepository.getThreadCommentReplyByCommentId({})).rejects.toThrowError('THREAD_COMMENT_REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(threadCommentReplyRepository.verifyThreadCommentReplyOwner({})).rejects.toThrowError('THREAD_COMMENT_REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(threadCommentReplyRepository.deleteThreadCommentReply({})).rejects.toThrowError('THREAD_COMMENT_REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
});
