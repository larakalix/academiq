type Role = "admin" | "teacher" | "student" | "parent";
type RouteAccessMap = {
    [key: string]: Role[];
};

export const ROUTES = new Map<string, string>([
    ["dashboard", "/dashboard"],
    ["students", "/students"],
    ["teachers", "/teachers"],
    ["parents", "/parents"],
    ["classes", "/classes"],
    ["lessons", "/lessons"],
    ["exams", "/exams"],
    ["assignments", "/assignments"],
    ["results", "/results"],
    ["attendance", "/attendance"],
    ["events", "/events"],
    ["announcements", "/announcements"],
]);
// {
//     dashboard: "/dashboard",
//     students: "/students",
//     teachers: "/teachers",
//     parents: "/parents",
//     classes: "/classes",
//     lessons: "/lessons",
//     exams: "/exams",
//     assignments: "/assignments",
//     results: "/results",
//     attendance: "/attendance",
//     events: "/events",
//     announcements: "/announcements",
// };

export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/student(.*)": ["student"],
    "/teacher(.*)": ["teacher"],
    "/parent(.*)": ["parent"],
    "/list/teachers": ["admin", "teacher"],
    "/list/students": ["admin", "teacher"],
    "/list/parents": ["admin", "teacher"],
    "/list/subjects": ["admin"],
    "/list/classes": ["admin", "teacher"],
    "/list/exams": ["admin", "teacher", "student", "parent"],
    "/list/assignments": ["admin", "teacher", "student", "parent"],
    "/list/results": ["admin", "teacher", "student", "parent"],
    "/list/attendance": ["admin", "teacher", "student", "parent"],
    "/list/events": ["admin", "teacher", "student", "parent"],
    "/list/announcements": ["admin", "teacher", "student", "parent"],
};
