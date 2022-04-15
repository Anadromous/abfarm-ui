import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Produce } from 'src/app/common/produce';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CheckoutformService } from 'src/app/services/checkoutform.service';
import { ProduceService } from 'src/app/services/produce.service';

@Component({
  selector: 'app-lamb-form',
  templateUrl: './lamb-form.component.html',
  styleUrls: ['./lamb-form.component.scss']
})
export class LambFormComponent implements OnInit {
  produces: Produce[];
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  cartProduceItems: CartItem[] = [];

  constructor(private produceService: ProduceService,
    private formBuilder: FormBuilder,
    private checkoutFormService: CheckoutformService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit() {
    this.listProduces();
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.min(0)])
      }),
    });
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
    this.produceService.getProduceList(1).subscribe(
      data => {
        this.produces = data;
      }
    )
  }

  incrementQuantity(cartItem: CartItem){
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem){
    this.cartService.decrementQuantity(cartItem);
  }

  addToCart(produce: Produce){
    produce.unitsInStock--;
    let product: Product = this.convertProduceToProduct(produce);
    console.log("Adding item to cart "+product.name);
    const cartItem = new CartItem(product);
    this.cartProduceItems.push(cartItem);
    this.cartService.addToCart(cartItem);
  }

  convertProduceToProduct(produce: Produce){
    let product =  new Product();
        product.id = produce.id;
        product.sku = produce.sku;
        product.unit = produce.unit;
        product.name = produce.name;
        product.description = produce.description;
        product.unitPrice = produce.unitPrice;
        product.imageUrl = produce.imageUrl;
        product.active = produce.active;
        product.unitsInStock = produce.unitsInStock;
        product.dateCreated = produce.dateCreated;
        product.lastUpdate = produce.lastUpdate;
        product.category = produce.category;
        return product;
  }

  remove(produce: Produce){
    let product: Product = this.convertProduceToProduct(produce);
    const cartItem = new CartItem(product);
    this.cartService.remove
  }

}