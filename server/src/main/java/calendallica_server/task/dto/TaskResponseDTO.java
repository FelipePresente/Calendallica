package calendallica_server.task.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

import calendallica_server.task.Task;

public record TaskResponseDTO(
    UUID id,
    String title,
    String description,
    LocalDate dueDate,
    UUID userId,
    Instant createdAt,
    Instant updatedAt
) {
    public static TaskResponseDTO fromEntity(Task task) {
        return new TaskResponseDTO(
            task.getId(),
            task.getTitle(),
            task.getDescription(),
            task.getDueDate(),
            task.getUser().getId(),
            task.getCreatedAt(),
            task.getUpdatedAt()
        );
    }
}
