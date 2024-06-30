
const mock = [
    {
        id: '1',
        name: 'Product 1',
        tokens: {
            MeatlessToken: 5,
            LocalToken: 2,
        },
    },
    {
        id: '2',
        name: `This Isn't Bacon Plant-Based Rashers 120G`,
        description: `Plant-based bacon style rashers made from soy and pea protein.`,
        tokens: {
            MeatlessToken: 3,
        },
    },
    {
        id: '3',
        name: `R whites lemonade can 330ml`,
        tokens: {
            MeatlessToken: 3,
            LocalToken: 0, // quantity=0 should be skipped over and not awarded
        },
    },
    {
        id: '4',
        name: `it's a grape fruit ting can 330ml`,
        tokens: {
            LocalToken: 3,
        },
    }
]

export const getProductDetails = (productID) => {

    const product = mock.find((p) => p.id === productID);

    if (!product) {
        return null;
    }

    return product;
}