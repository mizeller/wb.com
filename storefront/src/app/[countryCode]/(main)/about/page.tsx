import { Metadata } from "next"
import Image from "next/image"
import { StoreRegion } from "@medusajs/types"
import { listRegions } from "@lib/data/regions"
import { Layout, LayoutColumn } from "@/components/Layout"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about WHITEBOOK",
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

export default function AboutPage() {
  return (
    <>
      <div className="mt-18 md:mt-21 relative w-full max-w-full">
        <Image
          // src="https://s3.mizeller.com/medusa/storefront/about/00.png"
          src="https://placehold.co/1920x1080/png"
          width={0}
          height={0}
          sizes="100vw"
          alt="About Page Header"
          className="w-full h-auto"
        />
      </div>
      <div className="pt-8 md:pt-26 pb-26 md:pb-36">
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, lg: 7 }}>
            <h3 className="text-md max-lg:mb-6 md:text-2xl">
              THE BEGINNING OF WHITEBOOK
            </h3>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="md:text-md">
              <p className="mb-5 lg:mb-9">
                Despite our increasingly digital lifestyle, can we truly imagine
                life without handwritten notes?
              </p>
              <p className="mb-5 lg:mb-9">
                Paper lets us clear our minds instantly, freeing space for new
                thoughts — yet always ready to reveal forgotten ideas when we
                turn back the pages.
              </p>
              <p>
                That’s how it should be.<br></br>
                That’s how we wanted it to be.<br></br>
                That’s how the story of <b>WHITEBOOK</b> began.
              </p>
            </div>
          </LayoutColumn>
          <LayoutColumn>
            <Image
              // src="https://s3.mizeller.com/medusa/storefront/about/01.png"
              src="https://placehold.co/1920x1080/png"
              width={2496}
              height={1404}
              alt="Living room with black armchair and dark gray sofa"
              className="mt-26 lg:mt-36 mb-8 lg:mb-26"
            />
          </LayoutColumn>
          <LayoutColumn start={1} end={{ base: 13, lg: 7 }}>
            <h3 className="text-md max-lg:mb-6 md:text-2xl">
              Tailored Notebooks with a Modern Twist
            </h3>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="md:text-md">
              <p className="mb-5 lg:mb-9">
                WHITEBOOK is a modular notebook combining the timeless art of
                handwriting with the possibilities of modern life.<br></br>
              </p>
            </div>
          </LayoutColumn>
          <LayoutColumn start={{ base: 2, lg: 1 }} end={{ base: 12, lg: 7 }}>
            <Image
              // src="https://s3.mizeller.com/medusa/storefront/about/02.png"
              src="https://placehold.co/1920x1080/png"
              width={1200}
              height={1600}
              alt="Whitebook with business suits"
              // className="mt-26 lg:mt-36 mb-16 lg:mb-46"
              className="mb-16 lg:mb-46"
            />
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="md:text-sm max-lg:mb-26">
              <h3 className="text-l mb-4">WHITEBOOK CLASSIC</h3>
              <p className="mb-5 md:mb-9">
                Combines digital and analog in one — a rare pairing made
                effortless. With WHITEBOOK, your digital tablet is stored
                together with your analog notebook and planner in a single
                elegant cover.<br></br>
              </p>
              <h3 className="text-l mb-4">WHITEBOOK SLIM</h3>
              <p className="mb-5 md:mb-9">
                Offers everything that makes a WHITEBOOK unique — just slimmer.
                Instead of tablet integration, it features refined X-pockets in
                the cover for notes and documents. SLIM WHITEBOOKS are
                exceptionally compact and fit easily into almost any bag.
              </p>
              <h3 className="text-l mb-4">WHITEBOOK CAHIERS</h3>
              {/*TODO: add links to the CAHIER Collection Pages!*/}
              <p className="mb-5 md:mb-9">
                Tailored Notebooks can hold up to four refillable notebooks for
                writing, composing, sketching, or planning. Pages are easily
                removable thanks to fine micro-perforation.
              </p>
              <h3 className="text-l mb-4">GOOD TO KNOW</h3>
              <p className="mb-5 md:mb-9">
                Handcrafted to order in Switzerland, each WHITEBOOK reflects
                fair craftsmanship, responsibly sourced materials, and a
                commitment to social inclusion through meaningful workplace
                integration.
              </p>
            </div>
          </LayoutColumn>
        </Layout>

        {/*<Layout>*/}
        {/*<LayoutColumn className="col-span-full">*/}
        <video
          src="/images/content/wb_satisfy_needs.mp4"
          width={2880}
          height={1500}
          autoPlay
          muted
          loop
          className="w-full h-auto mt-26 lg:mt-36 mb-8 lg:mb-26"
        />
        {/*</LayoutColumn>*/}
        {/*</Layout>*/}

        <Layout>
          <LayoutColumn start={1} end={13}>
            <Image
              // src="https://s3.mizeller.com/medusa/storefront/about/03.png"
              src="https://placehold.co/1920x1080/png"
              width={2880}
              height={1618}
              alt="Comparison Different Formats"
              className="mb-8 lg:mb-26"
            />
          </LayoutColumn>
          <LayoutColumn start={1} end={{ base: 13, lg: 7 }}>
            <h3 className="text-md max-lg:mb-6 md:text-2xl">
              WHITEBOOK adapts to your personal style
            </h3>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="md:text-md">
              <p className="mb-5 lg:mb-9">
                Depending on the cover type, WHITEBOOK can be equipped with up
                to four different notebooks — and even securely integrate your
                tablet. Whether you prefer lined, squared, or blank pages, or
                wish to include a planner alongside your digital companion —
                WHITEBOOK fits the way you work.
              </p>
            </div>
          </LayoutColumn>
          <LayoutColumn start={{ base: 2, lg: 1 }} end={{ base: 12, lg: 7 }}>
            <Image
              // src="https://s3.mizeller.com/medusa/storefront/about/04.png"
              src="https://placehold.co/1920x1080/png"
              width={1200}
              height={1600}
              alt="Image Grid Slim v. Classic"
              // className="mt-26 lg:mt-36 mb-16 lg:mb-46"
              className="mb-16 lg:mb-46"
            />
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="md:text-sm max-lg:mb-26">
              <h3 className="text-l mb-4">WHITEBOOK COVERS</h3>
              <p className="mb-5 md:mb-9">
                <li>Up to 4 refillable, modular content journals</li>
                <li>Detachable, acid-free, FSC-certified pages</li>
                <li>
                  Pockets for loose notes and slots for business and memory
                  cards (CLASSIC)
                </li>
                <li>X-Pockets loose notes in front and back cover (SLIM)</li>
                <li>Flexible pen holder, suitable for various pens</li>
                <li>Durable Lycra elastic band closure</li>
                <li>Satin bookmarks (CLASSIC: 2x / SLIM: 3x)</li>
                <li>Elastic corner bands for tablet integration (CLASSIC)</li>
                <li>Handmade with conscience in Switzerland</li>
              </p>
              <h3 className="text-l mb-4">WHITEBOOK CAHIERS</h3>
              <p className="mb-5 md:mb-9">
                <li>Range of journals to customize and renew your WHITEBOOK</li>
                <li>Detachable, acid-free, FSC-certified pages</li>
                <li>Outer cover: Logo embossed</li>
                <li>Inner cover: WHITEBOOK color</li>
                <li>60 detachable pages (invisible micro-perforation)</li>
                <li>Rounded corners</li>
                <li>Acid-free, FSC-certified paper</li>
                <li>Charming «Keep your flow-page»</li>
              </p>
            </div>
          </LayoutColumn>
        </Layout>

        <Image
          // src="https://s3.mizeller.com/medusa/storefront/about/05.png"
          src="https://placehold.co/1920x1080/png"
          width={0}
          height={0}
          sizes="100vw"
          alt=""
          className="w-full h-auto mb-8 lg:mb-26"
        />
        {/*<Layout>
          <LayoutColumn>
            <Image
              src="https://s3.mizeller.com/medusa/storefront/about/05.png"
              width={0}
              height={0}
              sizes="100vw"
              alt=""
              className="w-full h-auto mb-8 lg:mb-26"
            />
          </LayoutColumn>
        </Layout>*/}

        <Layout>
          <LayoutColumn
            start={1}
            end={{ base: 13, lg: 7 }}
            className="lg:order-1"
          >
            <h3 className="text-md max-lg:mb-6 md:text-2xl">
              WHITEBOOK&apos;s Flagship Store in Switzerland
            </h3>
            <Image
              // src="https://s3.mizeller.com/medusa/storefront/about/06.png"
              src="https://placehold.co/1600x1200/png"
              width={1200}
              height={1600}
              alt=""
              className="mt-6 lg:mt-6 mb-16 lg:mb-46 lg:block hidden"
            />
          </LayoutColumn>
          <LayoutColumn
            start={{ base: 1, lg: 8 }}
            end={13}
            className="lg:order-2"
          >
            <div className="md:text-md max-lg:mb-26">
              <p className="mb-5 lg:mb-9">
                When in Switzerland, visit{" "}
                <a
                  href="https://landolt-arbenz.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Landolt-Arbenz
                </a>
                , the WHITEBOOK flagship store on Zurich&apos;s famous
                Bahnhofstrasse.
              </p>
              <p className="mb-5 lg:mb-9">
                From WHITEBOOK&apos;s tailored notebooks to Montblanc&apos;s
                finest pens, this iconic stationery shop tells the Swiss story
                of writing like no other.
              </p>
              <p className="mb-5 lg:mb-9">
                WHITEBOOK is also available through a growing network of premium
                retailers worldwide and online at whitebook.com.
              </p>
            </div>
            {/* Image for mobile - shows after text on small screens */}
            <Image
              src="https://s3.mizeller.com/medusa/storefront/about/06.png"
              width={1200}
              height={1600}
              alt=""
              className="mt-6 mb-16 lg:hidden block"
            />
          </LayoutColumn>
        </Layout>
      </div>
    </>
  )
}
