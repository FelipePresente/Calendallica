package calendallica_server.task;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import calendallica_server.task.dto.TaskCreationDTO;
import calendallica_server.task.dto.TaskResponseDTO;
import jakarta.validation.Valid;

@RestController
@RequestMapping("tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{userId}")
    public List<TaskResponseDTO> findAll(@PathVariable UUID userId) {
        List<Task> tasks = this.taskService.findAll(userId);

        return tasks.stream()
                .map(TaskResponseDTO::fromEntity)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponseDTO create(@Valid @RequestBody TaskCreationDTO data) {
        Task task = this.taskService.create(data);

        return TaskResponseDTO.fromEntity(task);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.taskService.delete(id);
    }
}
