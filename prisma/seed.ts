import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Districts
    const districts = [
        { name: 'Kathmandu', region: 'Bagmati' },
        { name: 'Lalitpur', region: 'Bagmati' },
        { name: 'Bhaktapur', region: 'Bagmati' },
        { name: 'Chitwan', region: 'Bagmati' },
        { name: 'Jhapa', region: 'Koshi' },
        { name: 'Mustang', region: 'Gandaki' },
        // Add more as needed
    ]

    for (const d of districts) {
        await prisma.district.upsert({
            where: { name: d.name },
            update: {},
            create: {
                name: d.name,
                region: d.region,
                weather: {
                    create: {
                        temp: 25,
                        humidity: 60,
                        rainfall: 0,
                        conditions: "Sunny",
                        forecast: "Clear skies"
                    }
                }
            },
        })
    }

    // Crops
    const crops = [
        { name: 'Rice', season: 'Summer' },
        { name: 'Wheat', season: 'Winter' },
        { name: 'Maize', season: 'Spring' },
        { name: 'Mustard', season: 'Winter' },
    ]

    for (const c of crops) {
        await prisma.crop.create({
            data: {
                name: c.name,
                season: c.season,
                description: `Best ${c.name} for Nepal.`,
            }
        })
    }

    console.log('Seeding completed.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
