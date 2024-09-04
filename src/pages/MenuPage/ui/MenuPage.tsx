import {FC, useCallback, useEffect, useState} from "react";
import {getCategories, getProducts} from "@/shared/api/product/methods";
import {productConverter} from "@/widgets/ProductList/ProductConverter";
import {ProductList} from "@/widgets/ProductList/ui/ProductList";
import {CategoriesList} from "@/features/CategoriesList";
import {categoryConverter} from "@/features/CategoriesList/CategoryConverter";


export const MenuPage: FC = () => {

    const [list, setList] = useState(null);
    const [categoryId, setCategoryId] = useState(0);
    const [categories, setCategories] = useState(null)

    const handleCategoryClick= (id: number) => {
        setCategoryId(id);
    }



    const fetchData = useCallback(async () => {
        const responseProducts = await getProducts();
        const responseCategories = await getCategories();
        setList(responseProducts.map((element) => productConverter(element)));
        setCategories(responseCategories.map((element) => categoryConverter(element)));
    },[])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    ///configItems.icon.data.attributes.url
    return (
        <>
           <div className="grid grid-cols-5">
               <ProductList categoryId={categoryId} list={list}/>
               <CategoriesList categories={categories} onClick={handleCategoryClick}/>
           </div>
        </>
    )
}