![Banner 1](assets/banner1.jpg)
![Banner 2](assets/banner2.jpg)
## Introducciรณn
### Ejecutar en local
**Antes de nada:**
Configurar el token del bot que por motivos de seguridad no se incluye

Puerto default: 80, cambiar si es necesario

Algunas request se guardan por varios minutos para que sea mas rรกpida la respuesta del bot, y que no se sobrepasen posibles limites

**Primera vez:** `npm run start`
**Borrar cache de las request:** `npm run dev`



**Comandos: (estructura)**
`$<comando> <arg1> <arg2> <arg3>`

**Menรบ de ayuda:**
`$help <comando> | $ayuda <comando>`

**Precios**
`$p <moneda>` ej.

`$p btc`
```
Belo: BTC
Precio de compra: $8,967,101.173
Precio de venta: $8,697,207.714
Spread: 3.01%
Rendimiento: 5.25%

Binance: $41,868.39
Dolar: $214.2 / $207.7
```

**Conversor**

`$c <monto> <moneda> <moneda a convertir>`
ej.
`$c 6000 sats ars`
```
El resultado es: 527.24799354ARS
```

**Resumen diario**
`$i`
Respuesta:
```
Bitcoin: $42462 (+1.29%)  ๐

Ethereum: $2927.64 (+2.68%)  ๐

Tether: $1.001 (+0.12%)  ๐

Binance Coin: $400.99 (+1.24%)  ๐

USD Coin: $1.002 (+0.35%)  ๐

XRP: $0.796809 (-0.31)  ๐

Cardano: $1.043 (+0.31%)  ๐

Solana: $95.46 (+4.25%)  ๐

Terra: $53.77 (+5.35%)  ๐

Polkadot: $18.69 (+0.26%)  ๐
```