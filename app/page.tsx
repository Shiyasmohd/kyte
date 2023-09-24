"use client"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import TestImg from "../public/hero-card-complete.jpeg"
import { useEffect } from "react";
import { getProjects } from "@/lib/utils";

export default function Home() {


	const handleFetchProjects = async () => {
		let projects = await getProjects()
		console.log({ projects })
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
						[1, 1, 1, 1].map(() => (
							<Card className="py-4">
								<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
									<p className="text-tiny uppercase font-bold">Daily Mix</p>
									<small className="text-default-500">12 Tracks</small>
									<h4 className="font-bold flex w-full justify-between text-large">
										Frontend Radio
										<span>
											$45
										</span>
									</h4>
								</CardHeader>
								<CardBody className="overflow-visible py-2">
									<Image
										alt="Card background"
										className="object-cover rounded-xl"
										src={TestImg}
										width={270}
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
