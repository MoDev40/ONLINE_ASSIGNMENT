declare type RouteParams = {
    [key: string]:string
}

declare type UserData = {
    id: string;
    email: string;
    clerkId: string;
    idCard: string | null;
    className: string | null;
    name: string | null;
    role: string;
    createdAt: Date;
}