'use client';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '@/components/ui/modal';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import toast from 'react-hot-toast';

const formSchema = z.object({
   name: z.string().min(1),
});

export const StoreModal = () => {
   const storeModal = useStoreModal();

   const [isLoading, setIsLoading] = useState(false);
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: '',
      },
   });

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
         setIsLoading(true);

         const response = await axios.post('/api/stores', values);
         toast.success("Store created successfully");
      } catch (error) {
         toast.error('Something went wrong');
      } finally {
         setIsLoading(false);
      }
   };
   return (
      <Modal
         title="Create Store"
         description="Add a new store to manage product and categories"
         isOpen={storeModal.isOpen}
         onClose={storeModal.onClose}
      >
         <div>
            <div className="space-y-4 py-2 pb-4">
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                 <Input {...field} disabled={isLoading} placeholder="E-Commerce" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <div className="pt-6 space-x-2 flex items-center justify-end">
                        <Button variant="outline">Cancel</Button>
                        <Button>Continue</Button>
                     </div>
                  </form>
               </Form>
            </div>
         </div>
      </Modal>
   );
};