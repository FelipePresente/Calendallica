package calendallica_server.user.dto;

import java.util.UUID;

import calendallica_server.user.User;

public record UserResponseDTO(
    UUID id,
    String username,
    String role
) {
    public static UserResponseDTO fromEntity(User user) {
        return new UserResponseDTO(
            user.getId(),
            user.getUsername(),
            user.getRole().getName()
        );
    }
}
