export type Currency = "BRL" | "USD" | "EUR";

export function formatCurrency(value: number, currency: Currency) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(value);
}
