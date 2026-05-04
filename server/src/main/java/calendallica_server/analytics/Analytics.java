package calendallica_server.analytics;

import jakarta.persistence.Entity;

@Entity
public class Analytics {
    private int user_count;
    private int task_count;
    private int goal_count;

    public Analytics {
    }

    public void setUserCount(int user_count) {
        this.user_count = user_count;
    }

    public int getUserCount() {
        return this.user_count;
    }

    public void setTaskCount(int task_count) {
        this.task_count = task_count;
    }

    public int getTaskCount() {
        return this.task_count;
    }

    public void setGoalCount(int goal_count) {
        this.goal_count = goal_count;
    }

    public int getGoalCount() {
        return this.goal_count;
    }
}
