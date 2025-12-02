"use client";

import BannerWrapper from "@/components/about/AboutBannerWrapper";
import TeamCards from "@/components/ui/TeamCard";
import { Member } from "@/components/ui/TeamCard";

export default function TeamPage() {
  const teamMembers: Member[] = [
    {
      photo: "/team-logo/user1.png",
      name: "Chief Executive Officer",
      subname: "Leading the Vision & Strategy",
      color: "#009688",
      role: "ceo",
      socials: {
        linkedin: "https://linkedin.com",
      },
    },
    {
      photo: "/team-logo/user2.png",
      name: "Incubation Manager",
      subname: "Driving Startup Growth",
      color: "#ff8844",
      socials: {
        instagram: "https://instagram.com",
      },
    },
    {
      photo: "/team-logo/user3.png",
      name: "Incubation Officer",
      subname: "Supporting Startup Teams",
      color: "#3742fa",
      socials: {
        twitter: "https://twitter.com",
      },
    },
    {
      photo: "/team-logo/user4.png",
      name: "Office Admin",
      subname: "Maintaining Daily Operations",
      color: "#3b82f6",
    },
    {
      photo: "/team-logo/user5.png",
      name: "Designer",
      subname: "Crafting Visual Experiences",
      color: "#0ea5e9",
      socials: {
        github: "https://github.com",
      },
    },
  ];

  const ceo = teamMembers[0];
  const others = teamMembers.slice(1);

  return (
    <>
      <BannerWrapper
        heading="Our Team"
        subtitle="Meet the passionate innovators driving our mission forward."
      />

      <section className="container-global py-20 px-6 text-center">
        <h1 className="text-[2rem] font-bold mb-14 text-black">Our Team</h1>
        <hr className="opacity-[10%]" />

        {/* CEO Row */}
        <div className="flex justify-center mb-24 mt-10">
          <TeamCards members={[ceo]} />
        </div>

        {/* Other Members Row */}
        <div className="flex flex-wrap justify-center gap-10">
          <TeamCards members={others} />
        </div>
      </section>
    </>
  );
}
