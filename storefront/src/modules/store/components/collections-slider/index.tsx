import * as React from "react"
import Image from "next/image"
import { getCollectionsList } from "@lib/data/collections"
import { Carousel } from "@/components/Carousel"
import { LocalizedButtonLink, LocalizedLink } from "@/components/LocalizedLink"
import { twMerge } from "tailwind-merge"

export const CollectionsSlider: React.FC<{
  heading?: React.ReactNode
  className?: string
  showViewAllButton?: boolean
  viewAllHref?: string
  collectionOrder?: string[]
  excludedCollections?: string[]
}> = async ({
  heading = "Collections",
  className,
  showViewAllButton = false,
  viewAllHref = "/store",
  collectionOrder,
  excludedCollections,
}) => {
  const collections = await getCollectionsList(0, 20, [
    "id",
    "title",
    "handle",
    "metadata",
  ])

  if (!collections || !collections.collections.length) {
    return null
  }

  let sortedCollections
  if (!excludedCollections) {
    sortedCollections = collections.collections
  } else {
    // Remove excluded collections
    sortedCollections = collections.collections.filter(
      (collection) => !excludedCollections?.includes(collection.handle)
    )
  }

  // Sort collections based on provided order
  if (collectionOrder && collectionOrder.length > 0) {
    sortedCollections = collectionOrder
      .map((handle) => collections.collections.find((c) => c.handle === handle))
      .filter(Boolean) as typeof collections.collections
  }

  const button = showViewAllButton ? (
    <>
      <LocalizedButtonLink
        href={viewAllHref}
        size="md"
        className="h-full flex-1 max-md:hidden md:h-auto"
      >
        View All
      </LocalizedButtonLink>
      <LocalizedButtonLink href={viewAllHref} size="sm" className="md:hidden">
        View All
      </LocalizedButtonLink>
    </>
  ) : undefined

  // Split collections into chunks of 6
  const chunkSize = 6
  const collectionChunks = []
  for (let i = 0; i < sortedCollections.length; i += chunkSize) {
    collectionChunks.push(sortedCollections.slice(i, i + chunkSize))
  }

  return (
    <div className={twMerge("mb-26 md:mb-36", className)}>
      {collectionChunks.map((chunk, chunkIndex) => (
        <Carousel
          key={chunkIndex}
          heading={
            chunkIndex === 0 ? (
              <h3 className="text-md md:text-2xl">{heading}</h3>
            ) : undefined
          }
          button={chunkIndex === 0 ? button : undefined}
          className={chunkIndex > 0 ? "mb-16 md:mb-26" : undefined}
        >
          {chunk.map((collection) => (
            <div
              key={collection.id}
              className="w-[70%] sm:w-[60%] lg:w-full max-w-124 flex-shrink-0"
            >
              <LocalizedLink href={`/collections/${collection.handle}`}>
                {typeof collection.metadata?.image === "object" &&
                  collection.metadata.image &&
                  "url" in collection.metadata.image &&
                  typeof collection.metadata.image.url === "string" && (
                    <div className="relative mb-4 md:mb-10 w-full">
                      <Image
                        src={collection.metadata.image.url}
                        alt={collection.title}
                        width={0}
                        height={0}
                        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 60vw, 33vw"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
              </LocalizedLink>
            </div>
          ))}
        </Carousel>
      ))}
    </div>
  )
}
