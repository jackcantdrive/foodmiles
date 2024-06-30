
const mock = [
    {
        id: '1',
        name: 'Ungrafted Dinner Menu',
        menu: {
            "Small Bites": {
              "Celery Salt Fries, Sport Pepper Aioli": 100,
              "Deviled Eggs, Whitefish Roe, Chives": 500,
              "Hush Puppies, White Cheddar Pimento": 300,
              "Za'atar Pull-Apart Bread, Labne": 5000
            },
            "Medium Bites": {
              "Trumpet Mushrooms, Strawberry Gochujang, Hoja Santa, Sesame Seeds": 2000,
              "Roasted Cabbage, Green Goddess, Smoked Trout Roe, Panko": 800,
              "Green Papaya, Kalamata Olive, Feta, Pepperoncini": 6000,
              "PEI Mussels, Beer Broth, Charred Fennel, Cilantro, Grilled Sourdough": 3000,
              "Duroc Pork Ribs, Citrus Glaze, Pepitas, Kumquats": 1000
            },
            "Caviar": {
              "1 oz Caviar Co. White Sturgeon Caviar": 500,
              "1 oz Caviar Co. Kaluga Caviar": 7000,
              "1 oz Caviar Co. Golden Osetra Caviar": 7000
            },
            "Large Bites": {
              "Okinawan Sweet Potato, Black Truffle, Dill Cream, Japanese Barbeque Sauce, Nori": 8000,
              "Olivier's Pork Loin, Peanut Sauce, Shishitos, Pearl Onion": 1500,
              "Mt. Lassen Trout, Roasted Poblano, Coconut, Pickled Squash": 300,
              "Olivier's Hanger Steak, Rice Cake, Florentino Cauliflower, Fish Sauce": 2000,
              "Fried Chicken Dinner: Fried Chicken, Paddlefish Roe, Grits, Truffle Country Gravy": 1500
            }
          }
    },
    {
        id: '2',
        name: 'Coffee cake with cinnamon streusel',
        menu: {
            "Coffee cake with cinnamon streusel": 1700
        },
    },
]

export const getMenuDetails = (menuID) => {

    const menu = mock.find((p) => p.id === menuID);

    if (!menu) {
        return null;
    }

    return menu;
}