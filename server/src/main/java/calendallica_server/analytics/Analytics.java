package calendallica_server.analytics;

public class Analytics {
    private Long user_count;
    private Long task_count;
    private Long goal_count;

    public Analytics() {
    }

    public Analytics(Long user_count, Long task_count, Long goal_count) {
        this.user_count = user_count;
        this.task_count = task_count;
        this.goal_count = goal_count;
    }

    public void setUserCount(Long user_count) {
        this.user_count = user_count;
    }

    public Long getUserCount() {
        return this.user_count;
    }

    public void setTaskCount(Long task_count) {
        this.task_count = task_count;
    }

    public Long getTaskCount() {
        return this.task_count;
    }

    public void setGoalCount(Long goal_count) {
        this.goal_count = goal_count;
    }

    public Long getGoalCount() {
        return this.goal_count;
    }
}
