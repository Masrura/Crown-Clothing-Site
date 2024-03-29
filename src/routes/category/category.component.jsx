import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CategoriesContext } from '../../contexts/categories.context';
import { useParams } from 'react-router-dom'
import './category.styles.scss'
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from './../../store/categories/category.selector'

const Category = () => {
    const { category } = useParams();
    console.log('rendering/re-rendirering category component')
    const  categoriesMap  = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);
  
    useEffect(() => {
        console.log('effect fired calling setProduct')
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products && products.map((product) => <ProductCard key={product.id} product={product} />)
                }       </div>
        </>
    )
}
export default Category;