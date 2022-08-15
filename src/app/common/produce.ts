export class Produce {
    id!: string;
    sku!: string;
    unit!: string;
    name!: string;
    description!: string;
    unitPounds!: number;
    imageUrl!: string;
    unitPrice!: number;;
    unitsInStock!: number;
    dateCreated!: Date;
    lastUpdate!: Date; 
    categoryId!: string;
    quantity:number = +0;
}
