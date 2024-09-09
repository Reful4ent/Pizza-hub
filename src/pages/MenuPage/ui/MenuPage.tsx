import {FC, useCallback, useEffect, useState} from "react";
import {getCategories, getProducts} from "@/shared/api/product/methods";
import {productConverter} from "@/entities/ProductCard";
import {ProductList} from "@/widgets/ProductList";
import {CategoriesList} from "@/features/CategoriesList";
import {categoryConverter} from "@/features/CategoriesList/CategoryConverter";
import {useSearchParams} from "react-router-dom"
import {SearchInput} from "@/features/SearchProduct";


export const MenuPage: FC = () => {

    const [list, setList] = useState(null);
    const [categoryId, setCategoryId] = useState(0);
    const [categories, setCategories] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryIdQuery = searchParams.get("categoryId") || '';
    const searchQuery = searchParams.get("searchQuery") || '';

    const handleCategoryClick= (id: number) => {
        setCategoryId(id);
        setSearchParams({categoryId: id})
    }


    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target;
        const query = form.search.value.toLowerCase();
        setSearchParams({categoryId: categoryId, searchQuery: query})
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
               <SearchInput onSubmit={handleInputSubmit} />
               <ProductList searchFilter={searchQuery} categoryId={Number(categoryIdQuery)} list={list}/>
               <CategoriesList categories={categories} onClick={handleCategoryClick}/>
           </div>
        </>
    )
}