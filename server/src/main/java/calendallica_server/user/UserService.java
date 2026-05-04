package calendallica_server.user;

import java.util.List;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import calendallica_server.exception.ConflictException;
import calendallica_server.exception.InvalidCredentialsException;
import calendallica_server.exception.ResourceNotFoundException;
import calendallica_server.role.Role;
import calendallica_server.role.RoleRepository;
import calendallica_server.user.dto.UserResponseDTO;
import calendallica_server.user.dto.UserSignUpDTO;
import calendallica_server.user.dto.UserUpdateDTO;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    public List<UserResponseDTO> findAll() {
        List<User> users = this.userRepository.findAll();

        return users.stream()
                .map(UserResponseDTO::fromEntity)
                .toList();
    }

    public UserResponseDTO create(UserSignUpDTO data) {
        if (this.userRepository.existsByUsername(data.username())) {
            throw new ConflictException("Username already exists");
        }

        String encryptedPassword = this.passwordEncoder.encode(data.password());

        User newUser = new User(data.username(), encryptedPassword);

        Role role = this.roleRepository.findByName("user")
                .orElseThrow(() -> new ResourceNotFoundException("Role 'user' not found in database"));

        newUser.setRole(role);

        this.userRepository.save(newUser);
        return UserResponseDTO.fromEntity(newUser);
    }

    public UserResponseDTO update(UserUpdateDTO data, UUID id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!this.passwordEncoder.matches(data.password(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        if (data.newUsername() != null && !data.newUsername().isBlank()) {
            if (data.newUsername().equals(user.getUsername())) {
                throw new InvalidCredentialsException("New username must be different");
            }
        }

        if (data.newPassword() != null && !data.newPassword().isBlank()) {
            if (this.passwordEncoder.matches(data.newPassword(), user.getPassword())) {
                throw new InvalidCredentialsException("new password must be different");
            }

            if (this.userRepository.existsByUsername(data.newUsername())) {
                throw new ConflictException("Username already exists");
            }

            user.setUsername(data.newUsername());
        }

        if (data.newPassword() != null && !data.newPassword().isBlank()) {
            String encryptedNewPassword = this.passwordEncoder.encode(data.newPassword());

            user.setPassword(encryptedNewPassword);
        }

        this.userRepository.save(user);

        return UserResponseDTO.fromEntity(user);
    }
}
