'use client'
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Inter } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { addProject } from "@/lib/utils";
import { useAccount, useChainId } from "wagmi";

const inter = Inter({ subsets: ["latin"] })

export default function ListProject() {


    const chainId = useChainId()
    const [file, setFile] = useState<any>()
    const name = useRef<any>()
    const desc = useRef<any>()
    const website = useRef<any>()
    const twitter = useRef<any>()
    const account = useAccount()

    const handleAddProject = async () => {
        console.log({ chainId });

        console.log({ name: name.current.value, desc: desc.current.value, website: website.current.value, twitter: twitter.current.value, account: account.address, file })
        await addProject(
            name.current.value,
            desc.current.value,
            website.current.value,
            twitter.current.value,
            account.address as string,
            file
        ).then((res) => {
            if (res.valueOf()) {
                alert("Project Added Successfully")
            }
        }).catch((err) => {
            console.log(err)
            alert("Error Adding Project")
        })
    }

    return (
        <div className={`min-h-[calc(100vh-300px)] flex justify-center items-center ${inter.className}`}>
            <div className="max-w-screen-xl">
                <h1 className="font-bold text-5xl leading-loose tracking-tighter my-6 gradient-txt-white">List Project</h1>
                <div className="flex flex-col gap-4">
                    <Input className="w-[450px]" label="Project Name" ref={name} />
                    <Textarea className="w-[450px]" label="Description" ref={desc} />

                    <Input className="w-[450px]" label="Website" ref={desc} />
                    <Input className="w-[450px]" label="Twitter" ref={website} />
                    <Input className="w-[450px] upload-logo" ref={twitter} type="file" onChange={(e: any) => setFile(e.target.files)} />

                    <Button color="primary" onClick={handleAddProject}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}