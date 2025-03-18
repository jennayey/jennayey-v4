import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Favorites from "@/components/ui/favorites";
export default function About() {
  return (
    <main>
      <main className="grid grid-cols-1 gap-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>More about me</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-2">
            <div className="w-full grid grid-cols-2 gap-4">
              <AspectRatio ratio={9 / 16}>
                <Image
                  src="https://baconmockup.com/720/1280/"
                  alt="Image"
                 fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
              <AspectRatio ratio={9 / 16}>
                <Image
                  src="https://baconmockup.com/1280/720"
                  alt="Image"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            <p className="text-sm text-zinc-400">
              Designer, developer and more
            </p>
            <p className="text-sm text-zinc-50">
              Hi, I&rsquo;m Jenna. I&rsquo;m a designer and builder based in
              Metro Manila, Philippines.
              <br />
              <br />
              Currently, I&rsquo;m building user interfaces and experiences at
              Tito Solutions. After work, I am usually building my personal side
              projects, painting with watercolor, cycling outside (sometimes
              indoors too), or killing{" "}
              <span className="italic font-semibold">time</span> with{" "}
              <a
                href="https://store.steampowered.com/app/1145350/Hades_II/"
                target="_blank"
                className="underline text-yellow-500"
              >
                Hades II.
              </a>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <p className="text-sm text-zinc-400">
            Favorite things (as of Mar 18, 2025)
          </p>
          <div>
            <Favorites category="Keyboard" item="Pabile P42" />
            <Favorites
              category="Bike bag"
              item="Life Behind Bars - Echelon"
              url="https://lbbjkt.com/products/echelon-s-x21-slate_grey?variant=50677899264284"
              hasURL
            />
            <Favorites category="Controller" item="8bitdo Ultimate Bluetooth" />
            <Favorites category="Video game" item="Hades II" />
            <Favorites category="Soldering tool" item="Engineer-SS2" />
            <Favorites category="Movie" item="The Breakfast Club" />
            <Favorites category="Sitcom" item="How I Met Your Mother" />
            <Favorites category="Song" item="Handlebars" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <p className="text-sm text-zinc-400">Stalk me</p>
          <div className="grid grid-cols-1 gap-3 text-sm text-zinc-50 underline-offset-4 ">
            <a
              href="https://github.com/jennayey"
              target="_blank"
              className="hover:text-yellow-500 hover:underline"
            >
              Github
            </a>
            <a
              href="https://linkedin.com/in/jenna-angala"
              target="_blank"
              className="hover:text-yellow-500 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://bento.me/jennayey"
              target="_blank"
              className="hover:text-yellow-500 hover:underline"
            >
              Bento
            </a>
          </div>
        </div>
      </main>
    </main>
  );
}
