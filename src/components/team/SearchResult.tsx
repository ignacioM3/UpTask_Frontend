import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TeamMeber } from "../../types"
import { addUserToProject } from "../../api/TeamApi"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

type SearchResultProps = {
    user: TeamMeber;
    reset: () => void;
}

export default function SearchResult({user, reset}: SearchResultProps) {
    const params = useParams()
    const projectId = params.projectId!;
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const {mutate} = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
            console.log(location.pathname)

        }, 
        onSuccess: (data) =>{
            toast.success(data)
            reset();
            navigate(location.pathname, {replace: true})
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
            
        }
    })

    const handleAddUserToProject = () =>{
        const data = {
            projectId,
            id: user._id
        }

        mutate(data)
    }
  return (
    <>
        <p className="mt-10 text-center font-bold">Resultado:</p>
        <div className="flex justify-between items-center">
            <p>{user.name}</p>
            <button 
                className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                onClick={handleAddUserToProject}
                >
                Agregar al Proyecto
            </button>
        </div>
    </>
  )
}
