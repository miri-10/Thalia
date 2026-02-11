"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Sprout } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCurrentUser } from "@/hooks/use-current-user"
import { UserButton } from "@/components/auth/UserButton"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const user = useCurrentUser()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Sprout className="h-6 w-6 text-green-600" />
                        <span className="hidden font-bold sm:inline-block">Thalia</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/districts"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Districts
                        </Link>
                        <Link
                            href="/crops"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Crops
                        </Link>
                        {user && (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                                >
                                    Dashboard
                                </Link>
                            </>
                        )}
                        <Link
                            href="/about"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            About
                        </Link>
                    </nav>
                </div>
                {/* Mobile Menu (Sheet) - simplified for brevity in this update */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                    </div>
                    <nav className="flex items-center">
                        {user ? (
                            <UserButton />
                        ) : (
                            <div className="space-x-2">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button variant="default" size="sm">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}
