'use client';
import { Plus } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { BillboardColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

interface BillboardClientProps {
   data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
   return (
      <>
         <div className="flex items-center justify-between">
            <Heading title={`Billboard `} description="Manage Billboard for your stores" />
            <Button onClick={() => {}}>
               <Plus className="mr-2 h-4 w-4" /> Add new
            </Button>
         </div>
         <Separator />
         <DataTable searchKey="label" columns={columns} data={data} />
         <Heading title="API" description="API CALLs For Billboards" />
         <Separator />
      </>
   );
};

export default BillboardClient;
