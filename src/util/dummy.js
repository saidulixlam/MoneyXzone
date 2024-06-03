const customers = [
    {
      id: 1,
      name: "Ram",
      email: "ram@example.com",
      pincode: "400001",
      location_name: "Mumbai, Maharashtra, India",
      type: "C",
      gst: "GST123",
      // Add more customer data as needed
    },
    {
      id: 2,
      name: "Shyam",
      email: "shyam@example.com",
      pincode: "400002",
      location_name: "Delhi, India",
      type: "B",
      gst: "GST456",
      // Add more customer data as needed
    },
    // Add more customers as needed
  ];
  
  // Dummy data for products
  const products = [
    {
      id: 209,
      name: "New Product",
      category: "The god of War",
      characteristics: "New Product Characteristics",
      features: "New Product Features",
      brand: "New Product Brand",
      sku: [
        {
          id: 248,
          selling_price: 54,
          max_retail_price: 44,
          customer: 1, // Assuming customer ID 1 is associated with this SKU
          amount: 33,
          unit: "kg",
          quantity_in_inventory: 0,
        },
        {
          id: 247,
          selling_price: 32,
          max_retail_price: 32,
          customer: 2, // Assuming customer ID 2 is associated with this SKU
          amount: 33,
          unit: "kg",
          quantity_in_inventory: 0,
        },
        {
          id: 246,
          selling_price: 23,
          max_retail_price: 21,
          customer: 1, // Assuming customer ID 1 is associated with this SKU
          amount: 22,
          unit: "kg",
          quantity_in_inventory: 1,
        },
      ],
      updated_on: "2024-05-24T12:46:41.995873Z",
      adding_date: "2024-05-24T12:46:41.995828Z",
    },
    // Add more products as needed
  ];
  
  // Dummy data for sale orders
  const saleOrders = [
    {
      customer_id: 1,
      items: [
        {
          sku_id: 248,
          price: 54,
          quantity: 1,
        },
        {
          sku_id: 246,
          price: 23,
          quantity: 2,
        },
      ],
      paid: false,
      invoice_no: "Invoice - 1212121",
      invoice_date: "2024-07-05",
    },
    // Add more sale orders as needed
  ];
  
  // Dummy data for buy orders
  const buyOrders = [
    {
      // Define buy order data here
    },
    // Add more buy orders as needed
  ];
  
  export { customers, products, saleOrders, buyOrders };
  