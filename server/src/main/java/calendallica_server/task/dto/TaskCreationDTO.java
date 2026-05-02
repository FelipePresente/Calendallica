package calendallica_server.task.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record TaskCreationDTO(
    @NotBlank(message = "Title must not be blank")
    @Size(min = 1, max = 50, message = "Title must be between 1 and 50 characters")
    String title,

    @Size(max = 300, message = "Description maximum number of characters is 300")
    String description,

    @NotNull(message = "Due date must not be null")
    @FutureOrPresent(message = "Due date must not be in the past")
    LocalDate dueDate
) {
}
