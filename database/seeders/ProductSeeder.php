<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Classic Margherita Pizza',
                'category' => 'Main Course',
                'price' => 14.99,
                'description' => 'Fresh tomatoes, mozzarella cheese, basil, and extra virgin olive oil on a crispy thin crust.',
                'status' => 'Available',
                'image' => null,
                'size_options' => json_encode([['size' => 'Small', 'price' => '12.99'], ['size' => 'Medium', 'price' => '14.99'], ['size' => 'Large', 'price' => '17.99']]),
                'addons' => json_encode([['name' => 'Extra Cheese', 'price' => '2.00'], ['name' => 'Mushrooms', 'price' => '1.50']]),
            ],
            [
                'name' => 'Grilled Chicken Caesar Salad',
                'category' => 'Salads',
                'price' => 12.99,
                'description' => 'Crisp romaine lettuce, grilled chicken breast, parmesan cheese, croutons, and our signature Caesar dressing.',
                'status' => 'Available',
                'image' => null,
                'size_options' => '[]',
                'addons' => json_encode([['name' => 'Extra Chicken', 'price' => '4.00'], ['name' => 'Avocado', 'price' => '2.50']]),
            ],
            [
                'name' => 'Beef Burger Deluxe',
                'category' => 'Burgers',
                'price' => 16.99,
                'description' => 'Premium beef patty with cheddar, lettuce, tomato, pickles, onions, and special sauce on a brioche bun.',
                'status' => 'Available',
                'image' => null,
                'size_options' => json_encode([['size' => 'Single', 'price' => '16.99'], ['size' => 'Double', 'price' => '21.99']]),
                'addons' => json_encode([['name' => 'Bacon', 'price' => '3.00'], ['name' => 'Extra Patty', 'price' => '6.00']]),
            ],
            [
                'name' => 'Spaghetti Carbonara',
                'category' => 'Main Course',
                'price' => 15.99,
                'description' => 'Traditional Italian pasta with creamy egg sauce, pancetta, parmesan cheese, and black pepper.',
                'status' => 'Available',
                'image' => null,
                'size_options' => '[]',
                'addons' => json_encode([['name' => 'Garlic Bread', 'price' => '3.50'], ['name' => 'Extra Parmesan', 'price' => '1.50']]),
            ],
            [
                'name' => 'Chocolate Lava Cake',
                'category' => 'Desserts',
                'price' => 8.99,
                'description' => 'Warm chocolate cake with a molten center, served with vanilla ice cream and fresh berries.',
                'status' => 'Available',
                'image' => null,
                'size_options' => '[]',
                'addons' => json_encode([['name' => 'Extra Ice Cream', 'price' => '2.00'], ['name' => 'Whipped Cream', 'price' => '1.00']]),
            ],
            [
                'name' => 'Thai Green Curry',
                'category' => 'Main Course',
                'price' => 17.99,
                'description' => 'Aromatic green curry with coconut milk, bamboo shoots, bell peppers, and your choice of protein.',
                'status' => 'Available',
                'image' => null,
                'size_options' => json_encode([['size' => 'Regular', 'price' => '17.99'], ['size' => 'Large', 'price' => '21.99']]),
                'addons' => json_encode([['name' => 'Jasmine Rice', 'price' => '2.50'], ['name' => 'Spring Rolls', 'price' => '4.00']]),
            ],
            [
                'name' => 'Crispy Calamari',
                'category' => 'Appetizers',
                'price' => 11.99,
                'description' => 'Golden fried squid rings served with marinara sauce and lemon wedges.',
                'status' => 'Available',
                'image' => null,
                'size_options' => '[]',
                'addons' => json_encode([['name' => 'Tartar Sauce', 'price' => '0.50'], ['name' => 'Spicy Mayo', 'price' => '0.50']]),
            ],
            [
                'name' => 'Fresh Berry Smoothie',
                'category' => 'Beverages',
                'price' => 6.99,
                'description' => 'Blend of strawberries, blueberries, raspberries, banana, and yogurt with honey.',
                'status' => 'Available',
                'image' => null,
                'size_options' => json_encode([['size' => 'Regular', 'price' => '6.99'], ['size' => 'Large', 'price' => '8.99']]),
                'addons' => json_encode([['name' => 'Protein Boost', 'price' => '2.00'], ['name' => 'Chia Seeds', 'price' => '1.00']]),
            ],
            [
                'name' => 'BBQ Ribs Platter',
                'category' => 'Main Course',
                'price' => 24.99,
                'description' => 'Tender pork ribs glazed with smoky BBQ sauce, served with coleslaw, fries, and cornbread.',
                'status' => 'Available',
                'image' => null,
                'size_options' => json_encode([['size' => 'Half Rack', 'price' => '18.99'], ['size' => 'Full Rack', 'price' => '24.99']]),
                'addons' => json_encode([['name' => 'Extra Sauce', 'price' => '1.00'], ['name' => 'Onion Rings', 'price' => '4.50']]),
            ],
            [
                'name' => 'Tiramisu',
                'category' => 'Desserts',
                'price' => 9.99,
                'description' => 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.',
                'status' => 'Available',
                'image' => null,
                'size_options' => '[]',
                'addons' => json_encode([['name' => 'Chocolate Shavings', 'price' => '1.00']]),
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
