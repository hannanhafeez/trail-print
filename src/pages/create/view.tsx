import { FC, useReducer, useState, } from 'react'; 
import dynamic from 'next/dynamic';

import Image from 'next/image'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import css from './create.module.css'
import MyButton from '../../components/MyButton'

import { createReducer, pageState } from '../../store/slices/createPageSlice'
import SidebarContent from './components/SidebarContent';
import { Transition } from '@headlessui/react';
const PaperPrint = dynamic(() => import('./components/PaperPrint'), {ssr:false});
// import PaperPrint from './components/PaperPrint';

export type CreatePageViewProps = {
}

const CreatePageView:FC<CreatePageViewProps> = ({}) => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [state, dispatch] = useReducer(createReducer, pageState)

	return (
		<>
			<div className='flex flex-col min-h-screen'>
				<Header/>
				
				<section className={[css.my_container, " flex-1 self-stretch flex flex-col md:flex-row gap-4"].join(' ')}>
					<div className={css.main_view}>
						<PaperPrint
							colors={state.colors}
							mapStyle={state.mapStyle}
						/>
					</div>

					{/* Static Sidebar */}
					<div className={css.static_sidebar}>
						<SidebarContent state={state} dispatch={dispatch}/>

						<div className="flex flex-col gap-8 pt-20 pb-2 pr-4 text-center">
							<h2 className={css.total_label}>
								Total: $20.00
							</h2>
							<MyButton title='Preview & Order' className='py-2 text-[22px]'/>
						</div>
					</div>

					<MyButton title='Customize' className='md:hidden mb-2 sticky bottom-2 py-2 text-[22px] gap-4 flex-row-reverse'
						onClick={()=>setShowSidebar(old=>!old)}
					>
						<div className='relative w-5 h-5 animate-pulse'>
							<Image src={'/assets/svg/arrow1.svg'} alt={'Right arrow'} layout='fill' objectFit='contain'  />
						</div>
					</MyButton>
				</section>
				
				<Footer/>

				{/* Animating Sidebar */}
				<Transition show={showSidebar}
					className={`z-20 fixed md:hidden inset-0 overflow-y-auto`}
				>
					<Transition.Child onClick={() => setShowSidebar(false)}
						className={`fixed inset-0 bg-[#00000040]`}
						enter={`transition-opacity ease-linear duration-400`}
						enterFrom={`opacity-0`}
						enterTo={`opacity-100`}
						leave={`transition-opacity ease-linear duration-200`}
						leaveFrom={`opacity-100`}
						leaveTo={`opacity-0`}
					/>

					<Transition.Child unmount={false}
						className={`fixed top-0 bottom-0 w-[300px] sm:w-[400px] bg-white flex flex-col divide divide-y-[1px] divide-[#0092DB33]  overflow-y-auto uppercase font-raleway font-medium text-16`}
						enter={`transition ease-linear duration-400 transform`}
						enterFrom={`-translate-x-[300px] sm: -translate-x-[400px] `}
						enterTo={`translate-x-0`}
						leave={`transition ease-linear duration-200 transform`}
						leaveFrom={`translate-x-0`}
						leaveTo={`-translate-x-[300px] sm: -translate-x-[400px] `}
					>
						<div className={'w-full py-4 pl-8'}>
							<SidebarContent state={state} dispatch={dispatch} />

							<div className="flex flex-col gap-8 pt-20 pb-2 pr-4 text-center">
								<h2 className={css.total_label}>
									Total: $20.00
								</h2>
								<MyButton title='Preview & Order' className='py-2 text-[22px]' />
							</div>
						</div>

					</Transition.Child>

				</Transition>
			</div>
		</>
	)
}

export default CreatePageView