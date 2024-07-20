import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core';

import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityDataContext, AuthContext } from "@/contexts";
import { useContext, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { EllipsisVerticalIcon, Bars3Icon } from "@heroicons/react/20/solid";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ActivityCategory } from "@/lib/interfaces";
import { Button } from "@/components/ui/button"
import { Interface } from "readline";

export function CategoryItem({ category }: { category: ActivityCategory }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id: category.slug });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div className="py-3 flex gap-2 items-center" ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<div className="flex items-center gap-x-2">
				<div className={`flex-none rounded-full bg-${category.color}-500/20 p-1`}>
					<div className={`h-1.5 w-1.5 rounded-full bg-${category.color}-500`} />
				</div>
				<p>{category.name}</p>
			</div>

			<Bars3Icon className="w-5 h-5 text-gray-400 ml-auto cursor-pointer" />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="default" className="py-4 px-3 focus-visible:ring-transparent focus-visible:ring-0 focus-visible:outline-none">
						<EllipsisVerticalIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent collisionPadding={{ right: 18, bottom: 18 }}>
					<DropdownMenuItem className="py-3 px-3" onClick={() => { console.log("Edit") }}>
						<PencilSquareIcon className="h-4 w-4 text-gray-500 mr-2" /> Edit
					</DropdownMenuItem>
					<DropdownMenuItem className="py-3 px-3" onClick={() => { console.log("Delete") }}>
						<TrashIcon className="h-4 w-4 text-gray-500 mr-2 ml-[-0.03rem]" /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

function ActivityCategoriesTab() {
	const { activityCategories } = useContext(ActivityDataContext);

	const [categories, setCategories] = useState(activityCategories.filter(category => category.builtIn == false));
	if (categories.length == 0 && activityCategories.length > 0)
		setCategories(activityCategories.filter(category => category.builtIn == false));

	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor, {
			// Press delay of 250ms, with tolerance of 5px of movement
			activationConstraint: {
				delay: 0,
				tolerance: 5,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (over != null && active.id !== over.id) {
			setCategories((categories) => {
				const oldIndex = categories.findIndex((category) => category.slug == active.id);
				const newIndex = categories.findIndex((category) => category.slug == over.id);

				console.log(oldIndex, newIndex);

				return arrayMove(categories, oldIndex, newIndex);
			});
		}
	}

	interface obj {
		x: string,
		id: string
	}

	const x : Array<obj> = [
		{
			x: "AAA",
			id: "boo",
		},
		
		{
			x: "awd",
			id: "asd",
		},
		
		{
			x: "qwd",
			id: "geq",
		}
	] 

	return (
		<Card className="w-full">
			<CardHeader className="px-6 pt-6 pb-0">
				<CardTitle>Categories</CardTitle>
				<CardDescription className="pt-1">
					Manage the different types of activities you want to track.
				</CardDescription>
			</CardHeader>
			<CardContent className="px-0 pb-3 pt-2">
				<div className="divide-y divide-gray-100 px-6">
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={categories.map(category => category.slug)}
							strategy={verticalListSortingStrategy}
						>
							{categories.map(category => (
								<CategoryItem key={category.slug} category={category}></CategoryItem>
							))}
						</SortableContext>
					</DndContext>
				</div>
			</CardContent>
			<CardFooter className="pt-0 pb-6 px-6">
				<div className="w-full flex gap-2">
					<Button variant="outline">
						<PlusCircleIcon className="w-4 h-4 mr-1.5 text-gray-600" /> Add<span className="sr-only xs:not-sr-only">&nbsp;Category</span>
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

function AccountTab() {
	const { user, handleSignOutClick } = useContext(AuthContext);

	return (
		<Card className="w-full">
			<CardContent className="flex items-center justify-between p-6 gap-2">
				<div className="space-y-1.5">
					<h3 className="text-xl font-semibold leading-none tracking-tight">Account</h3>
					<p className="text-sm text-muted-foreground pt-1">
						Logged in as {user.email}
					</p>
				</div>
				<Button onClick={handleSignOutClick}>Log out</Button>
			</CardContent>
		</Card>
	)
}

export default function SettingsPage() {
	return (
		<div className="w-full max-w-xl">
			<Tabs defaultValue="account" className="w-full">
				<TabsList>
					<TabsTrigger value="account">Categories</TabsTrigger>
					<TabsTrigger value="password">Account</TabsTrigger>
				</TabsList>
				<TabsContent className="w-full" value="account">
					<ActivityCategoriesTab />
				</TabsContent>
				<TabsContent value="password">
					<AccountTab />
				</TabsContent>
			</Tabs>
		</div>
	)
}