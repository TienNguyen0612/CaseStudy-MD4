package get.high.service.impl;

import get.high.model.entity.Message;
import get.high.model.entity.UserInfo;
import get.high.repository.IMessageRepository;
import get.high.service.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MessageService implements IMessageService {
    @Autowired
    private IMessageRepository iMessageRepository;

    @Override
    public Iterable<Message> findAll() {
        return iMessageRepository.findAll();
    }

    @Override
    public Optional<Message> findById(Long id) {
        return iMessageRepository.findById(id);
    }

    @Override
    public Message save(Message message) {
        return iMessageRepository.save(message);
    }

    @Override
    public void remove(Long id) {
        iMessageRepository.deleteById(id);
    }
}
