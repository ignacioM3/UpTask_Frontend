import { Project, TeamMeber } from "../types";

export const isManager = (managerId: Project['_id'], userId: TeamMeber['_id']) =>{
    return managerId === userId
}