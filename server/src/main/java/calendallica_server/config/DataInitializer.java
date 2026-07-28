package calendallica_server.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import calendallica_server.role.Role;
import calendallica_server.role.RoleRepository;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role("user"));
            roleRepository.save(new Role("admin"));
            System.out.println("Created 'user' and 'admin' roles");
        }
    }
}
