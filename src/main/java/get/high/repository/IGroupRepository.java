package get.high.repository;

import get.high.model.entity.Groups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IGroupRepository extends JpaRepository<Groups, Long> {
    Iterable<Groups> findAllByNameContaining(String name);
}
