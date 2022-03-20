package get.high.repository;

import get.high.model.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAccountRepository extends JpaRepository<Account, Long> {
    Iterable<Account> findAllByUsernameContaining(String username);
    Optional<Account> findByUsername(String username);
    Boolean existsByUsername(String name);
    Boolean existsByEmail(String name);
}
