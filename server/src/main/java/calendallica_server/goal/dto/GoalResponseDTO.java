package calendallica_server.goal.dto;

import java.time.Instant;
import java.util.UUID;

import calendallica_server.goal.Goal;

public record GoalResponseDTO(
    UUID id,
    String title,
    String description,
    UUID userId,
    Instant createdAt,
    Instant updatedAt
) {
    public static GoalResponseDTO fromEntity(Goal goal) {
        return new GoalResponseDTO(
            goal.getId(),
            goal.getTitle(),
            goal.getDescription(),
            goal.getUser().getId(),
            goal.getCreatedAt(),
            goal.getUpdatedAt()
        );
    }
}
