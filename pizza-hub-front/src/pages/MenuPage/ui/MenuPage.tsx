import {FC, useCallback, useEffect, useState} from "react";
import {getCategories, getFilteredProducts/*getProducts*/} from "@/shared/api/product/methods";
import {filteredProductConverter} from "@/entities/Product/ProductConverter";
import {ProductList} from "@/widgets/ProductList";
import {CategoriesList} from "@/widgets/CategoriesList";
import {categoryConverter} from "@/widgets/CategoriesList/CategoryConverter";
import {useSearchParams} from "react-router-dom"
import {SearchInput} from "@/features/SearchProduct";
import {ProductCardProps} from "@/entities/Product/ProductCard/types";
import {CategoryItem} from "@/widgets/CategoriesList/types";
import {Spinner} from "@/shared/ui/Spinner/ui/Spinner";

//ToDo: Сделать чтобы в инпуте сохранялось вводимое значение или кнопку отмены поиска.


//ToDo: Прикрутить mobX

export const MenuPage: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryIdQuery = searchParams.get('_category_Id') || '';
    const searchQuery = searchParams.get("_search") || '';
    const pageQuery = searchParams.get('_page') || '';

    const [productList, setProductList] = useState<ProductCardProps[]>([]);
    //const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [categoryId, setCategoryId] = useState(Number(categoryIdQuery) || 0);

    const [pageNumber, setPageNumber] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [isHasMore, setIsHasMore] = useState(true);

    //При начальной загрузки страницы выгружаются категории
    //const fetchCategories = useCallback(async () => {
    //    const responseCategories = await getCategories();
    //    setCategories(responseCategories.map((element: any) => categoryConverter(element)));
    //}, [])


    //Выгрузка списка продуктов по критериям
    const filterProductList = useCallback(async (categoryId: number, searchQuery: string, page: number) => {

        const filteredProducts = await getFilteredProducts(categoryId, searchQuery, String(page));
        const convertedFilteredProducts = filteredProducts.products.map((product: any) => filteredProductConverter(product));
        setProductList(prevProductList => [...(prevProductList || []), ...convertedFilteredProducts]);
        setIsFetching(false);
        if (filteredProducts.totalPages === pageNumber + 1) {
            setIsHasMore(false);
        }

    }, [pageNumber])


    //Сортирует список по категории
    //const handleCategoryClick = useCallback(async (id: number) => {
    // setCategoryId(id);
    // setPageNumber(0);
    // setProductList([]);
    // setIsHasMore(true);
    // setSearchParams({_category_Id: String(id), _search: searchQuery, _page: String(0)})
    // }, [setSearchParams, searchQuery])


    //Сортирует список по строковому запросу
    const handleInputSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target;
        const query = form.elements.search.value.toLowerCase();

        setIsHasMore(true);
        setPageNumber(0);
        setProductList([]);

        setSearchParams({_category_Id: String(categoryId), _search: query, _page: String(0)})

    }, [categoryId, setSearchParams])


    //Вызов запроса продуктов при прокрутке вниз страницы
    const handleScroll = useCallback(async () => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 5) {
            return;
        }
        if (isHasMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
            setIsFetching(true);
            setSearchParams({_category_Id: categoryIdQuery, _search: searchQuery, _page: String(pageNumber + 1)})
        }
    }, [isHasMore, setSearchParams, categoryIdQuery, searchQuery, pageNumber])


    //useEffect(() => {
    //    fetchCategories();
    //}, [fetchCategories]);


    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        filterProductList(categoryId,searchQuery,pageNumber);
    }, [filterProductList,categoryId,searchQuery,pageNumber]);

    return (
        <>
            <div className="grid grid-cols-4">
                <SearchInput onSubmit={handleInputSubmit}/>
                <ProductList productList={productList}/>
                {
                    isFetching
                    &&
                    <div className="col-start-3 flex justify-center items-center">
                        <Spinner className={"w-20 h-20"}/>
                    </div>
                }
            </div>
        </>
    )
}