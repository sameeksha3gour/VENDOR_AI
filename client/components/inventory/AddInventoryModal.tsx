"use client";

import InventoryForm from "./InventoryForm";
import useInventory from "@/hooks/useInventory";

interface Props{

    onClose:()=>void;

}

export default function AddInventoryModal({

    onClose,

}:Props){

    const{

        addProduct,

    }=useInventory();

    return(

        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

            <div className="w-[700px] rounded-xl bg-white p-8">

                <div className="mb-6 flex justify-between">

                    <h2 className="text-2xl font-bold">

                        Add Product

                    </h2>

                    <button onClick={onClose}>

                        ✕

                    </button>

                </div>

                <InventoryForm

                    onSubmit={async(data)=>{

                        await addProduct(data);

                        onClose();

                    }}

                />

            </div>

        </div>

    );

}
