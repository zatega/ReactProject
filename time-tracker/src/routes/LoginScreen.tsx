import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import _backgroundImage1 from '@/assets/majid-rangraz-IPMaxeoHXi4-unsplash.jpg'; // eslint-disable-line @typescript-eslint/no-unused-vars
import _backgroundImage2 from '@/assets/akram-huseyn-f3nGngsnp3A-unsplash.jpg'; // eslint-disable-line @typescript-eslint/no-unused-vars
import _backgroundImage3 from '@/assets/rocco-stoppoloni-h6qnnmbkLBU-unsplash.jpg'; // eslint-disable-line @typescript-eslint/no-unused-vars

import { FormEvent, useState } from "react";
import Spinner from "@/components/spinner";
import { auth, sendSignInLinkToEmail, FirebaseError } from "@/firebase";
import { useToast } from "@/components/ui/use-toast";
import { InboxIcon } from "@heroicons/react/24/solid";

export default function LoginScreen({processingLink = false}) {
	const [email, setEmail] = useState('');
	const [step, setStep] = useState('enter-email');

	const { toast } = useToast();

	function handleSubmit(event: FormEvent<HTMLFormElement>){
		event.preventDefault();
		if(step != 'enter-email')
			return;

		setStep('loading');

		const actionCodeSettings = {
			// URL you want to redirect back to. The domain (www.example.com) for this
			// URL must be in the authorized domains list in the Firebase Console.
			url: window.location.href,
			// This must be true.
			handleCodeInApp: true,
		};

		sendSignInLinkToEmail(auth, email, actionCodeSettings)
		.then(() => {
			// The link was successfully sent. Inform the user.
			// Save the email locally so you don't need to ask the user for it again
			// if they open the link on the same device.
			window.localStorage.setItem('emailForSignIn', email);
			setStep('check-inbox');
		}).catch((error: FirebaseError) => {
			toast({title: "Error " + error.code, description: error.message});
			setStep('enter-email');
		});
	}

	let formArea = <></>;
	if(step == 'loading' || processingLink){
		formArea = (
			<div className="w-full flex items-center justify-center">
				<Spinner sizeClasses="w-10 h-10" />
			</div>
		)
	}else if(step == 'enter-email'){
		formArea = (
			<form onSubmit={handleSubmit} className="grid gap-4">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={email}
						onChange={(e) => {setEmail(e.target.value)}}
						placeholder="john.doe@example.com"
						required
					/>
				</div>
				<Button type="submit" className="w-full">
					Login
				</Button>
			</form>
		);
	}else if(step == 'check-inbox'){
		formArea = (
			<div className="flex items-center justfiy-start gap-4 p-4 border border-gray-300 rounded-md">
				<InboxIcon className="w-8 h-8 text-blue-600" />
				<div>
					<h2 className="text-xl font-bold">Check your Inbox</h2>
					<p className="text-balance text-sm mt-1 text-muted-foreground">
						We've sent you a login link.
					</p>
				</div>
				
			</div>
		);
	}

	return (
		<div className="h-full w-full lg:grid lg:grid-cols-2">
			<div className="min-h-full flex items-center justify-center py-12">
				<div className="mx-auto grid w-[380px] gap-8">
						<div className="grid gap-2 text-center">
							<h1 className="text-3xl font-bold">Activity Tracker</h1>
							<p className="text-balance text-muted-foreground">
								Enter your email below to login to your account
							</p>
						</div>
					
					{formArea}
					
					<div className="text-center text-sm">
						Note: This is a personal project. Not for public use.
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block relative">
				<img
					src={_backgroundImage2}
					alt="Image"
					className="absolute h-full w-full inset-0 object-cover object-center dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	)
}
