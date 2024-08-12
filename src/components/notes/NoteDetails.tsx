import { useMemo } from "react"
import { useAuth } from "../../hooks/useAuth"
import { Note } from "../../types"
import { formData } from "../../types/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNoteApi } from "../../api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

type NoteDetailsProps = {
    note: Note
}


export default function NoteDetails({note}: NoteDetailsProps) {
    const {data, isLoading} = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const params = useParams();

    const projectId = params.projectId!;
    const taskId = queryParams.get("viewTask")!;
    
    
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: deleteNoteApi,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ["task", taskId] });
        }
    })


    if(isLoading) return 'Cargando...'

  return (
    <div className="p-3 flex justify-between items-center">
      <div>
      <p>
            {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">
            {formData(note.createdAt)}
        </p>
      </div>
     {canDelete && (
         <button
            type="button"
            onClick={() => mutate({
                projectId,
                taskId,
                noteId: note._id
            })}
            className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
         >Eliminar</button> 
     )}
    </div>
  )
}
