"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Typography from "@/components/ui/typography";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });

export function Header({ className }) {
  const pathname = usePathname();
  const items = [
    // {
    //   href: "https://map.sistilli.dev/public/coding/SaaS+Boilerplate",
    //   title: "Book a demo",
    //   openInNewTab: true,
    // },
    // { href: '#pricing', title: 'Features' },
    // {
    //   href: 'mailto:myemail@.com',
    //   title: 'Contact Us'
    // }
  ];

  const getLogo = () => (
    <Link href="/" className="pointer flex items-center">
      <img src="/robo_icon.png" className="mr-3 w-16 h-16" />
      <Typography className="!text-black !text-xl font-medium">Sync</Typography>
    </Link>
  );

  const getAuthButtons = () => (
    <div className="flex gap-3 items-center">
      <Link href="#" target="_blank">
        <Button size="lg" variant="outline">
          <Typography variant="p" className="text-blue-600">
            Login
          </Typography>
        </Button>
      </Link>
      <Link href="#" target="_blank">
        <Button size="lg" variant="default">
          <Typography variant="p">Sign Up</Typography>
        </Button>
      </Link>
    </div>
  );

  const getHeaderItems = () => {
    return (
      <>
        {items.map((item) => {
          const selected =
            pathname === item.href || pathname.includes(item.href);
          return (
            <Link
              href={item.href}
              className="pointer block w-fit"
              target={item.openInNewTab ? "_blank" : ""}
              key={item.title}
            >
              <Typography
                variant="p"
                className={cn(selected && "text-primary")}
              >
                {item.title}
              </Typography>
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <div
      className={cn(
        `flex md:h-23 h-20 items-center justify-center w-full
          border-b bg-white`,
        className
      )}
    >
      <div className="w-full md:px-16 px-6 max-w-[1500px]">
        {/* Desktop */}
        <div className="flex items-center gap-x-8 w-full">
          <div className={`md:flex-0 min-w-fit flex-1 ${pacifico.className}`}>
            {getLogo()}
          </div>
          <div className="md:flex flex items-center w-full">
            <div className="flex items-center gap-x-8 flex-1">
              {getHeaderItems()}
            </div>
            {getAuthButtons()}
          </div>
        </div>
      </div>
    </div>
  );
}
