import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
    status: string
}

export default function DropTask({status}: DropTaskProps) {
    const { isOver, setNodeRef} = useDroppable({
        id: status
    })

    const style = {
        opacity: isOver ? 0.4 : undefined
    }

  return (
    <div 
        style={style}
        className='text-xs font-semibold uppercase p-2 border border-dashed 
        border-slate-500 mt-5 grid place-content-center text-slate-500'
        ref={setNodeRef}
        >
        Soltar Tarea Aquí
    </div>
  )
}
