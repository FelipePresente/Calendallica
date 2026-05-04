package calendallica_server.task.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record TaskUpdateDTO(
    @NotNull(message = "Id must not be null")
    UUID id,

    @Size(min = 1, max = 50, message = "Title must be between 1 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z0-9\\sÀ-ÿ]+$", message = "Title must only contain letters, numbers and spaces")
    String newTitle,

    @Size(max = 300, message = "Description maximum number of characters is 300")
    String newDescription
) {
}
