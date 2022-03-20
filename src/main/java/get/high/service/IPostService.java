package get.high.service;

import get.high.model.entity.Post;

public interface IPostService extends IGeneralService<Post> {
    Iterable<Post> findAllByHasTag(String hasTag);

    Iterable<Post> findAllByUserInfo_Id(Long userinfo_id);

    Iterable<Post> findAllByUserInfo_IdAndStatus(Long userinfo_id, Integer status);

    Iterable<Post> findAllByStatus(Integer status);

    Iterable<Post> findAllByGroups_Id(Long groups_id);
}
