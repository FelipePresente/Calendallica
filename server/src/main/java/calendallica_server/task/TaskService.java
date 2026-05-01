package calendallica_server.task;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import calendallica_server.exception.ResourceNotFoundException;
import calendallica_server.task.dto.TaskCreationDTO;
import calendallica_server.user.User;
import calendallica_server.user.UserRepository;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<Task> findAll(UUID userId) {
        return this.taskRepository.findByUserId(userId);
    }

    public Task create(TaskCreationDTO data) {
        User user = this.userRepository.findById(data.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        Task newTask = new Task(data.title(), data.description(), data.dueDate(), user);

        return this.taskRepository.save(newTask);
    }

    public void delete(UUID id) {
        if (!this.taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found");
        }

        this.taskRepository.deleteById(id);
    }
}
