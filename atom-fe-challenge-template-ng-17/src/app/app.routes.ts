import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/tasks",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)
    },
    {
        path: "login",
        loadComponent: () => import("./modules/login/login.component").then((m) => m.LoginComponent)
    },
    {
        path: "tasks",
        loadComponent: () => import("./modules/task/task.component").then((m) => m.TaskComponent)
    },
];
