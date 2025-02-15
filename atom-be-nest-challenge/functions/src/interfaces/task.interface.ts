import { Timestamp } from "firebase-admin/firestore";

export interface Task {
    id?: string;
    title: string;
    description: string;
    createdAt: Timestamp|any;
    completed: boolean;
    userId: string;
}