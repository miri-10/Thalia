"use client"

import { FaUser } from "react-icons/fa"
import { ExitIcon } from "@radix-ui/react-icons"
import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut } from "next-auth/react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar"

export const UserButton = () => {
    // We haven't implemented useCurrentUser yet, mocking for now or simple session check
    const user = { name: "Guest", image: "" }
    // Ideally we fetch session here. 
    // Since this is a client component, we need SessionProvider or a hook.

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuItem onClick={() => signOut()}>
                    <ExitIcon className="h-4 w-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
