
import { Metadata } from "next"
import Image from "next/image"
import { getRegion } from "@lib/data/regions"
import { getProductTypesList } from "@lib/data/product-types"
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedLink } from "@/components/LocalizedLink"
import { CollectionsSlider } from "@modules/store/components/collections-slider"

export const metadata: Metadata = {
  title: "Whitebook - Tailored Notebooks Switzerland",
  description:
    "Experience the art of personalized notebooks in Switzerland. Our collection of beautifully crafted notebooks is designed to meet your unique needs and preferences. Explore our range of high-quality products and elevate your writing experience.",
}

// TODO: fix the product types object in the backend (medusa) and re-activate here!)
const ProductTypesSection: React.FC = async () => {
  const productTypes = await getProductTypesList(0, 20, [
    "id",
    "value",
    "metadata",
  ])

  if (!productTypes) {
    return null
  }

  return (
    <Layout className="mb-26 md:mb-36 max-md:gap-x-2">
      {productTypes.productTypes.map((productType, index) => (
        <LayoutColumn
          key={productType.id}
          start={index % 2 === 0 ? 1 : 7}
          end={index % 2 === 0 ? 7 : 13}
        >
          <LocalizedLink href={`/store?type=${productType.value}`}>
            {typeof productType.metadata?.image === "object" &&
              productType.metadata.image &&
              "url" in productType.metadata.image &&
              typeof productType.metadata.image.url === "string" && (
                <Image
                  src={productType.metadata.image.url}
                  width={1200}
                  height={900}
                  alt={productType.value}
                  className="mb-2 md:mb-8"
                />
              )}
            {/*<p className="text-xs md:text-md">{productType.value}</p>*/}
          </LocalizedLink>
        </LayoutColumn>
      ))}
    </Layout>
  )
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <div className="mt-18 md:mt-21 relative w-full max-w-full">
        <Image
          src="https://placehold.co/1920x1080/png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Whitebook Landing Page Header"
          className="w-full h-auto"
        />
      </div>
      <div className="pt-8 pb-26 md:pt-26 md:pb-36">
        <Layout className="mb-26 md:mb-36">
          <LayoutColumn start={1} end={{ base: 13, md: 8 }}>
            <h3 className="text-md max-md:mb-6 md:text-2xl">
              WELCOME TO THE HOME OF WHITEBOOK
            </h3>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, md: 9 }} end={13}>
            <div className="flex items-center h-full">
              <div className="md:text-md">
                <p>Tailored Notebooks Switzerland</p>
                <LocalizedLink href="/store" variant="underline">
                  Explore Products
                </LocalizedLink>
              </div>
            </div>
          </LayoutColumn>
        </Layout>
        {/*TODO: fix the product types section -> add meta data to product types field in backend!!*/}
        {/*<ProductTypesSection />*/}
        <CollectionsSlider
          heading="WHITEBOOK Categories"
          className="mb-22 md:mb-36"
          showViewAllButton={false}
          collectionOrder={[
            "wb-premium",
            "wb-couture",
            "wb-soft",
            "wb-standard",
            "wb-editions",
            "wb-cahiers",
          ]}
        />
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
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, md: 7 }}>
            <h2 className="text-md md:text-2xl">
              WHITEBOOK - TAILORED NOTEBOOKS WITH A MODERN TWIST
            </h2>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, md: 8 }} end={13}>
            <div className="md:text-md">
              <p className="mb-5 md:mb-3">
                Every WHITEBOOK is made to measure — designed to meet individual
                needs.
              </p>
              <p className="mb-5 md:mb-3">
                Whatever your preference and style, WHITEBOOK fits the way you
                work.
              </p>
              <LocalizedLink href="/about" variant="underline">
                More about WHITEBOOK
              </LocalizedLink>
            </div>
          </LayoutColumn>
          <LayoutColumn className="col-span-full">
            <video
              src="/images/content/handwriting_animation.mp4"
              width={2880}  
              height={1500}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              preload="metadata" 
              className="w-full h-auto"
            />
          </LayoutColumn>
        </Layout>
      </div>
    </>
  )
}
