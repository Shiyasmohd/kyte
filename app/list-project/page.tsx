'use client'
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Inter } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] })

export default function ListProject() {


    return (
        <div className={`min-h-[calc(100vh-300px)] flex justify-center items-center ${inter.className}`}>
            <div className="max-w-screen-xl">
                <h1 className="font-bold text-5xl leading-loose tracking-tighter my-6 gradient-txt-white">List Project</h1>
                <div className="flex flex-col gap-4">
                    <Input className="w-[450px]" label="Project Name" />
                    <Textarea className="w-[450px]" label="Description" />

                    <Input className="w-[450px]" label="Website" />
                    <Input className="w-[450px]" label="Twitter" />
                    <Input className="w-[450px] upload-logo" type="file" />

                    <Button color="primary" >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}