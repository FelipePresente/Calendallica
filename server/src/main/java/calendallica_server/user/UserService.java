package calendallica_server.user;

import java.util.List;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import calendallica_server.exception.InvalidCredentialsException;
import calendallica_server.exception.ResourceNotFoundException;
import calendallica_server.role.Role;
import calendallica_server.role.RoleRepository;
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

    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    public User create(UserSignUpDTO data) {
        if (this.userRepository.existsByUsername(data.username())) {
            throw new RuntimeException("Username already exists");
        }

        String encryptedPassword = this.passwordEncoder.encode(data.password());

        User newUser = new User(data.username(), encryptedPassword);

        Role role = this.roleRepository.findByName("user")
                .orElseThrow(() -> new ResourceNotFoundException("Role 'user' not found in database"));

        newUser.setRole(role);

        return this.userRepository.save(newUser);
    }

    public User update(UserUpdateDTO data, UUID id) {
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
                throw new RuntimeException("Username already exists");
            }

            user.setUsername(data.newUsername());
        }

        if (data.newPassword() != null && !data.newPassword().isBlank()) {
            String encryptedNewPassowrd = this.passwordEncoder.encode(data.newPassword());

            user.setPassword(encryptedNewPassowrd);
        }

        return this.userRepository.save(user);
    }
}
