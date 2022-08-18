# Blockchain with TypeScript

## 🔗 Created to inspire developers with decentralization, by code

Blockchain with TypeScript shows in easy way how this ecosystem works, it is presented simple and step by step, to inspire others.

## 📢 Announcement

Project is constantly developed to add more and more features, it was started with api approuch, but soon will be developed to fullstack app with visualizations. Moreover, new functionalities will be
implemented to provide the best quality knowledge, for example:

-   proof of stake,
-   smart contracts,
-   NFT,
-   Interactive wallets,
-   DeFi
-   and many more...

Keep waiting

## 💻 Running locally

Cloning repo:

```sh
git clone https://github.com/Kacper-Hernacki/blockchain-typescript-api.git
```

Running...

```sh
cd blockchain-typescript-api
npm i
npm start
```

## Testing api

Try below endpoints in tool like postman or thunder client, to know how it works.

Code includes endpoints such as:

-   with GET method:

`/api/check` - checking if api works correctly `/api/blocks` - returns mined blocks `/api/transactions` - returns tranasctions included in network

-   with POST method:

`/api/transact` - creates transaction requires data:

```json
{
    "to": "66072e7213ded512807f83c7b50ad30e589357854b2f40799242bf0a2320fa2a",
    "amount": 2,
    "type": "type"
}
```

`/api/mine` - mines block requires data:

```json
{
    "nonce": 0,
    "validator": "",
    "signature": ""
}
```
