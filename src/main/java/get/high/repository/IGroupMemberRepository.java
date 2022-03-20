package get.high.repository;

import get.high.model.entity.GroupMember;
import get.high.model.entity.LikeComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IGroupMemberRepository extends JpaRepository<GroupMember, Long> {
    Optional<GroupMember> findByGroups_IdAndUserInfo_Id(Long groups_id, Long userinfo_id);

    Iterable<GroupMember> findAllByUserInfo_IdAndStatus(Long userinfo_id, Integer status);

    Iterable<GroupMember> findAllByGroups_IdAndStatus(Long groups_id, Integer status);

    Iterable<GroupMember> findAllByStatus(Integer status);
}
