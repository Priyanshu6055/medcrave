"use client";

import { usePathname } from "next/navigation";
import AboutBanner from "./AboutBanner";

type BannerProps = React.ComponentProps<typeof AboutBanner>;

export default function BannerWrapper(props: BannerProps) {
  const pathname = usePathname();
  return <AboutBanner key={pathname} {...props} />;
}
