"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardWelcome() {
    const user = useCurrentUser()
    const hours = new Date().getHours()
    let greeting = "Hello"
    if (hours < 12) greeting = "Good Morning"
    else if (hours < 18) greeting = "Good Afternoon"
    else greeting = "Good Evening"

    return (
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-none">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    {greeting}, {user?.name || "Farmer"}!
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="opacity-90">
                    Welcome back to your farm dashboard. Here is what is happening today.
                </p>
            </CardContent>
        </Card>
    )
}
