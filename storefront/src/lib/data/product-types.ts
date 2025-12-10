import { sdk } from "@lib/config"
import { HttpTypes, PaginatedResponse } from "@medusajs/types"

export const getProductTypesList = async function (
  offset: number = 0,
  limit: number = 100,
  fields?: (keyof HttpTypes.StoreProductType)[]
): Promise<{ productTypes: HttpTypes.StoreProductType[]; count: number }> {
  // console.log("🔍 getProductTypesList called with:", { offset, limit, fields })

  const query = { limit, offset, fields: fields ? fields.join(",") : undefined }
  // console.log("📋 Query parameters:", query)

  try {
    const response = await sdk.client.fetch<
      PaginatedResponse<{
        product_types: HttpTypes.StoreProductType[]
        count: number
      }>
    >("/store/custom/product-types", {
      query,
      next: { tags: ["product-types"], revalidate: 60 },
      cache: "force-cache",
    })

    // console.log("✅ API Response:", response)

    const result = {
      productTypes: response.product_types,
      count: response.count,
    }

    // console.log("📤 Returning:", result)
    return result
  } catch (error) {
    // console.error("❌ Error in getProductTypesList:", error)
    throw error
  }
}

export const getProductTypeByHandle = async function (
  handle: string
): Promise<HttpTypes.StoreProductType> {
  return sdk.client
    .fetch<
      PaginatedResponse<{
        product_types: HttpTypes.StoreProductType[]
        count: number
      }>
    >("/store/custom/product-types", {
      query: { handle, limit: 1 },
      next: { tags: ["product-types"] },
      cache: "force-cache",
    })
    .then(({ product_types }) => product_types[0])
}
