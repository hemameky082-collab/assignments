//Meal => Name, description, difficulty, region,reviews,rating,prepTime,cookTime,servings
//Employee => Name, Age,Salary,
var meals = [
  //----------------MEAL 1--------------------

  {
    name: "BBQ Pulled Pork",
    desc: "Slow-cooked tender pork in smoky barbecue sauce",
    difficulty: "Easy",
    region: "American",
    rating: 4.7,
    reviews: 412,
    prepTime: 15,
    cookTime: 240,
    servings: 5,
    ingredients: [
      "1kg pork shoulder",
      "1 cup BBQ sauce",
      "1/2 cup apple cider vinegar",
      "2 tablespoons brown sugar",
      "1 tablespoon paprika",
    ],
    instructions: [
      "Mix paprika, garlic powder, brown sugar, salt and pepper. Rub all over pork shoulder.",
      "Place pork in slow cooker with apple cider vinegar and 1/2 cup water.",
      "Cook on low for 8 hours or high for 4 hours until meat is very tender.",
      "Remove pork and shred with two forks. Discard excess fat.",
    ],
    chefsTips: [
      "Use pork shoulder for best results - it stays moist",
      "Let pork rest before shredding for juicier meat",
      "Make your own BBQ sauce for better flavor",
      "Leftovers freeze well for up to 3 months",
    ],
    nutrition: {
      calories: 620,
      protein: 48,
      carbohydrates: 52,
      fat: 22,
      fiber: 3,
      sodium: 1180,
    },
    imgSource: "images/meal1.png",
  },
  //----------------MEAL 2--------------------

  {
    name: "Creamy Chicken Alfredo",
    desc: "Tender chicken with creamy Alfredo sauce over pasta",
    difficulty: "Medium",
    region: "Italian",
    rating: 4.8,
    reviews: 356,
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "2 chicken breasts",
      "300g fettuccine",
      "1 cup heavy cream",
      "1/2 cup parmesan cheese",
      "2 cloves garlic",
    ],
    instructions: [
      "Cook fettuccine according to package instructions.",
      "Season and cook chicken until golden, then slice.",
      "Sauté garlic, add cream and parmesan, and stir until smooth.",
      "Combine pasta, chicken, and sauce. Serve immediately.",
    ],
    chefsTips: [
      "Use freshly grated parmesan for a smoother sauce.",
      "Don't overcook the chicken.",
      "Reserve pasta water to thin the sauce if needed.",
      "Garnish with parsley before serving.",
    ],
    nutrition: {
      calories: 710,
      protein: 42,
      carbohydrates: 58,
      fat: 34,
      fiber: 3,
      sodium: 980,
    },
    imgSource: "images/meal2.png",
  },
  //----------------MEAL 3--------------------

  {
    name: "Beef Tacos",
    desc: "Seasoned ground beef served in crispy taco shells",
    difficulty: "Easy",
    region: "Mexican",
    rating: 4.6,
    reviews: 521,
    prepTime: 15,
    cookTime: 20,
    servings: 3,
    ingredients: [
      "500g ground beef",
      "8 taco shells",
      "1 packet taco seasoning",
      "1 cup shredded lettuce",
      "1 cup cheddar cheese",
    ],
    instructions: [
      "Brown the ground beef in a skillet.",
      "Add taco seasoning and a little water, then simmer.",
      "Warm taco shells in the oven.",
      "Fill shells with beef and desired toppings.",
    ],
    chefsTips: [
      "Drain excess fat before seasoning.",
      "Add diced tomatoes for freshness.",
      "Serve with sour cream and salsa.",
      "Warm shells to prevent cracking.",
    ],
    nutrition: {
      calories: 560,
      protein: 31,
      carbohydrates: 34,
      fat: 32,
      fiber: 4,
      sodium: 940,
    },
    imgSource: "images/meal3.png",
  },
  //----------------MEAL 4--------------------

  {
    name: "Vegetable Stir Fry",
    desc: "Fresh vegetables tossed in a savory soy-ginger sauce",
    difficulty: "Easy",
    region: "Asian",
    rating: 4.5,
    reviews: 289,
    prepTime: 15,
    cookTime: 12,
    servings: 2,
    ingredients: [
      "2 cups broccoli",
      "1 red bell pepper",
      "1 carrot",
      "3 tablespoons soy sauce",
      "1 tablespoon sesame oil",
    ],
    instructions: [
      "Chop all vegetables into bite-sized pieces.",
      "Heat sesame oil in a wok over high heat.",
      "Stir-fry vegetables until crisp-tender.",
      "Add soy sauce and toss before serving.",
    ],
    chefsTips: [
      "Cook over high heat for best texture.",
      "Don't overcrowd the pan.",
      "Add tofu or chicken for extra protein.",
      "Serve with steamed rice.",
    ],
    nutrition: {
      calories: 280,
      protein: 8,
      carbohydrates: 26,
      fat: 14,
      fiber: 7,
      sodium: 720,
    },
    imgSource: "images/meal4.png",
  },
  //----------------MEAL 5--------------------

  {
    name: "Classic Margherita Pizza",
    desc: "Thin crust pizza topped with mozzarella, tomatoes, and basil",
    difficulty: "Medium",
    region: "Italian",
    rating: 4.9,
    reviews: 648,
    prepTime: 30,
    cookTime: 15,
    servings: 6,
    ingredients: [
      "1 pizza dough",
      "1/2 cup pizza sauce",
      "200g mozzarella cheese",
      "2 tomatoes",
      "Fresh basil leaves",
    ],
    instructions: [
      "Preheat oven to 220°C (425°F).",
      "Spread pizza sauce over rolled-out dough.",
      "Top with mozzarella and sliced tomatoes.",
      "Bake until crust is golden, then garnish with basil.",
    ],
    chefsTips: [
      "Use fresh mozzarella for authentic flavor.",
      "Preheat the pizza stone if using one.",
      "Avoid overloading with toppings.",
      "Finish with olive oil before serving.",
    ],
    nutrition: {
      calories: 540,
      protein: 24,
      carbohydrates: 61,
      fat: 21,
      fiber: 3,
      sodium: 890,
    },
    imgSource: "images/meal5.png",
  },
];

var lastIndex = -1;
function generateRandomIndex() {
  var randomIndex = Math.floor(Math.random() * meals.length);
  while (randomIndex === lastIndex) {
    randomIndex = Math.floor(Math.random() * meals.length);
  }

  lastIndex = randomIndex;
  displayMeal(randomIndex); //arugment
}

function displayMeal(index) {
  //Static Rendering //Dynamic Rendering
  //
  var meal = meals[index]; // Wagba Wa7da ( Object )
  //        Method 1
  var isExtended = meal.prepTime + meal.cookTime > 45;
  if (isExtended === true) {
    document.getElementById("isExtended").classList.add("d-block");
    document.getElementById("isExtended").classList.remove("d-none");
  } else {
    document.getElementById("isExtended").classList.add("d-none");
    document.getElementById("isExtended").classList.remove("d-block");
  }
  /* Method 2
   var isExtended;
   if (meal.prepTime + meal.cookTime > 45) {
     isExtended = true;
   } else {
     isExtended = false;
   }
*/
  for (var propertyName in meal) {
    if (propertyName === "imgSource") {
      document
        .getElementById(propertyName)
        .setAttribute("src", meal[propertyName]);
      document
        .getElementById(propertyName)
        .setAttribute("alt", `Image of ${meal.name}`);
    } else if (
      propertyName === "ingredients" ||
      propertyName === "instructions" ||
      propertyName === "chefsTips"
    ) {
      var cartona = "";
      for (var i = 0; i < meal[propertyName].length; i++) {
        cartona += `  <li>
                            ${i + 1} ${meal[propertyName][i]}
                        </li>`;
      }
      document.getElementById(propertyName).innerHTML = cartona;
    } else if (propertyName === "nutrition") {
      for (var nutritionName in meal[propertyName]) {
        var nutritionObject = meal[propertyName];
        document.getElementById(nutritionName).innerHTML =
          nutritionObject[nutritionName];
      }
    } else {
      document.getElementById(propertyName).innerHTML = meal[propertyName];
    }
  }
}
generateRandomIndex();

//   var mealImage = document.getElementById("imgSource");
//   mealImage.setAttribute("src", meal.imgSource);
//   mealImage.setAttribute("alt", meal.name);
//   console.log(meal);
//   document.getElementById("name").innerHTML = meal.name;
//   document.getElementById("desc").innerHTML = meal.desc;
//   document.getElementById("region").innerHTML = meal.region;

//   var chefsCartona = "";
//   for (var i = 0; i < meal.chefsTips.length; i++) {
//       chefsCartona += `<li>${i + 1}-${meal.chefsTips[i]}</li>`;
//   }
//   document.getElementById("chefsTips").innerHTML = chefsCartona;

/*
 var user = {
    name: "saad",
    age: 20,
    isAdmin: false,
  };
  for (var propertyName in user) {
    console.log(propertyName, user[propertyName]);
    console.log(propertyName, user["name"]);
    console.log(propertyName, user["age"]);
    console.log(propertyName, user["isAdmin"]);
  }
    */
