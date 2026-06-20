package calendallica_server.config;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import calendallica_server.task.TaskRepository;

@Configuration
@EnableScheduling
public class ExpiredTaskCleaner implements CommandLineRunner {
    private final TaskRepository taskRepository;

    public ExpiredTaskCleaner(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String... args) {
        executeCleaning();
    }

    @Scheduled(fixedRate = 86400000)
    public void scheduledTask() {
        executeCleaning();
    }

    private void executeCleaning() {
        LocalDate limitDate = LocalDate.now().minusDays(1);
        taskRepository.deleteByDueDateBefore(limitDate);
    }
}
