import React, { useContext } from 'react'
import { categoryList } from '../_shared/CategoryList'
import Image from 'next/image'
import { UserInputContext } from '@/app/_context/UserInputContext';

function SelectCategory() {
    const { userInput, setUserInput } = useContext(UserInputContext);

    const handleCategorySelect = (category: string) => {
        setUserInput((prev) => ({ ...prev, category }));
    };

    return (
        <div className=" px-10 md:px-20 w-screen">
            <h2 className="my-5 text-purple-600 font-semibold">Select the course category</h2>

            <div className="grid grid-cols-3 gap-10">
                {categoryList.map((item, index) => (
                    <div key={index} className={`flex flex-col p-5 border items-center justify-center rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer transition-all duration-150 ${userInput?.category===item.name && "border-primary bg-blue-50"}`}
                        onClick={() => { handleCategorySelect(item.name) }}
                    >
                        <Image src={item.icon} width={100} height={100} alt={item.name} priority />
                        <h2 className='text-purple-600 font-semibold'>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectCategory