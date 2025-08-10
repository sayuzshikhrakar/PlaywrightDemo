import users from '../test-data/users.json';
import products from '../test-data/product.json';   
import customerinformation from '../test-data/customerInformation.json';

type User = {
  username: string;
  password: string;
  description?: string;
  expectedError?: string;
};

type Product = {
  name: string;
  price: string;
  description: string;
};



export class TestDataHelper {
  static getBlankUserName() {
      return users.blankUserName;
  }
  static getValidUsers(): User[] {
    return users.validUsers;
  }

  static getInvalidUsers(): User[] {
    return users.invalidUsers;
  }

  static getRandomValidUser(): User {
    const validUsers = this.getValidUsers();
    return validUsers[Math.floor(Math.random() * validUsers.length)];
  }

  static getSpecificUser(username: string): User | undefined {
    const allUsers = [...this.getValidUsers(), ...this.getInvalidUsers()];
    return allUsers.find(user => user.username === username);
  }

  static getProductDetail(): Product[] {
    return products.ProductDetail;
  }

   static getProductDetails(): Product[] {
    return products.ProductDetails;
  }

  static getRandomProductDetail(): Product {
    const products=this.getProductDetails();
    return products[Math.floor(Math.random() * products.length)];
}

  static getCustomerInformation(): { firstname: string; lastname: string; postalcode: string }[] {
    return customerinformation.customerInformation;
  }
}