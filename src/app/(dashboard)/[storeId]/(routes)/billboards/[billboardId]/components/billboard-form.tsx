'use client';
import * as z from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Billboard } from '@prisma/client';
import { Separator } from '@radix-ui/react-separator';
import { Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import ImageUpload from '@/components/ui/image-upload'

/* import { AlertModal } from "@/components/modals/alert-modal" */


const formSchema = z.object({
   lable: z.string().min(1),
   imageUrl: z.string().min(1),
});
type BillboardFormValues = z.infer<typeof formSchema>;
interface BillboardFormProps {
   initialData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
   const params = useParams();
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);

   const title = initialData ? 'Edit billboard' : 'Create billboard';
   const description = initialData ? 'Edit a billboard' : 'Add a new billboard';
   const toastMessage = initialData ? 'Billboard updated' : 'Billboard created';
   const action = initialData ? 'Save changes' : 'Created';

   const form = useForm<BillboardFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || { lable: '', imageUrl: '' },
   });

   const onSubmit = async (values: BillboardFormValues) => {
      try {
         setLoading(true);
         if(initialData) {
            await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, values)
         }else{
            await axios.post(`/api/${params.storeId}/billboards`, values)
         }
         router.refresh()
         router.push(`/${params.storeId}/billboards`)
         toast.success(toastMessage)
      } catch (error) {
         toast.error('Something went wrong')
      }finally {
         setLoading(false);
      }
   }
 const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success('Billboard deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all categories using this billboard first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }
   return (
      <>
      {/* <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    /> */}

         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {initialData && (
               <Button disabled={loading} variant="destructive" onClick={() => setOpen(true)}>
                  <Trash className="h-4 w-4" />
               </Button>
            )}
         </div>
         <Separator />
         <Form {...form}>
            <form
               onSubmit={() => {
                  form.handleSubmit(onSubmit)
               }}
               className="space-y-8 w-full"
            >
               <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Background image</FormLabel>
                        <FormControl>
                           <ImageUpload
                              value={field.value ? [field.value] : []}
                              disabled={loading}
                              onChange={(url) => field.onChange(url)}
                              onRemove={() => field.onChange('')}
                           />
                        </FormControl>
                     </FormItem>
                  )}
               />
               <div className="md:grid md:grid-cols-3 gap-8">
                  <FormField
                     control={form.control}
                     name="lable"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Label</FormLabel>
                           <FormControl>
                              <Input disabled={loading} placeholder="Billboard lable" {...field} />
                           </FormControl>
                        </FormItem>
                     )}
                  />
               </div>
               <div>
                  <Button disabled={loading} type="submit" className="ml-auto">
                     {action}
                  </Button>
               </div>
            </form>
         </Form>
      </>
   );
};
