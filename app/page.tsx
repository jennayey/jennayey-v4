import { Button } from "@/components/ui/button";
import Sidequest from "@/components/ui/sidequestCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
export default function Home() {
  return (
    <div className="">
      <main className="grid grid-cols-1 gap-8">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-2">
            <p className="text-base font-semibold text-zinc-50">
              Jennaleigh Angala
            </p>
            <p className="text-sm text-zinc-400">
              Designer, developer and more
            </p>
            <p className="text-sm text-zinc-50">
              I’m a pixel-nudger in Figma by day. Amateur developer and gamer by
              night. And when I want to take a break from screens, I enjoy
              cycling around and overtaking cars in traffic.
            </p>
          </div>
          <div>
            <Link href="/about">
              <Button className="cursor-pointer" variant="default">
                More about me
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <p className="text-sm text-zinc-400">Personal side-quests</p>
          <div className="grid grid-cols-1 gap-4">
            <Sidequest
              title="Siklista Parking PH"
              description="A community-driven bike parking directory for bike commuters in Metro Manila"
              url="https://siklistaparking.com"
            />
            <Sidequest
              title="Philippine Scripts Translator"
              description="A web translator for the Philippine Writing Scripts: Baybayin, Hanunoo, Tagbanwa & Buhid"
              url="https://translate.jennayey.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <p className="text-sm text-zinc-400">Professional Experience</p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="w-full grid grid-cols-[150px_1fr_min-content] gap-4">
                  <span>UX/UI Designer</span>
                  <span>Tito Solutions</span>
                  <span className="ml-auto">Today</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Doing my best in building and desiginng web and mobile digital
                products
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="w-full grid grid-cols-[150px_1fr_max-content] gap-4">
                  <span>Experience Designer</span>
                  <span>Yazi Inc.</span>
                  <span className="ml-auto">2022-2025</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Built and designed multiple websites, mobile apps and SaaS
                products{" "}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="w-full grid grid-cols-[150px_1fr_max-content] gap-4">
                  <span>Web and UI Designer</span>
                  <span>Orangefix Inc.</span>
                  <span className="ml-auto">2019-2022</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Designed and illustrated literacy and educational mobile apps
                for children in the Philippines
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
      <footer></footer>
    </div>
  );
}
