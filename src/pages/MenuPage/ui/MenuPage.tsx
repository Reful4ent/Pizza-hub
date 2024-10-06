import {FC, useCallback, useEffect, useState} from "react";
import {getCategories, getFilteredProducts/*getProducts*/} from "@/shared/api/product/methods";
import {filteredProductConverter, productConverter} from "@/entities/Product/ProductConverter";
import {ProductList} from "@/widgets/ProductList";
import {CategoriesList} from "@/widgets/CategoriesList";
import {categoryConverter} from "@/widgets/CategoriesList/CategoryConverter";
import {useSearchParams} from "react-router-dom"
import {SearchInput} from "@/features/SearchProduct";
import {ProductCardProps} from "@/entities/Product/ProductCard/types";
import {CategoryItem} from "@/widgets/CategoriesList/types";
import {Spinner} from "@/shared/ui/Spinner/ui/Spinner";

//ToDo: Сделать чтобы в инпуте сохранялось вводимое значение или кнопку отмены поиска. разобраться с url ( searchParams)

//ToDo: Поправить код ( сделать лучше)

//ToDo: Прикрутить mobX

//ToDO: если же оставлять через контроллер - то убрать getProduct, и все что имеет Filtered переименовать без него
export const MenuPage: FC = () => {

    const [productList, setProductList] = useState<ProductCardProps[]>([]);
    const [categoryId, setCategoryId] = useState(0);
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    const [pageNumber, setPageNumber] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [isHasMore, setIsHasMore] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryIdQuery = searchParams.get('_category_Id') || '';
    const searchQuery = searchParams.get("_search") || '';
    const pageQuery = searchParams.get('_page') || '';

    //При начальной загрузки страницы выгружаются ингридиенты и первая страница продуктов
    const fetchData = useCallback(async () => {
        setCategoryId(Number(categoryIdQuery));
        setPageNumber(Number(0));

        const responseProducts = await getFilteredProducts(Number(categoryIdQuery), searchQuery, "0");
        const convertedFilteredProducts = responseProducts.products.map((product: any) => filteredProductConverter(product));
        const responseCategories = await getCategories();

        setProductList(prevProductList => [...(prevProductList || []), ...convertedFilteredProducts]);
        setCategories(responseCategories.map((element: any) => categoryConverter(element)));
    }, [])


    //Выгрузка списка продуктов по критериям
    const filterProductList = useCallback(async (categoryId: number, searchQuery: string, page: string) => {

        const filteredProducts = await getFilteredProducts(categoryId, searchQuery, page);
        const convertedFilteredProducts = filteredProducts.products.map((product: any) => filteredProductConverter(product));
        setProductList(prevProductList => [...(prevProductList || []), ...convertedFilteredProducts]);

    }, [])


    //Сортирует список по категории
    const handleCategoryClick = useCallback(async (id: number) => {

        setCategoryId(id);
        setPageNumber(0);
        setProductList([]);
        setIsHasMore(true);

        setSearchParams({_category_Id: String(id), _search: searchQuery, _page: String(0)})

        await filterProductList(id, searchQuery,'0');

    }, [setSearchParams, searchQuery, filterProductList])


    //Сортирует список по строковому запросу
    const handleInputSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target;
        const query = form.elements.search.value.toLowerCase();

        setIsHasMore(true);
        setPageNumber(0);
        setProductList([]);
        setSearchParams({_category_Id: String(categoryId), _search: query, _page: String(0)})

        await filterProductList(Number(categoryId), query,'0');

    }, [categoryId, setSearchParams, filterProductList])


    //Запрашивает продукты по страницам
    const fetchProducts = useCallback(async () => {
        const filteredProducts = await getFilteredProducts(categoryId, searchQuery, String(Number(pageQuery) + 1));
        const convertedFilteredProducts = filteredProducts.products.map((product: any) => filteredProductConverter(product));
        setProductList(prevProductList => [...(prevProductList || []), ...convertedFilteredProducts])
        setIsFetching(false);
        if (filteredProducts.totalPages === pageNumber + 2) {
            setIsHasMore(false);
        }
    }, [categoryId, pageQuery, searchQuery, pageNumber])

    //Вызов запроса продуктов при прокрутке вниз страницы
    const handleScroll = useCallback(async () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        if (isHasMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
            setSearchParams({_category_Id: categoryIdQuery, _search: searchQuery, _page: String(pageNumber + 1)})
            setIsFetching(true);
            await fetchProducts();
        }
    }, [fetchProducts, isHasMore, setSearchParams, categoryIdQuery, searchQuery, pageNumber])


    useEffect(() => {
        fetchData();
    }, [fetchData]);


    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <>
            <div className="grid grid-cols-5">
                <SearchInput onSubmit={handleInputSubmit}/>
                <ProductList productList={productList}/>
                <CategoriesList categories={categories} onClick={handleCategoryClick}/>
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