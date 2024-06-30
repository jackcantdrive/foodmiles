# FoodMiles

FoodMiles provides small direct financial incentives to users when they choose restaurant meals made with ingredients sourced more locally. FoodMiles achieves this by providing an easy to use augumented reality overlay on existing restaurant menus via your phone, which shows the estimated total distance travelled by the ingredients for each item.

## Demo

https://github.com/jackcantdrive/foodmiles/assets/114533520/27248955-d4ef-420c-aa55-beab802abfd8

## Run

## Frontend

```bash
npm i
npm run dev
```

Or to expose on local network:
```bash
npm run dev-host
```

## Backend

```bash
npx hardhat compile
npx hardhat run src/server.js --network vechain_testnet
```