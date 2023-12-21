import React from 'react';
import 'components/Banner/Banner.scss';

const Banner = () => {
	return (
		<div className={'bannerWrapper'}>
			<div className={'homeBanner'}>
				<a
					href={
						'https://gigs.op.gg/intro-app?utm_source=opgg&utm_medium=txt&utm_campaign=app'
					}
					target={'_blank'}
					rel='noreferrer'
				>
					한 번 들어보기만 했는데 티어가 올라갑니다! 🚀
				</a>
			</div>
		</div>
	);
};

export default Banner;
