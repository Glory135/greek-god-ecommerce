import LandingHero from "@/components/Hero/LandingHero";
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function LandingPage() {

  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: "categories",
    depth: 1, // populate sub categories
    where: {
      parent: {
        exists: false,
      }
    }
  })

  return (
    <div className="w-full">
      <LandingHero />
      <div className="h-[200vh]">
        {
          JSON.stringify(data, null, 2)
        }
      </div>
    </div>
  )
}