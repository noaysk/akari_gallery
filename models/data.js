var mealKits =[
    {
    title:"flank steak with baked potatoes" ,
    included:"potato, basil and beef", 
    description:"Rich and bold flavors make this meal just right for Special Day or any Sunday night dinner.",
    price:19.99, 
    cookingTime: 125, 
    servings: 2, 
    calories: 516.4, 
    image:"/static/images/steak.jpg" ,
    isTopMeal: false,
    category:"western"
    },
    {
    title:"fiery furnaces" ,
    included:"bacon, cheese, crushed hot peppers and non-sesame seed bun", 
    description:"Tasty, delicious, and has me craving more on the first bite.” to “Juicy, mouthwatering, tasty, and everything you’d ever want to savor.",
    price:6.99, 
    cookingTime: 55, 
    servings: 1, 
    calories: 810, 
    image:"/static/images/humb.jpg" ,
    isTopMeal: false,
    category:"western"
    },
    {
    title:"Baked Stuffed Lobster" ,
    included:"paprika, thyme,butter, roe, garlic clovers and lobster", 
    description:"It's a great centerpiece for a fancy meal and perfect for a birthday, anniversary, Valentine's Day, or New Year's Eve. To make this dish, fresh lobster is stuffed with a savory cracker mixture flavored with sweet onion, celery, garlic, and Parmesan cheese. The dish is then baked in the oven for a quick and elegant meal for two.​",
    price:15.99, 
    cookingTime: 75, 
    servings: 2, 
    calories: 728, 
    image:"/static/images/tacoss.jpg" ,
    isTopMeal: true,
    category:"western"
    },
    {
    title:"Greek Salmon" ,
    included:"mushroom, tomato, cauliflower, garlic, olive oil and salmon", 
    description:"We love this meal because it comes with lots of veggies! If you want to be extra-healthy, serve the salmon over a bed of arugula or spinach.",
    price:15.99, 
    cookingTime: 55, 
    servings: 1, 
    calories: 554.8, 
    image:"/static/images/salmon.jpg" ,
    isTopMeal: false,
    category:"western"
    },
    {
    title:"Manila's Tapsilog" ,
    included:"seasonal fish, okra, eggplant, tomato, egg, garlic and rice", 
    description:"Their tapsilog is so tender and oozing with so much flavor, that we wouldn’t be surprised if you decide to order another one!",
    price:9.99, 
    cookingTime: 35, 
    servings: 1, 
    calories: 321, 
    image:"/static/images/ph.jpg" ,
    isTopMeal: false,
    category:"asian"
    },
    {
    title:"Korean Bibimbap" ,
    included:"eggs, carrots, radishes, gochujang sauce, sauteed mushrooms and rice", 
    description:"a Korean dish of rice with cooked vegetables, usually meat, and often a raw or fried egg In Korea, some foods trickled down from the Imperial palace and others have humbler origins.",
    price:8.99, 
    cookingTime: 75, 
    servings: 1, 
    calories: 490, 
    image:"/static/images/korean.jpg" ,
    isTopMeal: true,
    category:"asian"
    },
    {
    title:"Flank and Brisket" ,
    included:"celery, brisket, coriander, scallions, fish sauce, pho noodles", 
    description:"a bowl of pho consists of a foundation of rice noodles topped with thinly sliced raw beef, which gets cooked when a portion of steaming, spiced beef broth is poured over top",
    price:7.99, 
    cookingTime: 65, 
    servings: 1, 
    calories: 427, 
    image:"/static/images/viet.jpg" ,
    isTopMeal: true,
    category:"asian"
    },
    {
    title:"Thai Red Curry With Chicken" ,
    included:"coconut milk, shallot, red chilies, chili powder, eggplant, lime leaves, basil and beef", 
    description:"spicy, savory, coconut-based curry made with lemongrass, galangal, and dried red chili peppers.",
    price:12.99, 
    cookingTime: 45, 
    servings: 1, 
    calories: 391.2, 
    image:"/static/images/ccc.jpg" ,
    isTopMeal: true,
    category:"asian"
    }
];



function getMealKitsByCategory(category) {
    return mealKits.filter(mealKit => mealKit.category == category);
}


function getTopMealData() {
    return mealKits.filter(function (data) {
        return data.isTopMeal == true;
    });
};

function getMealData() {
    return mealKits;
};

module.exports.getMealKitsByCategory = getMealKitsByCategory;
module.exports.getMealData = getMealData;
module.exports.getTopMealData = getTopMealData;