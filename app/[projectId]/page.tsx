"use client"
import { Project, addContribution, getProjectById } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Twitter from "@/public/twitter.svg"
import Website from "@/public/website.png"
import Link from "next/link"
import { ABI, CONTRACT_ADDRESS } from "@/lib/const"
import { ethers, utils } from "ethers"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Spinner } from "@nextui-org/spinner";

export default function ProjectPage() {

    const path = usePathname()
    const [project, setProject] = useState<Project>({} as Project)
    const [amount, setAmount] = useState<string>("")

    const handleContribute = async () => {

        //@ts-ignore
        const PROVIDER = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, PROVIDER)
        //@ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = PROVIDER.getSigner();
        await contract.connect(signer).sendETH(project.owner, { value: utils.parseEther(amount) })
            .then(async (res: any) => {
                await res.wait()
                await addContribution(project.id, Number(amount))
            })
            .catch((err: any) => {
                console.log(err)
            })
    }


    useEffect(() => {

        const fetchProject = async () => {
            console.log(Number(path.slice(1,)))
            const res = await getProjectById(Number(path.slice(1,)))
            console.log({ res })
            setProject(res[0])
        }
        fetchProject()
    }, [])

    return (
        <div className="flex justify-center">
            {
                project.name ?
                    <div className="max-w-md">
                        <h1 className="font-bold text-5xl leading-loose tracking-tighter mt-6 gradient-txt-white">
                            {project.name}
                        </h1>
                        <div className="">
                            <Image className="rounded-xl" src={project.file} alt={project.name} width={500} height={500} />
                        </div>
                        <p className="my-4 text-xl">
                            {project.description}
                        </p>
                        <div className="flex gap-4">
                            <Link href={project.twitter ?? ""}>
                                <Image src={Twitter} alt="Twitter" width={25} height={25} />
                            </Link>
                            <Link href={project.website ?? ""}>
                                <Image src={Website} alt="Twitter" width={25} height={25} />
                            </Link>
                        </div>
                        <p className="my-4 text-xl">
                            Total Contributions: ${project.totalRaised}
                        </p>
                        <p className="my-4 text-xl">
                            Total Contributors: ${project.contributors}
                        </p>
                        <Link href={project.meetingUrl}>
                            <Button className="w-full my-2">
                                Join Meet
                            </Button>
                        </Link>
                        <Input className="w-full my-4" placeholder="Amount in MATIC" onChange={(e) => setAmount(e.target.value)} />
                        <Button onClick={handleContribute} className="w-full">
                            Send
                        </Button>

                    </div>

                    :
                    <div className="flex justify-center items-center h-[calc(100vh-300px)]">
                        <Spinner />
                    </div>
            }
        </div>
    )
}