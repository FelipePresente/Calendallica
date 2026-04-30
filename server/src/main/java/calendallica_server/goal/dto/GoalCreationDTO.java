package calendallica_server.goal.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record GoalCreationDTO(
    @NotBlank(message = "Title must not be blank")
    @Size(min = 1, max = 50, message = "Title must be between 1 and 50 characters")
    String title,

    @Size(max = 300, message = "Description maximum number of characters is 300")
    String description,

    @NotNull(message = "User id must not be null")
    UUID userId
) {
}
