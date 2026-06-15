package calendallica_server.config;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import calendallica_server.task.TaskRepository;

@Configuration
@EnableScheduling
public class TaskKiller implements CommandLineRunner {
    private final TaskRepository taskRepository;

    public TaskKiller(TaskRepository taskRepository) {
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
        LocalDate now = LocalDate.now();
        taskRepository.deleteByDueDateBefore(now);
    }
}
