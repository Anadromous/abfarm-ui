import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { Produce } from 'src/app/common/produce';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProduceService } from 'src/app/services/produce.service';

@Component({
  selector: 'app-lamb-form',
  templateUrl: './lamb-form.component.html',
  styleUrls: ['./lamb-form.component.scss']
})
export class LambFormComponent implements OnInit {
  produces: Produce[];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  initialQuantity:number = 0;

  constructor(private produceService: ProduceService,
    private cartService: CartService) { }

  ngOnInit() {
    this.listProduces();
    this.reviewCartDetails();
    
  }
  //end ngonit

  reviewCartDetails() {
    //subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    ),
      //subscribe to cartService.totalPrice
      this.cartService.totalPrice.subscribe(
        totalPrice => this.totalPrice = totalPrice
      );
  }

  listProduces() {
    this.produceService.getProduceList(51).subscribe(
      data => {
        this.produces = data;
      }
    )
 
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  addToCart(produce: Produce) {
    produce.unitsInStock--;
    produce.quantity = +produce.quantity || 0;
    produce.quantity++;
    produce.categoryId = "51";
    
    let product: Product = this.convertProduceToProduct(produce);
    console.log("Adding item to cart " + product.name);
    console.log("ItemCount: ==> " + produce.quantity);
    console.log("Product category id: "+product.categoryId)
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

  //Do this to re-use the product shopping cart
  convertProduceToProduct(produce: Produce) {
    let product = new Product();
    product.id = produce.id;
    product.sku = produce.sku;
    product.unit = produce.unit;
    product.name = produce.name;
    product.description = produce.description;
    product.unitPounds = produce.unitPounds;
    product.imageUrl = produce.imageUrl;
    product.unitPrice = produce.unitPrice;
    product.unitsInStock = produce.unitsInStock;
    product.dateCreated = produce.dateCreated;
    product.lastUpdate = produce.lastUpdate;
    product.categoryId = produce.categoryId;
    return product;
  }

  remove(produce: Produce) {
    produce.unitsInStock++;
    produce.quantity--;
    let product: Product = this.convertProduceToProduct(produce);
    const cartItem = new CartItem(product);
    this.cartService.decrementQuantity(cartItem);
  }
}

