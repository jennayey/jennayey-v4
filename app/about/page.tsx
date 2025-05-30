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
import cycling from "@/public/cycling.jpg";
import cycling2 from "@/public/cycling-2.jpg";
import painting from "@/public/painting-2.jpg";

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
        <div className="hidden md:grid grid-flow-col grid-rows-2 gap-4">
          <div className="row-span-2 overflow-hidden">
            <AspectRatio ratio={3 / 4}>
              <Image
                src={cycling}
                alt="Image"
                fill
                objectFit="cover"
                placeholder="blur"
                className="rounded-md"
              />
            </AspectRatio>
          </div>
          <div className="col-span-1 overflow-hidden">
            <AspectRatio ratio={1.59 / 1}>
              <Image
                src={cycling2}
                alt="Image"
                fill
                placeholder="blur"
                objectFit="cover"
                className="rounded-md"
              />
            </AspectRatio>
          </div>
          <div className="col-span-1 row-span-1 overflow-hidden">
            <AspectRatio ratio={1.59 / 1}>
              <Image
                src={painting}
                alt="Image"
                fill
                placeholder="blur"
                objectFit="cover"
                className="rounded-md"
              />
            </AspectRatio>
          </div>
        </div>

        <div className="md:hidden overflow-hidden">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={cycling}
              alt="Image"
              fill
              placeholder="blur"
              objectFit="cover"
              className="rounded-md object-[25%_25%]
"
            />
          </AspectRatio>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <p className="text-sm text-zinc-400">Designer, developer and more</p>
          <p className="text-sm text-zinc-50">
            Hi, I&rsquo;m Jenna. I&rsquo;m a designer and builder based in Metro
            Manila, Philippines.
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
        <div className="grid grid-cols-1 gap-4">
          <p className="text-sm text-zinc-400">
            Favorite things (as of May 30, 2025)
          </p>
          <div>
            <Favorites category="Keyboard" item="Pabile P42" />
            <Favorites
              category="Bike thing"
              item="Life Behind Bars - Echelon"
              url="https://lbbjkt.com/products/echelon-s-x21-slate_grey?variant=50677899264284"
              hasURL
            />
            <Favorites category="Controller" item="8bitdo Ultimate Bluetooth" />
            <Favorites category="Video game" item="Hades II" />
            <Favorites category="Tinker tool" item="Engineer-SS2" />
            <Favorites category="Movie" item="The Breakfast Club" />
            <Favorites category="Sitcom" item="Derry Girls" />
            <Favorites
              category="Song"
              item="Messy (from F1 The Movie)"
              url="https://open.spotify.com/track/6Wobsw9uZ0D0xkfOjxXSq9?si=dab3d0af65074a46"
              hasURL
            />
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
            <a
              href="mailto:hello@jennayey.com"
              target="_blank"
              className="hover:text-yellow-500 hover:underline"
            >
              Let&apos;s work together
            </a>
          </div>
        </div>
      </main>
    </main>
  );
}
