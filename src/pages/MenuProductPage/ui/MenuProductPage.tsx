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


    //<p className="product-card__text price">Price: <br/>$ {location.state.product.price}</p>

    return (
        <>
            <div className="">
                <div>
                    <GoBackButton/>
                    <div className="card-body">
                        <div className="product-images">
                            {location.state.product.images.map((image: string, index: number) => (
                                <img className="product-image" key={index} src={image}
                                     onClick={() => handleImageClick(image)}/>
                            ))}
                        </div>
                        <div className="product-image-current">
                            <img className="product-image current" src={currentImg} alt={location.state.product.name}/>
                        </div>
                        <div className="product-info">
                            <p className="product-card__text title">{location.state.product.name}</p>
                            <p className="product-card__text description">{location.state.product.description}</p>
                            <p className="product-card__text category">{location.state.product.category.name}</p>
                            <div>
                                {location.state.product.price.map((element, index: number) => (
                                    <li key={index} onClick={() => handleSizeClick(index)}>{element.name}</li>
                                ))}
                            </div>
                            <div>
                                <p>{currentPrice.price}</p>
                            </div>
                            <button className="product-card__add-btn">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}