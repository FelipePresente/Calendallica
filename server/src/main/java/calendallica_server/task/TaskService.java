package calendallica_server.task;

import org.springframework.stereotype.Service;

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

    public Task create(TaskCreationDTO data) {
        User user = this.userRepository.findById(data.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task newTask = new Task(data.title(), data.description(), data.dueDate(), user);

        return this.taskRepository.save(newTask);
    }
}
