import { Metadata } from "next"
import Image from "next/image"
import { StoreRegion } from "@medusajs/types"
import { listRegions } from "@lib/data/regions"
import { Layout, LayoutColumn } from "@/components/Layout"
import { CollectionsSlider } from "@modules/store/components/collections-slider"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Inspiration",
  description: "Get inspired by our latest collections",
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions.flatMap((r) =>
      r.countries
        ? r.countries
            .map((c) => c.iso_2)
            .filter(
              (value): value is string =>
                typeof value === "string" && Boolean(value)
            )
        : []
    )
  )

  const staticParams = countryCodes.map((countryCode) => ({
    countryCode,
  }))

  return staticParams
}

export default function InspirationPage() {
  return (
    <>
      <div className="mt-18 md:mt-21 relative w-full max-w-full">
        <Image
          // src="https://s3.mizeller.com/medusa/storefront/inspiration/00.png"
          src="https://placehold.co/1600x1200/png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Inspiration Page Header"
          className="w-full h-auto"
        />
      </div>

      <div className="pt-8 md:pt-26 pb-26 md:pb-36">
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, lg: 7 }}>
            <h3 className="text-md max-lg:mb-6 md:text-2xl">
              WHITEBOOK COMES IN MANY STYLES AND SIZES - FIND YOUR FIT
            </h3>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="md:text-md">
              <p className="mb-5 lg:mb-9">
                WHITEBOOK covers are crafted from world-class materials,
                available in thick leather with cut edges, soft french calf
                leathers, premium fabrics, or first-class welt-sewn nappa
                leather and exclusive signature or exotic materials.
              </p>
              <p className="mb-5 lg:mb-9">Which one is perfect for you?</p>
            </div>
          </LayoutColumn>
        </Layout>

        <CollectionsSlider
          heading=""
          className="mb-22 md:mb-36"
          showViewAllButton={false}
          excludedCollections={[
            "wb-premium",
            "wb-couture",
            "wb-soft",
            "wb-standard",
            "wb-editions",
            "wb-cahiers",
          ]}
        />
      </div>
    </>
  )
}
