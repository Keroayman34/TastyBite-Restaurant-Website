# Italian Market Pricing Report

**Project:** TastyBite Restaurant Website
**Market:** Italy (Rome / Milan mid-market)
**Canonical currency:** EUR
**Display currency:** EUR (default) and USD (derived)
**Research date:** 2026-11-25
**Last updated:** 2026-11-25

---

## 1. Purpose

This document records how the TastyBite menu was re-priced from the legacy
Egyptian Pound (EGP) catalogue to realistic Italian-market Euro prices, how USD
display prices are derived, and which published restaurant menus were used as
comparables.

The EUR price stored in `data/products.ts` (`basePrice`) is the single
canonical price. USD is never stored; it is calculated at render time from the
documented EUR/USD snapshot. This prevents duplicated, drifting price data.

---

## 2. Exchange rate

| Field          | Value                                                            |
| -------------- | ---------------------------------------------------------------- |
| Source         | European Central Bank (ECB) euro foreign exchange reference rate |
| Source URL     | https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml    |
| Snapshot date  | 2026-11-25                                                       |
| Rate           | **1 EUR = 1.0935 USD**                                           |
| Implementation | `lib/currency/config.ts`                                         |

The rate was read directly from the ECB daily reference-rate XML on
2026-11-25 (`Cube time='2026-11-25'`, `currency='USD' rate='1.0935'`).

Conversion and rounding live in `lib/currency/formatter.ts`:

```text
USD = round(EUR × 1.0935 × 100) / 100
```

Rounding to two decimals happens exactly once, after conversion, to avoid
floating-point drift and repeated-conversion errors. Cart, checkout, product,
extras, delivery and WhatsApp totals all use this single helper.

Formatting uses `Intl.NumberFormat` with a locale chosen from the
language/currency pair:

| Language | Currency | Locale  | Example |
| -------- | -------- | ------- | ------- |
| Italian  | EUR      | `it-IT` | €12,50  |
| English  | EUR      | `en-IE` | €12.50  |
| English  | USD      | `en-US` | $13.99  |
| Italian  | USD      | `it-IT` | 13,99 $ |

---

## 3. Methodology

1. The legacy catalogue in `v1.5.0` was read from Git history to recover the
   previous EGP prices. Those prices were **not** converted mathematically:
   currency conversion alone would produce unrealistic Italian menu prices.
2. For each existing category, 3–5 published Italian restaurant menus were
   reviewed (Rome and Milan, mid-market positioning).
3. Each product kept its existing **ID, image, category, options and tags**.
   Only name, description and canonical EUR price changed.
4. Prices were positioned as a believable mid-market Italian restaurant:
   competitive with neighbourhood pizzerias and burger joints, below
   premium/gourmet venues.
5. Where an exact comparable did not exist (e.g. mango/berry smoothies), the
   closest published analogue (fresh juices, frappè, milkshake) was used and is
   flagged as an estimate.
6. Extras, sizes, offers and delivery fees were reviewed on the same basis.

---

## 4. Product pricing table

All prices below are the current catalogue. "Previous EGP" refers to the
`basePrice` value stored before the Italian-market migration (commit `v1.5.0`).

| Product (IT)                | Product (EN)           | Category | Previous EGP | New EUR | USD display |
| --------------------------- | ---------------------- | -------: | -----------: | ------: | ----------: |
| Pizza Margherita            | Margherita Pizza       |    Pizza |          180 |   €7.00 |       $7.65 |
| Pizza Diavola               | Pepperoni Feast Pizza  |    Pizza |          200 |   €8.50 |       $9.29 |
| Pizza Prosciutto e Ananas   | Hawaiian Pizza         |    Pizza |          210 |   €9.00 |       $9.84 |
| Pizza Ortolana              | Garden Veggie Pizza    |    Pizza |          190 |   €8.50 |       $9.29 |
| Pizza Pollo BBQ             | BBQ Chicken Pizza      |    Pizza |          230 |  €10.50 |      $11.48 |
| Burger Classico             | Classic Burger         |  Burgers |          150 |   €9.50 |      $10.39 |
| Doppio Cheeseburger         | Double Cheeseburger    |  Burgers |          180 |  €11.50 |      $12.58 |
| Bacon Deluxe Burger         | Bacon Deluxe Burger    |  Burgers |          190 |  €12.00 |      $13.12 |
| Double Stack Burger         | Double Stack Burger    |  Burgers |          200 |  €12.90 |      $14.11 |
| Burger Funghi e Svizzero    | Mushroom Swiss Burger  |  Burgers |          185 |  €11.90 |      $13.01 |
| Pollo Croccante             | Crispy Chicken         |  Chicken |          140 |   €9.50 |      $10.39 |
| Pollo Fritto del Sud        | Southern Fried Chicken |  Chicken |          160 |  €10.50 |      $11.48 |
| Filetti di Pollo Croccanti  | Chicken Tenders        |  Chicken |          130 |   €8.90 |       $9.73 |
| Petto di Pollo alla Griglia | Grilled Chicken Breast |  Chicken |          155 |  €10.50 |      $11.48 |
| Alette di Pollo Piccanti    | Buffalo Wings          |  Chicken |          145 |   €8.50 |       $9.29 |
| Pasta Alfredo               | Pasta Alfredo          |    Pasta |          170 |  €11.50 |      $12.58 |
| Pasta alla Carbonara        | Pasta Carbonara        |    Pasta |          185 |  €12.50 |      $13.67 |
| Pasta alla Bolognese        | Pasta Bolognese        |    Pasta |          175 |  €12.00 |      $13.12 |
| Pasta al Pesto              | Pesto Pasta            |    Pasta |          165 |  €11.00 |      $12.03 |
| Pasta Primavera             | Pasta Primavera        |    Pasta |          155 |  €10.50 |      $11.48 |
| Insalata Caesar             | Caesar Salad           |   Salads |          120 |  €11.00 |      $12.03 |
| Insalata Mista Fresca       | Garden Fresh Salad     |   Salads |           90 |   €7.50 |       $8.20 |
| Insalata Greca              | Greek Salad            |   Salads |          110 |   €9.50 |      $10.39 |
| Bowl di Quinoa              | Quinoa Power Bowl      |   Salads |          125 |  €10.50 |      $11.48 |
| Insalata Cobb               | Cobb Salad             |   Salads |          140 |  €12.00 |      $13.12 |
| Limonata Fresca             | Fresh Lemonade         |   Drinks |           50 |   €3.50 |       $3.83 |
| Tè Freddo al Limone         | Iced Tea               |   Drinks |           40 |   €3.00 |       $3.28 |
| Smoothie al Mango           | Mango Smoothie         |   Drinks |           70 |   €4.90 |       $5.36 |
| Smoothie ai Frutti di Bosco | Berry Blast Smoothie   |   Drinks |           75 |   €5.20 |       $5.69 |
| Cioccolata Calda            | Hot Chocolate          |   Drinks |           60 |   €3.90 |       $4.26 |
| Tortino al Cioccolato Caldo | Chocolate Lava Cake    | Desserts |          110 |   €6.50 |       $7.11 |
| Cheesecake alle Fragole     | Strawberry Cheesecake  | Desserts |          100 |   €6.00 |       $6.56 |
| Tiramisù Classico           | Classic Tiramisu       | Desserts |          120 |   €6.00 |       $6.56 |
| Mousse al Cioccolato        | Chocolate Mousse       | Desserts |           95 |   €5.50 |       $6.01 |
| Coppa Gelato Sundae         | Ice Cream Sundae       | Desserts |           80 |   €5.00 |       $5.47 |

USD values are illustrative displays at the documented snapshot rate; they are
not stored in the catalogue.

---

## 5. Comparables by category

### 5.1 Pizza

| Comparable                                                                                                                | Product                                 |         Published price |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------------------: |
| Pizza Bella Roma, Rome — https://npos.it/pizzeria/pizza-bella-roma/menu                                                   | Margherita / Diavola / 4 Formaggi       |   €5.00 / €6.50 / €6.50 |
| MargheRita Osteria Pizzeria, Rome — https://npos.it/pizzeria/margherita-osteria-1/menu                                    | Margherita / Diavola / Vegetariana      |   €6.00 / €8.00 / €8.00 |
| Romeo a Testaccio, Rome — https://www.scattidigusto.it/romeo-a-testaccio-piatti-romani-e-pizza-scrocchiarel-menu-e-prezzi | Margherita / Diavola / Quattro formaggi | €9.00 / €10.00 / €10.00 |
| Da Lè Pizzeria Romana, Rome — https://da-lepizzeria-romana.it/                                                            | Rossa / Napoli / Tonno e cipolla        |   €5.00 / €8.00 / €9.00 |

TastyBite pizzas (€7.00–€10.50) sit between neighbourhood takeaway pricing and
sit-down Roman pizzerias, matching the mid-market positioning.

### 5.2 Burgers

| Comparable                                                                                      | Product                                        |                   Published price |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------: |
| Da Max, Milan — https://www.damaxhamburgerhouse.com/menu                                        | Classico / Cheese / Bacon / Doppio Cheese      |     €7.00 / €7.50 / €8.00 / €9.50 |
| Panino & Co., Milan — https://paninoandco.xmenu.it/categories/hamburger-patatine-fritte-incluse | Classic / Cheese / Bacon / Chicken             | €11.90 / €12.90 / €13.90 / €13.50 |
| Boom Milano — https://boom-milano.com/menu-sera/                                                | Cheeseburger / Bacon / Chicken crispy          |          €13.00 / €14.00 / €13.50 |
| Beato Te Milano — https://beatotemilano.it/menu-beatote-milano/hamburgers/                      | Cheeseburger / Bacon cheeseburger (with fries) |                   €18.00 / €19.00 |

TastyBite burgers (€9.50–€12.90) are aligned with mid-market Milan burger
menus and below gourmet burger pricing.

### 5.3 Chicken

| Comparable                                                                                    | Product                               |                Published price |
| --------------------------------------------------------------------------------------------- | ------------------------------------- | -----------------------------: |
| KFC Italia (official product page) — https://www.kfc.it/prodotti                              | Buckets / tenders / wings             | Restaurant-specific list price |
| KFC Milano listing — https://www.sluurpy.it/milano/ristorante/155574/kfc                      | 4 tenders / 5 hot wings / 8 hot wings |          €5.50 / €4.20 / €6.20 |
| Deliveroo KFC Torino — https://deliveroo.it/en/menu/torino/torino-centro/kfc-torino-accademia | 4 tenders / 5 hot wings               |                €10.75 / €10.75 |

TastyBite chicken portions (€8.50–€10.50) are priced as restaurant mains
rather than fast-food side portions, consistent with a full-service menu.

### 5.4 Pasta

| Comparable                                                                                                                         | Product                                       |                   Published price |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------: |
| Strada Romana, Rome — https://teodorico34.stradaromana.com/wp-content/uploads/2025/11/Menu-STRADAROMANA-Via-Teodorico-2025_web.pdf | Cacio e pepe / Carbonara / Amatriciana        |          €12.00 / €13.00 / €13.00 |
| Romeo a Testaccio, Rome — https://www.scattidigusto.it/romeo-a-testaccio-piatti-romani-e-pizza-scrocchiarel-menu-e-prezzi          | Cacio e pepe / Carbonara / Amatriciana        |          €13.00 / €15.00 / €14.00 |
| Pasta Roma, Rome — https://www.pastaromaitalia.com/menu/                                                                           | Carbonara / Amatriciana / Pesto / Vegetariana | €13.00 / €13.00 / €13.00 / €13.00 |
| Grotta Amatriciana, Rome — https://www.thefork.it/ristorante/grotta-amatriciana-r542187/menu                                       | Carbonara / Amatriciana / Cacio e pepe        |          €16.00 / €14.00 / €14.00 |

TastyBite pasta (€10.50–€12.50) is positioned just below central-Rome
restaurant pricing, appropriate for a delivery-first menu.

### 5.5 Salads

| Comparable                                                                            | Product                     |          Published price |
| ------------------------------------------------------------------------------------- | --------------------------- | -----------------------: |
| Fresco & Cimmino, Milan — https://frescocimmino.it/menu/                              | Quinoa / Greek / Caesar     | €14.00 / €16.00 / €16.00 |
| Pizzium, Milan — https://restaurantguru.it/Pizzium-Via-Rembrandt-Milan/menu           | Caesar / Marinara / Rustica | €11.00 / €12.00 / €11.00 |
| Il Marchese, Milan — https://ilmarchese.it/wp-content/uploads/2025/11/Menu-MILANO.pdf | Caesar salad                |                   €16.00 |

TastyBite salads (€7.50–€12.00) span a simple side salad to a protein-rich
Cobb, in line with mid-market menus.

### 5.6 Drinks

| Comparable                                                                                            | Product                                    |       Published price |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------: |
| Pizzeria Il Timone — https://pizzeriailtimone.it/wp-content/uploads/2025/03/Drinklist-Timone-2025.pdf | Soft drinks / lemonade                     |                 €4.50 |
| Pizza Ad Hoc — https://pizzaadhoc.it/wp-content/uploads/2025/06/PizzaAdHocMenu2025.pdf                | Bottled soft drinks / iced tea             |                 €3.50 |
| KM21 — https://www.km21.it/bibite                                                                     | Coca-Cola / Limonata Lurisia / fruit juice | €3.50 / €4.00 / €3.50 |
| Le Palme — https://www.lepalmelimone.com/wp-content/uploads/sites/3/2025/06/LE-PALME-new-2025.pdf     | Lemonade / fresh juice / milkshake         | €4.00 / €7.50 / €7.00 |

TastyBite drinks (€3.00–€5.20) match standard Italian soft-drink pricing;
smoothies are priced below fresh-juice/frappè premiums as an estimate, since
exact smoothie comparables are less common on traditional Italian menus.

### 5.7 Desserts

| Comparable                                                                          | Product                                       |       Published price |
| ----------------------------------------------------------------------------------- | --------------------------------------------- | --------------------: |
| Fresco & Cimmino, Milan — https://frescocimmino.it/menu/                            | Tiramisù / Cheesecake / Gelato                | €8.00 / €8.00 / €7.00 |
| PIZ Milano — https://www.pizmilano.it/menu-ita/dolci/                               | Tiramisù / Cheesecake                         |         €8.00 / €8.00 |
| Pizzium, Milan — https://restaurantguru.it/Pizzium-Via-Rembrandt-Milan/menu         | Tiramisù / Cheesecake                         |         €6.00 / €6.00 |
| Little Italy, Milan — https://littleitalytadino.cristianoandpartners.it/menu/dolci/ | Tiramisù / Cheesecake / Mousse                | €6.00 / €6.00 / €6.00 |
| Birreria Leone — https://www.leonecarnecucina.it/dolci/                             | Tortino al cioccolato / Tiramisù / Cheesecake | €8.00 / €7.00 / €7.00 |

TastyBite desserts (€5.00–€6.50) sit at the affordable end of this range,
which keeps dessert attach-rates healthy on a delivery menu.

---

## 6. Sizes, crusts and extras

Prices are canonical EUR and feed directly into
`lib/menu/pricing.ts`; the selected options are included in the unit price and
subtotal before the cart and WhatsApp message are built.

| Option         | Choice                                     | Previous EGP delta |                 New EUR delta |
| -------------- | ------------------------------------------ | -----------------: | ----------------------------: |
| Pizza size     | Small / Medium / Large                     |        0 / 20 / 40 |         €0.00 / €2.00 / €4.00 |
| Pizza crust    | Classic / Cheese-filled / Thin             |         0 / 30 / 0 |         €0.00 / €2.50 / €0.00 |
| Burger portion | Small / Medium / Large                     |        0 / 10 / 20 |         €0.00 / €1.50 / €3.00 |
| Extras         | Extra cheese / Olives / Chicken / Jalapeño |  20 / 15 / 30 / 10 | €1.50 / €1.00 / €2.50 / €1.00 |

These deltas are consistent with Italian menu supplements (typically €1–€3 per
extra or size upgrade) and with the base prices above.

---

## 7. Offers

| Offer                | Previous EGP (original → discounted) | New EUR (original → discounted) |
| -------------------- | ------------------------------------ | ------------------------------- |
| Family Burger Bundle | 59.99 → 44.99                        | €49.00 → €38.00                 |
| Pizza Night Deal     | 38.99 → 29.99                        | €32.50 → €26.00                 |
| Lunch Combo          | 18.99 → 13.99                        | €16.00 → €12.50                 |

Bundle discounts remain roughly 20–23%, consistent with the original offer
structure while using realistic Italian menu totals.

---

## 8. Delivery fees

| Field                   | Value                                                | Reasoning                                                                                                                                       |
| ----------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Fixed delivery fee      | **€2.50**                                            | Falls inside the €1.99–€3.90 range observed on Just Eat Rome listings, and is below the common €2.99–€3.50 urban fee.                           |
| Free-delivery threshold | **€25.00**                                           | Matches the "free delivery over €25" benefit already shown in the hero, and is close to the €24–€25 minimum-order levels seen on Just Eat Rome. |
| Behaviour               | Fee is waived when the cart subtotal is **≥ €25.00** | Implemented in `calculateDeliveryFee` and used by cart, checkout and WhatsApp order totals.                                                     |

The threshold is applied to the pre-discount item subtotal (the cart has no
coupon engine in Phase 1). Currency selection converts the displayed €2.50 fee
to USD through the same shared formatter; it does not re-price the fee.

Reference: Just Eat Rome delivery listings —
https://www.justeat.it/area/00127-roma/free-delivery (observed €0.70–€3.90
delivery fees and €15–€25 minimum orders, 2026-11-25).

---

## 9. Assumptions and limitations

- Prices are positioned for a **mid-market, delivery-first** Italian
  restaurant in a large city (Rome/Milan), not for a tourist-premium venue.
- Comparables were taken from publicly published menus on the dates linked
  above; restaurant prices change frequently, so this is a documented snapshot,
  not a permanent guarantee.
- Smoothies and some chicken mains have no exact Italian menu equivalent; their
  prices are reasoned estimates from the closest analogues and are flagged
  here rather than presented as direct matches.
- USD values are display-only and always derived from the single EUR price.
  Re-running the conversion after updating `EXCHANGE_RATE_EUR_TO_USD` updates
  every USD value consistently.
- No product IDs, images, categories, options or tags were changed by the
  pricing migration.
