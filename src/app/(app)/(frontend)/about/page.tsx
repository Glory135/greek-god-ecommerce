import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SectionTitle from "@/components/Sections/SectionTitle";
import Image from "next/image";

export default function AboutPage() {
  return (
    <MaxWidthWrapper className="flex flex-col gap-5 md:gap-0">
      <>
        <SectionTitle title="About Us" />
        <div className="w-full flex flex-col-reverse gap-10 md:gap-0 md:flex-row">
          <div className="flex-1 relative aspect-square">
            <Image className="object-cover" src={"/images/about1.jpg"} fill alt="about" />
          </div>
          <div className="flex-1 flex flex-col gap-5 md:p-10 justify-center text-start">
            <p className="text-xl font-bold">Unleash Your Inner Deity with GreekGod.</p>
            <p className="text-xl">At GreekGod, we're more than just a clothing brand;
              we're a movement dedicated to empowering you to
              express your authentic self.
              Just as the Greek gods and goddesses commanded
              their destinies, we want our clothing to inspire you
              to embrace your unique power and style.</p>
            <p className="text-xl">Every stitch, every design, and every piece we create channels the strength, elegance, and confidence of ancient legends reimagined for the modern world. Whether you're conquering your day, making a statement, or rewriting your story, GreekGod is your armor.
This isn't just fashion. It's mythology in motion. It's your era. Rule it.</p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-10 md:gap-0 md:flex-row">
          <div className="flex-1 flex flex-col gap-5 md:p-10 justify-center text-start">
            <p className="text-xl">At GreekGod, we're more than just a clothing brand; we're a movement dedicated to empowering you to express your authentic self. Just as the Greek gods and goddesses commanded their destinies, we want our clothing to inspire you to embrace your unique power and style.</p>
            <p className="text-xl">From bold statements to timeless essentials, our
              designs are created to make you feel confident,
              strong, and undeniably divine.</p>
            <p className="text-xl font-bold">Step into your greatness with GreekGod.</p>
          </div>          <div className="flex-1 relative aspect-square">
            <Image className="object-cover" src={"/images/about2.jpg"} fill alt="" />
          </div>
        </div>
      </>
    </MaxWidthWrapper>
  )
}