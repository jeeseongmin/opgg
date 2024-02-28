import React, {useRef, useState} from 'react';
import {getItemImageByItemNum} from 'services/Image';

const ItemImageComponent = ({data, itemNum}) => {
	const imgRef = useRef(null);
	const [imageUrl, setImageUrl] = useState(getItemImageByItemNum(data[`item${itemNum}`]));
	
	let itemCode = data[`item${itemNum}`];
	if (itemCode === 0) return <div className={'emptyItem'}></div>;
	return <img
		ref={imgRef}
		className={'emptyItem'}
		src={imageUrl}
	/>;
};

export default ItemImageComponent;
