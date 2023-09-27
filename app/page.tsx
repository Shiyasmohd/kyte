"use client"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import TestImg from "../public/hero-card-complete.jpeg"
import { useEffect, useState } from "react";
import { Project, addContribution, getProjects } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { ethers, utils } from "ethers"
import { useAccount, usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from "wagmi";
import { ABI, CONTRACT_ADDRESS } from "@/lib/const";
import Link from "next/link";

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
	const projectId = 1



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
							<Link href={`/${item.id}`} key={index}>
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

									</CardBody>
								</Card>
							</Link>
						))
					}
				</div>
			</div>
		</div>
	);
}
