<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\MenuItem;

class DummyMenuSeeder extends Seeder
{
    public function run()
    {
        $items = [
            [ "name" => "Fried Eggs", "price" => 9.99, "description" => "Made with eggs, lettuce, salt, oil and other ingredients.", "category" => "Breakfast", "image" => "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&h=350&fit=crop" ],
            [ "name" => "Hawaiian Pizza", "price" => 15.99, "description" => "Made with pizza dough, cheese, and other ingredients.", "category" => "Main Dishes", "image" => "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=350&fit=crop" ],
            [ "name" => "Martinez Cocktail", "price" => 7.22, "description" => "Made with sugar, lime, soda, ice and other ingredients.", "category" => "Drinks", "image" => "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=350&fit=crop" ],
            [ "name" => "Butterscotch Cake", "price" => 20.99, "description" => "Made with sugar, flour, butter and other ingredients.", "category" => "Desserts", "image" => "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=350&fit=crop" ],
            [ "name" => "Mint Lemonade", "price" => 5.89, "description" => "Made with mint, lime, salt, ice and other ingredients.", "category" => "Drinks", "image" => "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&h=350&fit=crop" ],
            [ "name" => "Chocolate Icecream", "price" => 18.05, "description" => "Made with chocolate, milk, cream and other ingredients.", "category" => "Desserts", "image" => "https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1" ],
            [ "name" => "Cheese Burger", "price" => 12.55, "description" => "Made with buns, patty, cheese, and other ingredients.", "category" => "Main Dishes", "image" => "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=350&fit=crop" ],
            [ "name" => "Classic Waffles", "price" => 12.99, "description" => "Made with waffles, fruit, syrup and other ingredients.", "category" => "Breakfast", "image" => "https://images.pexels.com/photos/3780469/pexels-photo-3780469.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1" ],
        ];
        
        foreach ($items as $item) {
            MenuItem::create($item);
        }
    }
}
