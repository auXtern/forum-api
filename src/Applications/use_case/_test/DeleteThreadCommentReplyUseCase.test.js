const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const ThreadCommentRepository = require('../../../Domains/threads/comments/ThreadCommentRepository');
const ThreadCommentReplyRepository = require('../../../Domains/threads/comment-replies/ThreadCommentReplyRepository');
const DeleteThreadCommentReplyUseCase = require('../DeleteThreadCommentReplyUseCase');

describe('DeleteThreadCommentReplyUseCase', () => {

    it('should orchestrating the delete thread comment action correctly', async () => {
        // Arrange
        const useCasePayload = {
            owner: 'user-123',
            threadId: 'thread-123',
            commentId: 'comment-123',
            replyId: 'reply-123',
        };

        /** creating dependency of use case */
        const mockThreadRepository = new ThreadRepository();
        const mockThreadCommentRepository = new ThreadCommentRepository();
        const mockThreadCommentReplyRepository = new ThreadCommentReplyRepository();

        /** mocking needed function */
        mockThreadRepository.verifyThreadAvailability = jest.fn()
            .mockImplementation(() => Promise.resolve(useCasePayload.threadId));
        mockThreadCommentRepository.verifyThreadCommentAvailability = jest.fn()
            .mockImplementation(() => Promise.resolve(useCasePayload.commentId));
        mockThreadCommentReplyRepository.verifyThreadCommentReplyOwner = jest.fn()
            .mockImplementation(() => Promise.resolve(useCasePayload.replyId));
        mockThreadCommentReplyRepository.deleteThreadCommentReply = jest.fn()
            .mockImplementation(() => Promise.resolve(useCasePayload.replyId));


        /** creating use case instance */
        const deleteThreadCommentReply = new DeleteThreadCommentReplyUseCase({
            threadRepository: mockThreadRepository,
            threadCommentRepository: mockThreadCommentRepository,
            threadCommentReplyRepository: mockThreadCommentReplyRepository
        });

        // Action
        const getReplyId = await deleteThreadCommentReply.execute(useCasePayload);

        // Assert
        expect(getReplyId).toEqual(useCasePayload.replyId);

        expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
        expect(mockThreadCommentRepository.verifyThreadCommentAvailability).toBeCalledWith(useCasePayload.commentId, useCasePayload.threadId);
        expect(mockThreadCommentReplyRepository.verifyThreadCommentReplyOwner).toBeCalledWith(
            useCasePayload.owner,
            useCasePayload.replyId
        );
        expect(mockThreadCommentReplyRepository.deleteThreadCommentReply).toBeCalledWith(
            useCasePayload.replyId
        );
    });
});
