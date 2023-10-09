#### Setup

```bash
npm install
bash scripts/start.sh
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
  3.1 Set the MongoDB connection string with MONGO_URI,
  3.2 Set the JWT_SECRET as a 256-bit string (encryption key) from https://acte.ltd/utils/randomkeygen,
  3.3 Set the JWT_LIFETIME as 30d, or some other appropriate value
