package get.high.service;

import get.high.model.entity.UserInfo;

public interface IUserService extends IGeneralService<UserInfo> {
    Iterable<UserInfo> findAllByFullNameContaining(String fullName);
}
