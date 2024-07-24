import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useSubmitAssignmentAnswerMutation } from '@/lib/features/roomSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import FileUpload from '../../media-upload/FileUpload'

const formSchema = z.object({
    fileUrl:z.string().min(1,{
        message: "File URL is required upload file."
    }),
})

type Inputs = z.infer<typeof formSchema>

type SubmitFormProps = {
    student_id: string;
    assignment_id: string;
    classroom_id: string;
} 
const SubmitForm = ({ assignment_id,classroom_id,student_id }:SubmitFormProps) => {
  const [fileKey,setFileKey] = useState<string | undefined>()
  const [submit,{ isLoading }] = useSubmitAssignmentAnswerMutation()
    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues:{
          fileUrl: "",
        }
    })
    const onSubmit : SubmitHandler<Inputs> = async (data) => {
      const { fileUrl }  = data;
      if(fileKey === "" || fileKey === undefined){
        toast.error("Please upload a file")
        return;
      }
      await submit({assignment_id,classroom_id,student_id,data:{ fileUrl,fileKey }}).unwrap()
      .then(() => {
        toast.success("Answer submitted successfully")
        form.reset()
        setFileKey(undefined)
      }).catch(()=>{
        toast.error("Failed to submit  answer try again")
      })
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col text-center gap-3 w-full">
            <FormField
            control={form.control}
            name="fileUrl"
            rules={ { required: true } }
            render={({ field })=>(
                <FormItem>
                    <FormLabel/>
                    <FormControl>
                        <FileUpload 
                        setFileKey={setFileKey} 
                        onValueChange={field.onChange}
                        />
                    </FormControl>
                    <FormDescription>
                      Submit your answer file here
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
            />
            <Button disabled={isLoading} type="submit">{ isLoading ? <Loader2 className='animate-spin'/> : "Submit"}</Button>
        </form>
    </Form>
  )
}

export default SubmitForm