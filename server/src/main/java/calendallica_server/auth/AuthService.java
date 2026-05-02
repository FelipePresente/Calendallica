package calendallica_server.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import calendallica_server.auth.dto.AuthLoginDTO;
import calendallica_server.exception.InvalidCredentialsException;
import calendallica_server.user.User;
import calendallica_server.user.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public String login(AuthLoginDTO data) {
        User user = userRepository.findByUsername(data.username());

        if (user == null || !this.passwordEncoder.matches(data.password(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        return this.tokenService.generateToken(user);
    }
}
