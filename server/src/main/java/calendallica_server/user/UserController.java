package calendallica_server.user;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import calendallica_server.user.dto.UserResponseDTO;
import calendallica_server.user.dto.UserSignUpDTO;
import calendallica_server.user.dto.UserUpdateDTO;
import jakarta.validation.Valid;

@RestController
@RequestMapping("users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponseDTO> findAll() {
        return this.userService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponseDTO create(@Valid @RequestBody UserSignUpDTO data) {
        return this.userService.create(data);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public UserResponseDTO update(@RequestBody UserUpdateDTO data, @AuthenticationPrincipal User user) {
        return this.userService.update(data, user.getId());
    }
}
