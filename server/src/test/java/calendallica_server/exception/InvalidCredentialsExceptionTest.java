package calendallica_server.exception;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

public class InvalidCredentialsExceptionTest {
    
    @Test
    void InvalidCredentialsExceptionShouldWork() {
        Throwable exception = assertThrows(InvalidCredentialsException.class, () -> {
            throw new InvalidCredentialsException("Invalid credentials");
        });

        assertEquals("Invalid credentials", exception.getMessage());
    }
}
