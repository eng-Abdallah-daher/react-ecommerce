export default function mobileMenuItems(mobileContent, changeMobileContent)  {
        switch (mobileContent) {
            case 'products':
                return [
                    <li key="back"><a href="#" onClick={() => changeMobileContent('menu')} tabIndex="0">&lt; Products</a></li>,
                    <hr key="hr1" />,
                    ['2.1', '2.2', '2.3'].map(k => (

                        <li key={k}>
                            <a href="#" onClick={() => changeMobileContent(k)} tabIndex="0">
                                {k} PAGE LINK HEADER
                            </a>
                        </li>
                    ))
                ];
            case 'categories':
                return [
                    <li key="backCate"><a href="#" onClick={() => changeMobileContent('menu')} tabIndex="0">&lt; Categories</a></li>,
                    <hr key="hrc" />,
                    ['3.1', '3.2', '3.3'].map(k => (
                        <li key={k}>
                            <a href="#" tabIndex="0">{k} CATEGORY LINK HEADER</a>
                        </li>
                    ))
                ];
            default:
                return [
                    <li key="h"><a href="/"  tabIndex="0">Home</a></li>,
                    <li key="p"><a href="#" onClick={() => changeMobileContent('products')} tabIndex="0">Products &gt;</a></li>,
                    <li key="g"><a href="/goods" tabIndex="0">Goods</a></li>,
                    <li key="a"><a href="#" tabIndex="0">About</a></li>,
                    <li key="c"><a href="#" onClick={() => changeMobileContent('categories')} tabIndex="0">Categories ⌄</a></li>
                ];
        }
    };
