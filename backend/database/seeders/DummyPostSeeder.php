<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;

class DummyPostSeeder extends Seeder
{
    public function run()
    {
        $posts = [
            [
                'title' => 'The secret tips & tricks to prepare a perfect burger & pizza for our customers',
                'content' => 'Creating the perfect burger and pizza is an art, combining ingredients, techniques, and passion to craft a culinary masterpiece. The heart of a perfect burger is top-notch beef with fresh toppings and homemade sauce.',
                'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop'
            ],
            [
                'title' => 'Exclusive baking lessons from the pastry king',
                'content' => 'Discover the secrets behind flaky croissants, delicate macarons, and rich chocolate ganache straight from our master baker.',
                'image' => 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1'
            ],
            [
                'title' => 'How to prepare the perfect fries in an air fryer',
                'content' => 'Crispy on the outside, tender on the inside: here is how to season and cook golden french fries using an air fryer with minimal oil.',
                'image' => 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1'
            ],
            [
                'title' => 'How to prepare delicious chicken tenders',
                'content' => 'Marinated in buttermilk and seasoned with a blend of garlic, paprika, and herbs, these tenders deliver the ultimate crunch in every bite.',
                'image' => 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1'
            ],
            [
                'title' => '5 great cooking gadgets you can buy to save time',
                'content' => 'From smart immersion blenders to instant digital meat thermometers, elevate your kitchen efficiency with these essential tools.',
                'image' => 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1'
            ],
            [
                'title' => 'How to prepare a delicious gluten free sushi',
                'content' => 'Enjoy the elegance and fresh flavors of sushi with gluten-free tamari and fresh sashimi-grade fish, avocado, and cucumber.',
                'image' => 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1'
            ],
            [
                'title' => '7 delicious cheesecake recipes you can prepare',
                'content' => 'Explore seven creative twists on classic New York cheesecake, including salted caramel, matcha, strawberry swirl, and double chocolate.',
                'image' => 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1'
            ],
            [
                'title' => '5 great pizza restaurants you should visit this city',
                'content' => 'A curated journey through the best wood-fired Neapolitan and crispy artisan pizzerias that defined authentic flavors.',
                'image' => 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1'
            ],
            [
                'title' => 'Chef recommendations: Choosing the freshest produce',
                'content' => 'Our head chef shares secrets on selecting vibrant organic vegetables and peak-season herbs that transform everyday dishes into art.',
                'image' => 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1'
            ],
            [
                'title' => 'Mastering the art of Japanese ramen broth',
                'content' => 'A deep dive into crafting rich, aromatic tonkotsu and shoyu broths simmered patiently for over 12 hours for maximum umami.',
                'image' => 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1'
            ],
            [
                'title' => 'Top 20 simple and quick desserts for kids',
                'content' => 'Fun, colorful, and wholesome treats you can make together with your little ones in 30 minutes or less.',
                'image' => 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1'
            ],
            [
                'title' => 'The history of artisan coffee roasting',
                'content' => 'Explore the story behind single-origin beans, light vs dark roast profiles, and how brewing temperatures alter the taste note notes.',
                'image' => 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1'
            ],
        ];

        foreach ($posts as $post) {
            Post::create($post);
        }
    }
}
