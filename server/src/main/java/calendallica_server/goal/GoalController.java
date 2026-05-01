package calendallica_server.goal;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import calendallica_server.goal.dto.GoalCreationDTO;
import calendallica_server.goal.dto.GoalResponseDTO;
import jakarta.validation.Valid;

@RestController
@RequestMapping("goals")
public class GoalController {
    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping("/{userId}")
    public List<GoalResponseDTO> findAll(@PathVariable UUID userId) {
        List<Goal> goals = this.goalService.findAll(userId);

        return goals.stream()
                .map(GoalResponseDTO::fromEntity)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GoalResponseDTO create(@Valid @RequestBody GoalCreationDTO data) {
        Goal newGoal = this.goalService.create(data);
        return GoalResponseDTO.fromEntity(newGoal);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.goalService.delete(id);
    }
}