import {FC, useState} from "react";
import {useLocation} from "react-router-dom";
import {GoBackButton} from "@/features/GoBackButton";


export const MenuProductPage: FC = () => {
    const location = useLocation();
    const [currentImg, setCurrentImg] = useState(location.state.product.images[0])
    const [currentPrice, setCurrentPrice] = useState(location.state.product.price[0])

    const handleImageClick = (image: string) => {
        setCurrentImg(image);
        console.log(location.state.product.price[0])
    }

    const handleSizeClick = (index: number) => {
        setCurrentPrice(location.state.product.price[index]);
    }

    return (
        <>
            <div className="">
                <div>
                    <GoBackButton/>
                    <div className="">
                        <div className="">
                            {location.state.product.images.map((image: string, index: number) => (
                                <img className="" key={index} src={image}
                                     onClick={() => handleImageClick(image)} alt=""/>
                            ))}
                        </div>
                        <div className="">
                            <img className="" src={currentImg} alt={location.state.product.name}/>
                        </div>
                        <div className="">
                            <p className="">{location.state.product.name}</p>
                            <p className="">{location.state.product.description}</p>
                            <p className="">{location.state.product.category.name}</p>
                            <div>
                                <ul className="">
                                    {location.state.product.price.map((element, index: number) => (
                                        <li key={index} onClick={() => handleSizeClick(index)}>{element.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p>{currentPrice.price}</p>
                            </div>
                            <button className="">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}