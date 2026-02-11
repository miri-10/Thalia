"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-destructive">Authentication Error</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <p>Something went wrong during the authentication process.</p>
                    <Link href="/login">
                        <Button className="w-full">Back to Login</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}
