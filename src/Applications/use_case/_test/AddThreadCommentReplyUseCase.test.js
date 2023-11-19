const AddThreadCommentReply = require('../../../Domains/threads/comment-replies/entities/AddThreadCommentReply');
const AddedThreadCommentReply = require('../../../Domains/threads/comment-replies/entities/AddedThreadCommentReply');
const AddThreadCommentReplyUseCase = require('../AddThreadCommentReplyUseCase');
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const ThreadCommentRepository = require("../../../Domains/threads/comments/ThreadCommentRepository");
const ThreadCommentReplyRepository = require("../../../Domains/threads/comment-replies/ThreadCommentReplyRepository");
describe('AddThreadCommentReplyUseCase', () => {

    it('should orchestrating the add thread action correctly', async () => {
        // Arrange
        const useCasePayload = {
            owner: 'user-123',
            threadId: 'thread-123',
            commentId: 'comment-123',
            content: 'sebuah balasan',
        };

        const mockAddedThreadCommentReply = new AddedThreadCommentReply({
            id: 'reply-123',
            content: useCasePayload.content,
            owner: useCasePayload.owner,
        });

        /** creating dependency of use case */
        const mockThreadRepository = new ThreadRepository();
        const mockThreadCommentRepository = new ThreadCommentRepository();
        const mockThreadCommentReplyRepository = new ThreadCommentReplyRepository();

        /** mocking needed function */
        mockThreadRepository.verifyThreadAvailability = jest.fn()
            .mockImplementation(() => Promise.resolve(useCasePayload.threadId));

        mockThreadCommentRepository.verifyThreadCommentAvailability = jest.fn()
            .mockImplementation(() => Promise.resolve(useCasePayload.commentId));

        mockThreadCommentReplyRepository.addThreadCommentReply = jest.fn()
            .mockImplementation(() => Promise.resolve(mockAddedThreadCommentReply));

        /** creating use case instance */
        const getThreadCommentReplyUseCase = new AddThreadCommentReplyUseCase({
            threadRepository: mockThreadRepository,
            threadCommentRepository: mockThreadCommentRepository,
            threadCommentReplyRepository: mockThreadCommentReplyRepository,
        });

        // Action
        const addThreadCommentReply = await getThreadCommentReplyUseCase.execute(useCasePayload);

        // Assert
        expect(addThreadCommentReply).toStrictEqual(mockAddedThreadCommentReply);

        expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
        expect(mockThreadCommentRepository.verifyThreadCommentAvailability).toBeCalledWith(useCasePayload.commentId, useCasePayload.threadId);
        expect(mockThreadCommentReplyRepository.addThreadCommentReply).toBeCalledWith(
            useCasePayload.owner,
            useCasePayload.commentId,
            new AddThreadCommentReply({
                content: useCasePayload.content
            })
        );
    });
});
