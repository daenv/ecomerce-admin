'use client';
import * as z from 'zod';
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

   return (
      <>
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
                  console.log('submit');
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
