'use client';

import { BillboardColumn } from "./columns";

interface CellActionProps {
   data: BillboardColumn[];
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
   return (
    <div>
        <div> action</div>
    </div>

   )
};
