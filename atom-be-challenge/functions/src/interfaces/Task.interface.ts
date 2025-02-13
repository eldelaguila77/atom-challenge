export interface Task {
    id?: string;
    title: string;
    description: string;
    createdAt: FirebaseFirestore.Timestamp;
    completed: boolean;
    userId: string;
}