## 📌 Project Overview

AgriVision is a full-stack AgriTech platform that connects farmers directly with buyers, restaurants, and bulk consumers. It removes middlemen and enables transparent, real-time agricultural trading with live inventory and order tracking.

---

# 👨‍🌾 1. Farmer Module

## 🔐 Authentication

* Farmer registration and login
* Secure JWT-based authentication

## 🌾 Product Management

* Add new agricultural products

  * Product name
  * Quantity available
  * Price per kg/unit
  * Category (vegetables, fruits, grains, etc.)
  * Location
  * Product image upload
* Update product details
* Delete products
* Mark stock as “Out of Stock”

## 📊 Farmer Dashboard

* View total products listed
* Track total orders received
* Monitor earnings summary
* View pending / completed orders

---

# 🛒 2. Buyer Module

## 🔍 Product Browsing

* View all available farm products
* Search products by name
* Filter by:

  * Price range
  * Category
  * Location
  * Availability

## 🛍️ Order System

* Place product orders
* Select quantity
* View total price before checkout
* Order confirmation system

## 📦 Order Tracking

* Track order status:

  * Pending
  * Processing
  * Delivered
* View order history

---

# 🧑‍💼 3. Admin Module

## 👥 User Management

* View all farmers and buyers
* Manage user accounts
* Activate / deactivate users

## 🌾 Product Control

* View all listed products
* Remove inappropriate listings
* Monitor stock activity

## 📦 Order Monitoring

* View all orders in system
* Track delivery status
* Ensure system transparency

---

# 📦 4. Order System (Core Logic)

## 🔄 Order Flow

```
Buyer selects product
        ↓
Places order
        ↓
Stock is reduced automatically
        ↓
Order assigned status (Pending → Processing → Delivered)
```

## ⚙️ Order Features

* Auto stock reduction after purchase
* Order status updates
* Order history for both buyer and farmer

---

# 📌 5. System Rules (Important Constraints)

* A product cannot be ordered if stock = 0
* Only logged-in users can place orders
* Farmers can only manage their own products
* Buyers can only see active listings
* Admin has full system access

---

# 🎯 6. Final Goal of the System

* Remove middlemen in agriculture supply chain
* Enable direct farmer-to-buyer transactions
* Ensure fair pricing for farmers
* Provide transparent and traceable food supply system

---

# 🏁 Status

✔ Scope Defined
✔ Modules Finalized
✔ Features Locked for Development
➡ Ready for System Design & Database Planning


