package calendallica_server.auth;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import calendallica_server.auth.dto.AuthLoginDTO;
import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthController {
    private final AuthService AuthService;
    private final CookieService cookieService;

    public AuthController(AuthService authService, CookieService cookieService) {
        this.AuthService = authService;
        this.cookieService = cookieService;
    }

    @PostMapping
    public ResponseEntity<Void> login(@Valid @RequestBody AuthLoginDTO data) {
        String token = this.AuthService.login(data);
        ResponseCookie jwtCookie = this.cookieService.generateCookie(token);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .build();
    }
}
