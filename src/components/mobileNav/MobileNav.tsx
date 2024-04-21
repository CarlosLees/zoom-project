'use client';

import Image from 'next/image';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                {/* 开关按钮 */}
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        alt="hamburger"
                        width={36}
                        height={36}
                        className="cursor-pointer sm:hidden"
                    />
                </SheetTrigger>
                {/* 内容 */}
                <SheetContent side="left" className="border-none bg-dark-1">
                    <SheetClose asChild>
                        <Link href="/" className="flex items-center gap-4">
                            <Image
                                src="/icons/logo.svg"
                                alt="Zoom Project"
                                width={40}
                                height={40}
                                className="max-sm:size-10"
                            />
                            <p className="text-[26px] font-extrabold text-white">zoom</p>
                        </Link>
                    </SheetClose>

                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <section className="flex h-full flex-col gap-6 pt-16 text-white">
                            {sidebarLinks.map((sidebarLink) => {
                                const isActive =
                                    pathname === sidebarLink.route ||
                                    (pathname.startsWith(sidebarLink.route) &&
                                        sidebarLink.route !== '/');
                                return (
                                    <SheetClose asChild key={sidebarLink.route}>
                                        <Link
                                            href={sidebarLink.route}
                                            key={sidebarLink.label}
                                            className={cn(
                                                'flex gap-4 items-center p-4 rounded-lg w-full max-w-60',
                                                {
                                                    'bg-blue-1': isActive,
                                                },
                                            )}
                                        >
                                            <Image
                                                src={sidebarLink.imageUrl}
                                                alt={sidebarLink.label}
                                                width={20}
                                                height={20}
                                            />
                                            <p className="font-semibold">{sidebarLink.label}</p>
                                        </Link>
                                    </SheetClose>
                                );
                            })}
                        </section>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
