package calendallica_server.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import calendallica_server.auth.TokenService;
import calendallica_server.exception.ConflictException;
import calendallica_server.exception.ResourceNotFoundException;
import calendallica_server.role.Role;
import calendallica_server.role.RoleRepository;
import calendallica_server.user.dto.UserResponseDTO;
import calendallica_server.user.dto.UserSignUpDTO;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final RoleRepository roleRepository;

    @Value("${app.roles.default}")
    private String defaultRoleName;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            TokenService tokenService,
            RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.roleRepository = roleRepository;
    }

    public List<UserResponseDTO> findAll() {
        List<User> users = this.userRepository.findAll();

        return users.stream()
                .map(UserResponseDTO::fromEntity)
                .toList();
    }

    public String create(UserSignUpDTO data) {
        if (this.userRepository.existsByUsername(data.username())) {
            throw new ConflictException("Username already exists");
        }

        String encryptedPassword = this.passwordEncoder.encode(data.password());

        User newUser = new User(data.username(), encryptedPassword);

        Role role = this.roleRepository.findByName(defaultRoleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role 'user' not found"));

        newUser.setRole(role);

        User createdUser = this.userRepository.save(newUser);
        return this.tokenService.generateToken(createdUser);
    }
}
