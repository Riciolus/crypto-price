## Architecture Overview

This project uses a **full-stack Next.js architecture** with a cache layer to safely and efficiently serve crypto price data.

```text
+---------------------+
|       Browser       |
|     (Next.js)       |
+----------+----------+
           |
           | HTTP (fetch)
           v
+----------+----------+
|   Next.js API Route |
|    /api/prices     |
+----------+----------+
           |
           | Cache-aside
           v
+----------+----------+      +----------------------+
|          Redis      |<---->|   CryptoCompare API  |
|   (in-memory cache) |      |   (external data)    |
+---------------------+      +----------------------+
```

### High-Level Flow

```
Client (Browser)
  → Next.js API Route
    → Redis Cache
      → External Crypto API (CryptoCompare)
```

### Key Principles

- The **frontend never calls external APIs directly**
- All external data access happens on the **server**
- **Redis** is used to cache price data and reduce API calls
- Data is **normalized** before being cached or returned

---

### Backend (API Layer)

- Implemented using **Next.js App Router API Routes**
- Handles:

  - Input validation (symbol, timeframe)
  - Cache lookup (Redis)
  - Fetching data from CryptoCompare on cache miss
  - Normalizing OHLC candle data

- Uses the **cache-aside pattern**:

  - Check cache → fetch if missing → store → return

This keeps the API secure, fast, and scalable.

---

### Cache Layer (Redis)

- Redis sits between the API route and the external provider
- Cached using deterministic keys, for example:

  ```
  prices:ETH:USD:1h
  ```

- Each timeframe has a different TTL to balance:

  - Data freshness
  - API rate limits
  - Performance

Redis is treated as **temporary storage**, not a database.

---

### Frontend

- Built with **Next.js (React)**
- Fetches data only from internal API routes
- Renders charts using **TradingView Lightweight Charts**
- Completely decoupled from the external API response format

Because the frontend depends only on normalized data, the data provider can be changed later without breaking the UI.

---

### Why This Architecture

- **Secure**: API keys stay server-side
- **Performant**: Redis reduces latency and repeated fetches
- **Maintainable**: Clear separation of concerns
- **Scalable**: Easy to add new symbols or timeframes
- **Production-aligned**: Matches real dashboard and exchange designs

---
