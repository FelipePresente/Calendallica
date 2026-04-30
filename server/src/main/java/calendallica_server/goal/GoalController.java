package calendallica_server.goal;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import calendallica_server.goal.dto.GoalCreationDTO;
import jakarta.validation.Valid;

@RestController
@RequestMapping("goals")
public class GoalController {
    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping("/{userId}")
    public List<Goal> findAll(@PathVariable UUID userId) {
        return this.goalService.findAll(userId);
    }

    @PostMapping
    public Goal create(@Valid @RequestBody GoalCreationDTO data) {
        return this.goalService.create(data);
    }
}