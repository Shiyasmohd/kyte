"use client"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import TestImg from "../public/hero-card-complete.jpeg"
import { useEffect, useState } from "react";
import { Project, getProjects } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { ethers, utils } from "ethers"
import { useAccount, usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from "wagmi";
import { ABI, CONTRACT_ADDRESS } from "@/lib/const";

export default function Home() {

	const [projects, setProjects] = useState<Project[]>([] as Project[])
	const wallet = useAccount()

	const handleFetchProjects = async () => {
		let projects = await getProjects()
		console.log({ projects })
		setProjects(projects)
	}
	const owner = "0xB90581917BCFeb7A0e8511c8Cb7bC137F7541fb7"
	const amount = "0.1"

	const handleContribute = async () => {

		//@ts-ignore
		const PROVIDER = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)
		const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, PROVIDER)
		//@ts-ignore
		await window.ethereum.request({ method: 'eth_requestAccounts' });
		const signer = PROVIDER.getSigner();
		await contract.connect(signer).sendETH(owner, { value: utils.parseEther(amount) })
			.then(async (res: any) => {
				await res.wait()

			})
			.catch((err: any) => {
				console.log(err)

			})
	}

	useEffect(() => {
		handleFetchProjects()
	}, [])

	return (
		<div className="flex justify-center">
			<div className="max-w-screen-xl">
				<h1 className="font-bold text-5xl leading-loose tracking-tighter my-6 gradient-txt-white">Projects</h1>
				<div className="grid grid-cols-4 gap-4">
					{
						projects.map((item, index) => (
							<Card className="py-4">
								<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
									<h4 className="font-bold flex w-full justify-between text-large">
										{item.name}
										<span>
											${item.totalRaised}
										</span>
									</h4>
								</CardHeader>
								<CardBody className="overflow-visible py-2">
									<Image
										alt="Card background"
										className="object-cover rounded-xl"
										src={item.file}
										width={270}
										height={300}
									/>
									<Button onClick={handleContribute} className="mt-4">
										Send
									</Button>
								</CardBody>
							</Card>
						))
					}
				</div>
			</div>
		</div>
	);
}
