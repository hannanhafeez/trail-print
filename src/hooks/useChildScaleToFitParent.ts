import { RefObject, useEffect, useLayoutEffect, useState } from "react";
import { debounce } from "../utils/helperFunctions";

const { log, group, groupEnd } = console;

const consoleIt = (func: Function, ...options: any) => false && func(...options);

const isMobile = /iPhone|iPad|iPod|Android/i.test(global.navigator?.userAgent || '');

const RATIO_TOLERANCE = 0.06;
const RATIO_TOLERANCE_MOB = 0.03;

const useChildScaleToFitParent = (
	parentRef: RefObject<HTMLElement>,
	childRef: RefObject<HTMLElement>,
	isPortrait?: boolean,
	delay?: number,
) => {
	const [scale, setScale] = useState(1);

	const TOLERANCE = isMobile ? RATIO_TOLERANCE_MOB : RATIO_TOLERANCE;
	consoleIt(log, {TOLERANCE})

	const animationDelay = delay || 0

	const setMaxScale = (num: number) => setScale(Math.min(num, 1));


	useLayoutEffect(() => {
		const getSizes = () => {
			consoleIt(log, "\n\n");
			consoleIt(group, "Sizes");
			const { clientHeight: parentH = 0, clientWidth: parentW = 0 } =
				parentRef.current ?? {};
			consoleIt(log, "Parent size:", { parentH, parentW });

			const { clientHeight: childH = 0, clientWidth: childW = 0 } =
				childRef.current ?? {};
			consoleIt(log, "Child size:", { childH, childW });
			consoleIt(groupEnd);

			const isPPortrait = parentH > parentW;
			const isCPortrait = childH > childW;

			consoleIt(log, { isPPortrait, isCPortrait });

			if (isPPortrait && !isCPortrait) {
				const wRatio = parentW / childW - TOLERANCE;
				consoleIt(log, { wRatio });
				setMaxScale(wRatio);
			}

			if (isPPortrait && isCPortrait) {
				const wRatio = parentW / childW - TOLERANCE;
				const hRatio = parentH / childH - TOLERANCE;

				if (childH * (wRatio + TOLERANCE) >= parentH) setMaxScale(hRatio);
				else setMaxScale(wRatio);
			} else if (!isPPortrait && isCPortrait) {
				const hRatio = parentH / childH - TOLERANCE;
				consoleIt(log, { hRatio });
				setMaxScale(hRatio);
			} else if (!isPPortrait && !isCPortrait) {
				const hRatio = parentH / childH - TOLERANCE;
				const wRatio = parentW / childW - TOLERANCE;

				if (childW * (hRatio + TOLERANCE) >= parentW) setMaxScale(wRatio);
				else setMaxScale(hRatio);
			}

			consoleIt(log, "\n\n");

			return { parentH, parentW, childH, childW, isPPortrait, isCPortrait, };
		};

		consoleIt(log, "Rerendered")

		if(animationDelay === 0) getSizes();
		else setInterval(getSizes, animationDelay);


		window.addEventListener("resize", debounce(getSizes, 500));
		return () => window.removeEventListener("resize", debounce(getSizes, 500));
	}, [TOLERANCE, animationDelay, childRef, isPortrait, parentRef]);

	return { scale, };
};

export default useChildScaleToFitParent;