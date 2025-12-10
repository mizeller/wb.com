import { Modules } from "@medusajs/framework/utils";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { z } from "zod";

const collectionFieldsMetadataSchema = z.object({
  image: z
    .object({
      id: z.string(),
      url: z.string().url(),
    })
    .optional(),
  description: z.string().optional(),
  collection_page_image: z
    .object({
      id: z.string(),
      url: z.string().url(),
    })
    .optional(),
  collection_page_heading: z.string().optional(),
  collection_page_content: z.string().optional(),
});

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { collectionId } = req.params;
  const productService = req.scope.resolve(Modules.PRODUCT);
  const collection =
    await productService.retrieveProductCollection(collectionId);

  const parsed = collectionFieldsMetadataSchema.safeParse(
    collection.metadata ?? {},
  );

  res.json({
    image: parsed.success && parsed.data.image ? parsed.data.image : null,
    description:
      parsed.success && parsed.data.description ? parsed.data.description : "",
    collection_page_image:
      parsed.success && parsed.data.collection_page_image
        ? parsed.data.collection_page_image
        : null,
    collection_page_heading:
      parsed.success && parsed.data.collection_page_heading
        ? parsed.data.collection_page_heading
        : "",
    collection_page_content:
      parsed.success && parsed.data.collection_page_content
        ? parsed.data.collection_page_content
        : "",
  });
}

export async function POST(
  req: MedusaRequest<typeof collectionFieldsMetadataSchema>,
  res: MedusaResponse,
): Promise<void> {
  const { collectionId } = req.params;
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const customFields = collectionFieldsMetadataSchema.parse(body);

  const productService = req.scope.resolve(Modules.PRODUCT);
  const collection =
    await productService.retrieveProductCollection(collectionId);

  const updatedCollection = await productService.updateProductCollections(
    collectionId,
    {
      metadata: {
        ...collection.metadata,
        ...customFields,
      },
    },
  );

  res.json(updatedCollection);
}
