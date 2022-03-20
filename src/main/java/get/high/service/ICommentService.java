package get.high.service;

import get.high.model.entity.Comment;

public interface ICommentService extends IGeneralService<Comment> {
    Iterable<Comment> findAllByPost_Id(Long id);
}
