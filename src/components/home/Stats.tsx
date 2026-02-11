export function Stats() {
    return (
        <section className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto grid max-w-[64rem] grid-cols-2 gap-8 text-center md:grid-cols-4">
                <div className="flex flex-col gap-2">
                    <h3 className="text-4xl font-bold">77</h3>
                    <p className="text-sm text-muted-foreground">Districts Covered</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-4xl font-bold">10k+</h3>
                    <p className="text-sm text-muted-foreground">Farmers Helping</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-4xl font-bold">50+</h3>
                    <p className="text-sm text-muted-foreground">Crops Supported</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-4xl font-bold">24/7</h3>
                    <p className="text-sm text-muted-foreground">Realtime Data</p>
                </div>
            </div>
        </section>
    )
}
