package calendallica_server.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import calendallica_server.role.Role;
import calendallica_server.role.RoleRepository;
import calendallica_server.user.User;
import calendallica_server.user.UserRepository;

@Configuration
public class DataInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        createRoles();
        createAdminUser();
    }

    public void createRoles() {
        String[] roleNames = { "user", "admin" };
        for (String roleName : roleNames) {
            if (roleRepository.findByName(roleName).isEmpty()) {
                roleRepository.save(new Role(roleName));
                System.out.println("Role " + roleName + " created");
            }
        }
    }

    public void createAdminUser() {
        if (roleRepository.findByName("admin").isPresent()) {
            Role adminRole = roleRepository.findByName("admin")
                    .orElseThrow(() -> new RuntimeException("Role 'admin' not found"));

            if (userRepository.findByRoleName("admin").isEmpty()) {
                String encryptedPassword = passwordEncoder.encode("123123123");
                User adminUser = new User("admin", encryptedPassword);
                adminUser.setRole(adminRole);
                userRepository.save(adminUser);
            }

            System.out.println("Default admin user created");
        }
    }
}