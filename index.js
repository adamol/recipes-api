const express = require('express')
const app = express()

recipes = [
    {
        'name': 'Pasta Bolognese',
        'ingredients': [
            '2 tbsp Sun Dried Tomato Paste',
            '1 small SuperValu Carrot chopped',
            '2 tins SuperValu Chopped Tomatoes, 400g each',
            'SuperValu Fresh Basil chopped',
            '2 sprigs SuperValu Fresh Rosemary finely chopped',
            '2 cloves SuperValu Garlic crushed',
            '1 tbsp SuperValu Olive Oil',
            '1 small SuperValu Onion chopped',
            '25 g SuperValu Parmesan Cheese Shavings shaved',
            '500 g SuperValu Quality Irish Round Steak Mince',
            '6 x SuperValu Smoked Bacon Rashers',
            '400 g SuperValu Spaghetti'
        ],
        'description': 'Heat the SuperValu Oil in a frying pan. Add carrot, onion and cook for 5 mins to soften. Add streaky bacon and garlic and toss in pan for 3 mins. Add minced meat to pan and cook for 5 mins or until all meat is cooked. Pour the tomatoes, tomato paste, chopped rosemary and basil into mixture and simmer for 15 mins. Cook spaghetti according to pack instructions with a splash of SuperValu olive oil and a pinch of salt. Reserve some of the cooking water, drain and pour the pasta into the pan along with the sauce. Toss together, thinning with pasta water, if needed, and serve with the extra basil leaves with Parmesan shavings on top.'
    },
    {
        'name': 'Slow Cooker Chicken Thighs',
        'ingredients': [
            '1 tbsp. extra-virgin olive oil',
            '6 bone-in or boneless chicken thighs',
            'kosher salt',
            'Freshly ground black pepper',
            '1/2 c. low-sodium soy sauce',
            '1/2 c. ketchup',
            '1/4 c. honey',
            '3 cloves garlic, minced',
            '1/2 oz. freshly chopped ginger',
            '2 tbsp. sriracha',
            'Juice of 1 lime',
            'Cooked rice, for serving',
            'Freshly chopped cilantro, for garnish'
        ],
        'description': 'In a cast-iron skillet over medium-high heat, heat oil. Season chicken thighs with salt and pepper and sear until golden, 3 minutes per side. Transfer chicken thighs to slow cooker. Whisk together soy sauce, ketchup, honey, garlic, ginger, Sriracha, and lime juice. Pour sauce over chicken and toss to combine. Cover and cook until no longer pink, on low for 6 hours or high for 2 hours. Serve with rice and garnish with cilantro.'
    }
]


app.get('/', function(req, res) {
    res.send('Hello World')
})

app.get('/recipes', function(req, res) {
    res.send(recipes)
})

app.get('/recipes/:recipeId', function(req, res) {
    res.send(recipes[req.params.recipeId])
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})
