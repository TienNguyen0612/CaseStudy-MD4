package get.high.service;

import get.high.model.entity.Account;

import java.util.Optional;

public interface IAccountService extends IGeneralService<Account> {
    Iterable<Account> findAllByUsername(String username);

    Optional<Account> findByUsername(String name);

    Boolean existsByUsername(String name);

    Boolean existsByEmail(String email);
}
