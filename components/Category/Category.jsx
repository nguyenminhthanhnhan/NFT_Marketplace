import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";
import icon from "../../img";

const Category = () => {
	const CategoryArray = [
		{
			images: images.ImagePlaceHolder,
			icon: icon.PaintBrush,
			text: "Art",
		},
		{
			images: images.ImagePlaceHolder2,
			icon: icon.Swatches,
			text: "Collect",
		},
		{
			images: images.ImagePlaceHolder3,
			icon: icon.MusicNotes,
			text: "Music",
		},
		{
			images: images.ImagePlaceHolder4,
			icon: icon.Camera,
			text: "Photography",
		},
		{
			images: images.ImagePlaceHolder5,
			icon: icon.VideoCamera,
			text: "Video",
		},
		{
			images: images.ImagePlaceHolder6,
			icon: icon.MagicWand,
			text: "Utility",
		},
		{
			images: images.ImagePlaceHolder7,
			icon: icon.Basketball,
			text: "Sport",
		},
		{
			images: images.ImagePlaceHolder8,
			icon: icon.Planet,
			text: "Virtual Worlds",
		},
	];

	return (
		<div className={Style.box_category}>
			<div className={Style.category}>
				{CategoryArray.map((el, i) => (
					<div className={Style.category_box_images} key={1 + 1}>
						<div className={Style.category_box_img}>
							<Image
								src={el.images}
								className={Style.category_box_img_img}
								alt='Background image'
								width={350}
								height={350}
								objectFit='cover'
							/>
						</div>
						<div className={Style.category_box_icon}>
							<Image
								src={el.icon}
								className={Style.category_box_icon_icon}
								alt='Background image'
							/>
						</div>
						<div className={Style.category_box_title}>{el.text}</div>
					</div>
				))}
				{/* {IconArray.map((el, i) => (
					<div className={Style.category_box_icon} key={1 + 1}>
						<Image
							src={el}
							className={Style.category_box_icon_icon}
							alt='Background image'
							objectFit='cover'
						/>
					</div>
				))} */}
			</div>
		</div>
	);
};

export default Category;
