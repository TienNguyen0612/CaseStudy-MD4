package get.high.service;

import get.high.model.entity.Groups;

public interface IGroupService extends IGeneralService<Groups> {
    Iterable<Groups> findAllByName(String name);
}
