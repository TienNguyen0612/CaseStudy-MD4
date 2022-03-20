package get.high.service;

import get.high.model.entity.GroupMember;

import java.util.Optional;

public interface IGroupMemberService extends IGeneralService<GroupMember> {
    Optional<GroupMember> findByGroups_IdAndUserInfo_Id(Long groups_id, Long userinfo_id);

    Iterable<GroupMember> findAllByUserInfo_IdAndStatus(Long userinfo_id, Integer status);

    Iterable<GroupMember> findAllByGroups_IdAndStatus(Long groups_id, Integer status);

    Iterable<GroupMember> findAllByStatus(Integer status);
}
