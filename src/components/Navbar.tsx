import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { MainNav } from '@/components/main-nav';
const Navbar = async () => {
   const { userId } = auth();

   if (!userId) {
      redirect('/sign-in');
   }

   const store = await prismadb.store.findMany({
      where: {
         userId,
      },
   });

   return (
      <div className="border-b">
         <div className="flex h-16 items-center px-4">
            <div>navbar</div>
            <MainNav />
            <div className="ml-auto flex items-center space-x-4">
               <UserButton afterSignOutUrl="/" />
            </div>
         </div>
      </div>
   );
};

export default Navbar;
