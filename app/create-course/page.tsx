"use client";
import React, { useContext, useEffect, useState } from 'react'
import { stepperOptions } from './_constants/stepperOptions'
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import TopicDesc from './_components/TopicDesc';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { generateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { CourseType, UserInputType } from '@/types/types';
import uuid4 from "uuid4";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { storeDataInDatabase } from './_utils/StoreDataInDatabase';
import { GenerateCourseLayout } from './_utils/GenerateCourseLayout';

function CreateCourse() {
  const [step, setStep] = useState<number>(0);
  const { userInput, setUserInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(userInput);

  }, [userInput]);

  const allowNextStep = () => {
    if (step === 0) {
      return userInput?.category?.length ?? 0 > 0;
    } else if (step === 1) {
      return !!userInput?.topic && !!userInput?.description;
    } else if (step === 2) {
      return (
        !!userInput?.difficulty &&
        !!userInput?.duration &&
        !!userInput?.video &&
        !!userInput?.totalChapters
      );
    }
    return false;
  };

  // const GenerateCourseLayout = async () => {
  //   setLoading(true)
  //   const BASIC_PROMT = 'Generate A course tutorial on following  detail with field as course Name, description, along with chapter name, about, duration.'

  //   const USER_INPUT_PROMT = 'Category : ' + userInput.category + ', topic:' + userInput.topic + ', level:' + userInput.difficulty + ', duration:' + userInput.duration + ', no of chapter:' + userInput.totalChapters + ' , in json format'

  //   const FINAL_PROMT = BASIC_PROMT + USER_INPUT_PROMT

  //   try {
  //     let id = uuid4();

  //     const result = await generateCourseLayout_AI.sendMessage(FINAL_PROMT)
  //     const data = JSON.parse(result.response?.text())
  //     console.log(data);
      
  //     setLoading(false);
      
  //     // const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/storeData`,{id, userInput, data, user});
  //     const response = await storeDataInDatabase(id, userInput, data, user);
  //     console.log(response);
      
  //     // router.replace(`/create-course/${id}`);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  const GenerateCourse = async () => {
    setLoading(true); // Use `loading` state here
    try {
      await GenerateCourseLayout(userInput, session?.user, router);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  


  return (
    <div className='flex justify-center items-center flex-col mt-10 overflow-hidden'>
      <h2 className='text-4xl text-purple-900 font-semibold'>Create Course</h2>
      <div className="flex mt-10">
        {stepperOptions.map((option, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center w-[50px] md:w-[100px]">
              <div
                className={`bg-gray-200 p-3 rounded-full text-white ${step >= index && "bg-purple-500"
                  }`}
              >
                <option.icon />
              </div>
              <p className="hidden md:block md:text-sm">{option.name}</p>
            </div>
            {index != stepperOptions.length - 1 && (
              <div
                className={`h-1 w-[50px] md-w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${step > index && "bg-purple-600"
                  }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="px-10 md:px-20 lg-px-44 mt-10 w-screen">
        {step === 0 ? (
          <SelectCategory />
        ) : step === 1 ? (
          <TopicDesc />
        ) : (
          <SelectOption />
        )}

        <div className='className="px-10 md:px-20 lg-px-44 mt-10'>
          <div className='flex justify-between mt-10'>
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step == 0}
            >
              Previous
            </Button>

            {stepperOptions.length - 1 == step ? (
              <Button
                disabled={!allowNextStep()}
                onClick={GenerateCourse}
                className={`gap-2`}
              >
                <FaWandMagicSparkles /> Generate Course
              </Button>
            ) : (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!allowNextStep()}
                className='px-6 py-2'
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  )
}

export default CreateCourse