"use client";
import { useEffect, useState, useRef } from "react";
import EmblaCarousel, { type EmblaCarouselType } from "embla-carousel";

const notifications = [
	"Rose Jasmine Face Cleanser on first order above Rs 1200. Use Code - KAMANEW",
	"Free shipping on all orders above Rs 2000!",
	"Buy 2 Get 1 Free on all skincare products",
	"Special Holiday Offer - 30% off on gift sets",
];

export const NotificationBanner = () => {
	const emblaRef = useRef<HTMLDivElement>(null);
	const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
	// const lastScrollY = useRef(0);
	// const bannerRef = useRef<HTMLDivElement>(null);
	// const [bannerHeight, setBannerHeight] = useState(0);

	useEffect(() => {
		if (emblaRef.current) {
			const embla = EmblaCarousel(emblaRef.current, {
				loop: true,
				duration: 20,
				skipSnaps: true,
				dragFree: true,
				watchDrag: false,
			});
			setEmblaApi(embla);
		}
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		let timer = 0;
		const play = () => {
			stop();
			timer = window.setTimeout(() => {
				emblaApi.scrollNext();
				play();
			}, 3000);
		};

		const stop = () => {
			clearTimeout(timer);
			timer = 0;
		};

		play();

		return () => {
			stop();
			emblaApi.destroy();
		};
	}, [emblaApi]);

	return (
		<div className="    left-0 right-0  z-[1000] w-full overflow-hidden bg-[#fff9f4] shadow-sm">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{notifications.map((notification, index) => (
						<div
							key={index}
							className="min-w-0 flex-[0_0_100%] p-3 text-center text-sm font-medium text-[#e67e22]"
						>
							{notification}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
