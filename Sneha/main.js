document.addEventListener('DOMContentLoaded', () => {
    const highestQuantityProducts = document.getElementById('highest-quantity-products');
    const inventoryStatus = document.getElementById('inventory-status');
    const recipientDetailsBody = document.getElementById('recipient-details-body');
    const addProductModal = document.getElementById('add-product-modal');
    const updateInventoryModal = document.getElementById('update-inventory-modal');
    const addProductBtn = document.getElementById('add-product-btn');
    const updateInventoryBtn = document.getElementById('update-inventory-btn');
    const closeAddModal = document.getElementById('close-add-modal');
    const closeUpdateModal = document.getElementById('close-update-modal');
    const addProductForm = document.getElementById('add-product-form');
    const updateInventoryForm = document.getElementById('update-inventory-form');

    // Sample Data
    let inventoryData = {
        products: [
           
            { name: 'Books', quantity: 45 },
            { name: 'Rhino Toys', quantity: 40 },
            { name: 'Bags', quantity: 30 },
            { name: 'Laptops', quantity: 25 },
            { name: 'Chargers', quantity: 20 },
            { name: 'Mouse', quantity: 10 },
        ],
        recipients: [
            { product: 'Bag', recipient: 'Gunasri', quantity: 1 },
            { product: 'Toy', recipient: 'Gunasri', quantity: 1 },
            { product: 'Laptop', recipient: 'Hari', quantity: 2 },
            { product: 'Charger', recipient: 'Bharath', quantity: 2 },
            { product: 'Laptop', recipient: 'Viji', quantity: 14 },
            { product: 'Bag', recipient: 'Santhosh', quantity: 14 },
            { product: 'Charger', recipient: 'Bharath', quantity: 2 },
            { product: 'Laptop', recipient: 'Viji', quantity: 14 },
            { product: 'Bag', recipient: 'Santhosh', quantity: 14 }
        ]
    };

      
    const fetchData = () => {
        // Fetch data from an API or local storage
        return inventoryData;
    };

    const saveData = (data) => {
        // Save data to an API or local storage
        inventoryData = data;
    };

    const displayHighestQuantityProducts = (products) => {
        highestQuantityProducts.innerHTML = `
           
            <div class="product-list">
                ${products.slice(0, 3).map(product => `
                    <div class="product">
                        <h3>${product.name}</h3>
                        <p>${product.quantity}</p>
                    </div>
                `).join('')}
            </div>
        `;
    };

    const displayInventoryStatus = (products) => {
        const inventoryStatus = document.getElementById('inventory-status');

      
        const ctx = document.createElement('canvas');
        console.log(inventoryStatus);
        
        ctx.id = 'inventoryStatusChart';
        inventoryStatus.innerHTML = '<h2>Inventory Status</h2>';
        
        inventoryStatus.appendChild(ctx);
        
        const chartData = {
          labels:products.map(p => p.name),
          datasets: [{
            label: 'Quantity',
            data:products.map(p => p.quantity),
            backgroundColor: ['#4CAF50', '#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#E67E22']
          }]
        };
        
        new Chart(ctx, { 
          type: 'bar',
          data: chartData
        });
      };
      
        
    
    

    const displayRecipientDetails = (recipients) => {
        recipientDetailsBody.innerHTML = recipients.map(recipient => `
            <tr>
                <td>${recipient.product}</td>
                <td>${recipient.recipient}</td>
                <td>${recipient.quantity}</td>
            </tr>
        `).join('');
    };

    const openModal = (modal) => {
        modal.style.display = 'block';
    };

    const closeModal = (modal) => {
        modal.style.display = 'none';
    };

    const init = () => {
        const data = fetchData();
        const sortedProducts = data.products.sort((a, b) => b.quantity - a.quantity);
        
        displayHighestQuantityProducts(sortedProducts);
        displayInventoryStatus(data.products);
        displayRecipientDetails(data.recipients);

        addProductBtn.addEventListener('click', () => openModal(addProductModal));
        updateInventoryBtn.addEventListener('click', () => openModal(updateInventoryModal));
        closeAddModal.addEventListener('click', () => closeModal(addProductModal));
        closeUpdateModal.addEventListener('click', () => closeModal(updateInventoryModal));

        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productName = e.target['product-name'].value;
            const productQuantity = parseInt(e.target['product-quantity'].value);

            const existingProduct = data.products.find(p => p.name.toLowerCase() === productName.toLowerCase());
            if (existingProduct) {
                existingProduct.quantity += productQuantity;
            } else {
                data.products.push({ name: productName, quantity: productQuantity });
            }

            saveData(data);
            init();
            closeModal(addProductModal);
        });

        updateInventoryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productName = e.target['product-name-update'].value;
            const recipientName = e.target['recipient-name'].value;
            const productQuantity = parseInt(e.target['product-quantity-update'].value);

            const existingProduct = data.products.find(p => p.name.toLowerCase() === productName.toLowerCase());
            if (existingProduct && existingProduct.quantity >= productQuantity) {
                existingProduct.quantity -= productQuantity;
                data.recipients.push({ product: productName, recipient: recipientName, quantity: productQuantity });

                saveData(data);
                init();
                closeModal(updateInventoryModal);
            } else {
                alert('Not enough quantity available or product does not exist.');
            }
        });

        window.onclick = (event) => {
            if (event.target === addProductModal) {
                closeModal(addProductModal);
            } else if (event.target === updateInventoryModal) {
                closeModal(updateInventoryModal);
            }
        };
    };
   
    

    init();
    // displayInventoryStatus(products);
});
