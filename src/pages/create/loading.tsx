const RippleSvg = () =>(
	<svg width="64px" height="64px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
		<circle cx="50" cy="50" r="0" fill="none" stroke="#a0b454" strokeWidth="5">
			<animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
			<animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
		</circle><circle cx="50" cy="50" r="0" fill="none" stroke="#4c6cac" strokeWidth="5">
			<animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate>
			<animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate>
		</circle>
	</svg>
)


export function LoadingSidebar () {
	return (
		<div className='min-h-[570px] relative -left-3 flex items-center justify-center'>
			<RippleSvg/>
		</div>
	)
}

export function LoadingMap () {
	return (
		<div className='h-full w-full flex-1 flex items-center justify-center'>
			<RippleSvg/>
		</div>
	)
}