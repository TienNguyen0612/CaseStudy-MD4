package get.high.repository;

import get.high.model.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<UserInfo, Long> {
    Iterable<UserInfo> findAllByFullNameContaining(String fullName);

}
