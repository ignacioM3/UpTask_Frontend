import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";
import api from "../lib/axios";
type NoteApiType = {
    formData: NoteFormData;
    projectId: Project['_id']
    taskId: Task['_id']
    noteId: Note['_id']
}


export async function createNoteApi({projectId, formData, taskId}: Pick<NoteApiType, 'projectId' | 'formData' | 'taskId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`
        const {data} = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function deleteNoteApi({projectId, noteId, taskId}: Pick<NoteApiType, 'projectId' | 'noteId' | 'taskId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const {data} = await api.delete<string>(url);
        return data;

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}