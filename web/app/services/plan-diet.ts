import type { DietPlan } from "./types";

export function planDiet(): DietPlan {
  const mockData: DietPlan = {
    calories_per_day: 2760,
    macros: { protein: 140.8, carbohydrates: 321.0, fats: 77.0 },
    daily_meal_plans: [
      {
        meals: [
          {
            name: "Breakfast",
            ingredients: [
              {
                name: "Oats",
                quantity: 60.0,
                macros: { protein: 7.8, carbohydrates: 40.2, fats: 3.6 },
              },
              {
                name: "Skim Milk",
                quantity: 250.0,
                macros: { protein: 8.8, carbohydrates: 12.3, fats: 0.3 },
              },
              {
                name: "Banana",
                quantity: 100.0,
                macros: { protein: 1.3, carbohydrates: 23.0, fats: 0.3 },
              },
            ],
          },
          {
            name: "Lunch",
            ingredients: [
              {
                name: "Grilled Chicken Breast",
                quantity: 150.0,
                macros: { protein: 45.0, carbohydrates: 0.0, fats: 3.0 },
              },
              {
                name: "Brown Rice",
                quantity: 150.0,
                macros: { protein: 12.0, carbohydrates: 45.0, fats: 1.2 },
              },
              {
                name: "Steamed Broccoli",
                quantity: 100.0,
                macros: { protein: 3.0, carbohydrates: 7.0, fats: 0.3 },
              },
              {
                name: "Olive Oil",
                quantity: 10.0,
                macros: { protein: 0.0, carbohydrates: 0.0, fats: 9.0 },
              },
            ],
          },
          {
            name: "Dinner",
            ingredients: [
              {
                name: "Baked Salmon",
                quantity: 140.0,
                macros: { protein: 30.0, carbohydrates: 0.0, fats: 14.0 },
              },
              {
                name: "Quinoa",
                quantity: 140.0,
                macros: { protein: 16.0, carbohydrates: 50.0, fats: 3.0 },
              },
              {
                name: "Mixed Salad (lettuce, tomato, cucumber)",
                quantity: 100.0,
                macros: { protein: 2.0, carbohydrates: 5.0, fats: 0.0 },
              },
            ],
          },
          {
            name: "Snack",
            ingredients: [
              {
                name: "Greek Yogurt (plain, nonfat)",
                quantity: 200.0,
                macros: { protein: 20.0, carbohydrates: 7.0, fats: 0.0 },
              },
              {
                name: "Almonds",
                quantity: 20.0,
                macros: { protein: 4.7, carbohydrates: 3.5, fats: 6.6 },
              },
            ],
          },
        ],
      },
      {
        meals: [
          {
            name: "Breakfast",
            ingredients: [
              {
                name: "Whole Wheat Toast",
                quantity: 80.0,
                macros: { protein: 8.0, carbohydrates: 40.0, fats: 2.0 },
              },
              {
                name: "Scrambled Eggs (2 large)",
                quantity: 100.0,
                macros: { protein: 13.0, carbohydrates: 1.0, fats: 10.0 },
              },
              {
                name: "Orange Juice",
                quantity: 200.0,
                macros: { protein: 2.0, carbohydrates: 24.0, fats: 0.0 },
              },
            ],
          },
          {
            name: "Lunch",
            ingredients: [
              {
                name: "Turkey Breast (roasted)",
                quantity: 150.0,
                macros: { protein: 45.0, carbohydrates: 0.0, fats: 1.5 },
              },
              {
                name: "Sweet Potato",
                quantity: 150.0,
                macros: { protein: 3.0, carbohydrates: 35.0, fats: 0.1 },
              },
              {
                name: "Green Beans",
                quantity: 100.0,
                macros: { protein: 2.0, carbohydrates: 7.0, fats: 0.0 },
              },
              {
                name: "Avocado",
                quantity: 50.0,
                macros: { protein: 1.0, carbohydrates: 3.0, fats: 8.0 },
              },
            ],
          },
          {
            name: "Dinner",
            ingredients: [
              {
                name: "Lean Beef Steak (grilled)",
                quantity: 150.0,
                macros: { protein: 38.0, carbohydrates: 0.0, fats: 10.0 },
              },
              {
                name: "Mashed Potatoes",
                quantity: 150.0,
                macros: { protein: 4.0, carbohydrates: 35.0, fats: 2.0 },
              },
              {
                name: "Steamed Carrots",
                quantity: 100.0,
                macros: { protein: 1.0, carbohydrates: 7.0, fats: 0.0 },
              },
            ],
          },
          {
            name: "Snack",
            ingredients: [
              {
                name: "Cottage Cheese (low-fat)",
                quantity: 200.0,
                macros: { protein: 28.0, carbohydrates: 6.0, fats: 2.0 },
              },
              {
                name: "Mixed Nuts",
                quantity: 15.0,
                macros: { protein: 4.0, carbohydrates: 4.0, fats: 10.0 },
              },
            ],
          },
        ],
      },
      {
        meals: [
          {
            name: "Breakfast",
            ingredients: [
              {
                name: "Chia Seeds",
                quantity: 30.0,
                macros: { protein: 5.0, carbohydrates: 12.0, fats: 9.0 },
              },
              {
                name: "Almond Milk (unsweetened)",
                quantity: 250.0,
                macros: { protein: 1.0, carbohydrates: 2.0, fats: 2.5 },
              },
              {
                name: "Blueberries",
                quantity: 100.0,
                macros: { protein: 1.0, carbohydrates: 14.5, fats: 0.3 },
              },
            ],
          },
          {
            name: "Lunch",
            ingredients: [
              {
                name: "Grilled Tofu",
                quantity: 150.0,
                macros: { protein: 25.5, carbohydrates: 6.0, fats: 12.0 },
              },
              {
                name: "Brown Rice",
                quantity: 150.0,
                macros: { protein: 12.0, carbohydrates: 45.0, fats: 1.2 },
              },
              {
                name: "Stir-fried Mixed Vegetables",
                quantity: 100.0,
                macros: { protein: 3.0, carbohydrates: 7.0, fats: 0.0 },
              },
              {
                name: "Sesame Oil",
                quantity: 10.0,
                macros: { protein: 0.0, carbohydrates: 0.0, fats: 9.0 },
              },
            ],
          },
          {
            name: "Dinner",
            ingredients: [
              {
                name: "Pan-seared Cod",
                quantity: 140.0,
                macros: { protein: 30.0, carbohydrates: 0.0, fats: 3.0 },
              },
              {
                name: "Quinoa",
                quantity: 140.0,
                macros: { protein: 16.0, carbohydrates: 50.0, fats: 3.0 },
              },
              {
                name: "Steamed Asparagus",
                quantity: 100.0,
                macros: { protein: 2.0, carbohydrates: 5.0, fats: 0.0 },
              },
            ],
          },
          {
            name: "Snack",
            ingredients: [
              {
                name: "Peanut Butter",
                quantity: 30.0,
                macros: { protein: 7.0, carbohydrates: 6.0, fats: 16.0 },
              },
              {
                name: "Apple",
                quantity: 150.0,
                macros: { protein: 0.5, carbohydrates: 20.5, fats: 0.3 },
              },
            ],
          },
        ],
      },
    ],
  };
  return mockData;
}
