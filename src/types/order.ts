type Coupon = {
    coupon: string;
}

type Order = {
    camerasIds: number[];
    coupon: string | null;
};

export type { Order, Coupon };
