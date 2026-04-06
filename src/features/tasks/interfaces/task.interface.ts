export interface Task {
    id:          string;
    title:       string;
    description: null;
    completed:   boolean;
    user_id:     string;
    created_at:  Date;
    updated_at:  Date;
}
