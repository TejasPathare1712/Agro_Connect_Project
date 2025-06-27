// AgroConnect - Spring Boot Backend Code (Cart & Order Services + Controllers)

// --------------------------------------------
// PACKAGE: com.agroconnect.entity
// --------------------------------------------

// (User.java and Product.java already defined above)

// CartItem.java
package com.agro.entity;

import jakarta.persistence.*;

@Entity
public class CartItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;


    @ManyToOne
    private Product product;

    private int quantity;

    @ManyToOne
    private User customer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }
}

// Order.java
