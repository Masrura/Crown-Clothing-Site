import {useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';
import {getCategoriesAndDocuments} from './../../utils/firebase/firebase.utils'
import { useDispatch } from 'react-redux';
import { setCategories } from './../../store/categories/category.action'
const Shop = () => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     const getCategoriesMap = async () => {
    //         const categoryMap = await getCategoriesAndDocuments('categories');
    //        dispatch(setCategoriesMap(categoryMap));
    //         //console.log('nice', categoryMap);
    //     }
    //     getCategoriesMap();
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments('categories');
            console.log('now printing:', categoriesArray);
            dispatch(setCategories(categoriesArray));
            //console.log('nice', categoryMap);
        }
        getCategoriesMap();
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path= ':category' element={<Category />}/>
       </Routes>
    );
}

export default Shop;