import SHOP_DATA from '../../shop-data.js'
import { useContext, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { selectCategoriesMap } from './../../store/categories/category.selector.js'
import './categories-preview.styles.scss'
const CategoriesPreview = () => {

    //const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title]
                    return <CategoryPreview key={title} products={products} title={title} />
                })
            }


        </Fragment>
    );
}

export default CategoriesPreview;