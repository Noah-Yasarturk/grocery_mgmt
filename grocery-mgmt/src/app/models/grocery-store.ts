export class GroceryStore {

    storeId: number;
    storeBrand: string;
    storeLocation: string;

    constructor(id: number, brand: string, location: string) {
        this.storeId = id;
        this.storeBrand  = brand,
        this.storeLocation = location;
    }


}
