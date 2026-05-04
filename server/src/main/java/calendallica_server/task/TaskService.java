package calendallica_server.task;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import calendallica_server.exception.ResourceNotFoundException;
import calendallica_server.task.dto.TaskCreationDTO;
import calendallica_server.task.dto.TaskResponseDTO;
import calendallica_server.task.dto.TaskUpdateDTO;
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

    public List<TaskResponseDTO> findAllByUser(UUID userId) {
        List<Task> tasks = this.taskRepository.findByUserId(userId);

        return tasks.stream()
                .map(TaskResponseDTO::fromEntity)
                .toList();
    }

    public TaskResponseDTO create(TaskCreationDTO data, UUID userId) {
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        Task newTask = new Task(data.title(), data.description(), data.dueDate(), user);

        this.taskRepository.save(newTask);

        return TaskResponseDTO.fromEntity(newTask);
    }

    public TaskResponseDTO update(TaskUpdateDTO data, UUID id, UUID userId) {
        Task task = this.taskRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (data.newTitle() != null && !data.newTitle().isBlank()) {
            task.setTitle(data.newTitle());
        }

        if (data.newDescription() != null & !data.newDescription().isBlank()) {
            task.setDescription(data.newDescription());
        }

        this.taskRepository.save(task);

        return TaskResponseDTO.fromEntity(task);
    }

    public void delete(UUID id, UUID userId) {
        Task task = this.taskRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        this.taskRepository.delete(task);
    }
}
