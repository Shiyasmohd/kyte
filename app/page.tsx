"use client"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import TestImg from "../public/hero-card-complete.jpeg"
import { useEffect, useState } from "react";
import { Project, getProjects } from "@/lib/utils";

export default function Home() {

	const [projects, setProjects] = useState<Project[]>([] as Project[])


	const handleFetchProjects = async () => {
		let projects = await getProjects()
		console.log({ projects })
		setProjects(projects)
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
									<p className="text-tiny uppercase font-bold">Daily Mix</p>
									<small className="text-default-500">12 Tracks</small>
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
						))
					}
				</div>
			</div>
		</div>
	);
}
