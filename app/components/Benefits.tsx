import Image, { type StaticImageData } from "next/image";
import Reveal from "./Reveal";
import friendGroupImg from "../../public/friendgroup.png";
import personalImg from "../../public/personal.png";

type Benefit = {
  title: string;
  body: string;
  image: StaticImageData;
  alt: string;
};

const benefits: Benefit[] = [
  {
    title: "Get financial clarity, not financial stress.",
    body: "PocketWize helps you understand your spending, stay on top of your goals, and make smarter money decisions so you can spend less time worrying and more time living.",
    image: friendGroupImg,
    alt: "Friends enjoying time together without money worries",
  },
  {
    title: "Financial guidance that gets to know you.",
    body: "The more you use PocketWize, the better it understands your habits, adapts to your goals, and delivers insights that are uniquely relevant to your financial life.",
    image: personalImg,
    alt: "Personalized financial guidance tailored to you",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative bg-cream/40 py-32 sm:py-44">
      <ul className="grid gap-3 px-3 sm:grid-cols-2 sm:gap-4 sm:px-4">
        {benefits.map((b, i) => (
          <Reveal
            as="li"
            key={b.title}
            delay={i * 120}
            className="group relative aspect-4/5 overflow-hidden rounded-3xl bg-cream sm:aspect-square lg:aspect-5/4"
          >
            <Image
              src={b.image}
              alt={b.alt}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/80 via-black/40 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 sm:p-8 lg:p-10">
              <h3 className="text-[21px] font-semibold leading-[1.25] text-white">
                {b.title}
              </h3>
              <p className="mt-3 max-w-md text-[15px] font-normal leading-[1.45] text-white/85">
                {b.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
