import { useForm } from 'react-hook-form'
import {  NoteFormData } from '../../types'
import ErrorMessage from '../ErrorMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNoteApi } from '../../api/NoteApi'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

export default function AddNotesForm() {
  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!
  

  const initalValues: NoteFormData = {
    content: ''
  }

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    defaultValues: initalValues
  })
  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn: createNoteApi,
    onError: (error) => {
      toast.error(error.message)
  },
  onSuccess: (data) => {
     toast.success(data)
     queryClient.invalidateQueries({queryKey: ['task', taskId]})
     reset()
  }
  })

  const handleAddNote = (formData: NoteFormData) =>{
    mutate({
      formData,
      projectId,
      taskId
    })    
    
  }

  return (
    <form
      className='space-y-3'
      noValidate
      onSubmit={handleSubmit(handleAddNote)}
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor="content" className='font-bold'>Crear Nota</label>
        <input 
          type="text" 
          id='content'
          placeholder='Contenido de la nota'
          className='w-full p-3 border border-gray-300'
          {...register('content', {
            required: 'El contenido de la nota es obligatorio'
          })}
          />
          {errors.content && 
          (
            <ErrorMessage>{errors.content.message}</ErrorMessage>
          )}
      </div>
      <input type="submit"
        value="Crear Nota"
        className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer'
      />
    </form>
  )
}
