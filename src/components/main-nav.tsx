import { useParams, usePathname } from "next/navigation";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
   /* const pathname = usePathname();
   const params= useParams();

   const routes = [
    {
        href:`${params.storeid}`,
        label: 'Overview',
        active: pathname === `${params.storeid}`,
    }
   ] */
    return (
      <>
         <div>Main</div>
      </>
   );
}


