import {OrderDirection} from "tinkoff-sdk-grpc-js/dist/generated/orders";
import {MoneyValue} from "tinkoff-sdk-grpc-js/dist/generated/common";

export interface TradeSystem
{
    buy(instrumentId: string, lots: number): Position|null;
    sell(instrumentId: string, lots: number): Position|null;

    pendingBuy(instrumentId: string, lots: number, maxPrice: number): PendingPosition|null;
    pendingSell(instrumentId: string, lots: number, minPrice: number): PendingPosition|null;

    closePositions(instrumentId: string, positionId?: string): boolean;
    cancelPendingPosition(instrumentId: string, positionId: string): boolean;

    getPositions(instrumentId?: string): Position[];
    getPendingPositions(instrumentId?: string): PendingPosition[];

    getOpenedPositions(instrumentId?: string): Position[];
    getLastOpenedPosition(instrumentId?: string): Position|null;

    getAvailableBalance(): number;
}

export type Position = {
    id: string
    instrumentId: string
    lots: number
    price: MoneyValue
    time: Date
    direction: OrderDirection
    closed: boolean
}

export type PendingPosition = {
    id: string
    instrumentId: string
    lots: number
    needPrice: MoneyValue
    createdTime: Date
    direction: OrderDirection
}