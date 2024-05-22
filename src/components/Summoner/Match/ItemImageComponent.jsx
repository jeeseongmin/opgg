import React, {useEffect, useRef, useState} from 'react';
import {getItemImageByItemNum} from 'services/Image';
import itemData from 'data/items.json';

const ItemImageComponent = ({data, itemNum}) => {
	const imgRef = useRef(null);
	const [showPopup, setShowPopup] = useState(false);
	const [imageUrl, setImageUrl] = useState(getItemImageByItemNum(data[`item${itemNum}`]));
	const items = itemData.data;
	const [itemInfo, setItemInfo] = useState(items[data['item' + itemNum]]);
	
	useEffect(() => {
		console.log(itemInfo, data['item' + itemNum]);
	}, [itemInfo]);
	
	let itemCode = data[`item${itemNum}`];
	if (itemCode === 0) return <div className={'emptyItem'}></div>;
	
	return <div onMouseOver={() => setShowPopup(true)} onMouseLeave={() => setShowPopup(false)} className={'itemWrapper'}>
		{
			showPopup &&
			<div className={'itemPopupWrapper'}>
				<div className={'itemContentWrapper'}>
					<div className={'itemContent'}>
						<p className={'itemName'}>{itemInfo.name}</p>
						<p className={'itemDescription'} dangerouslySetInnerHTML={{__html: itemInfo.description}}></p>
						<p className={'itemDescription'}>{itemInfo.plaintext}</p>
					</div>
					<div className={'itemArrow'}></div>
				</div>
			</div>
		}
		<img
			ref={imgRef}
			src={imageUrl}
		/>
	</div>;
};

export default ItemImageComponent;
