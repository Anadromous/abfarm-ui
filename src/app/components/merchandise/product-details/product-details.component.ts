import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  
  product: Product = new Product();
 
  constructor(private productService: ProductService, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    
    this.productService.getProduct(productId).subscribe(
      (data: Product) => {this.product = data;}
    )
  }

}
