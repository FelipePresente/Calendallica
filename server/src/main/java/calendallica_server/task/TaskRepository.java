package calendallica_server.task;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import jakarta.transaction.Transactional;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    @Transactional
    void deleteByDueDateBefore(LocalDate date);

    List<Task> findByUserId(UUID userId);
    Optional<Task> findByIdAndUserId(UUID id, UUID userID);
}