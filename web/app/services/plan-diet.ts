import type { DietPlan } from "./types";

export function planDiet(): DietPlan | null {
  const mockData: DietPlan = {
    nutrition_info: {
      protein: 136.8,
      carbohydrates: 474.7,
      fats: 76.0,
      calories: 3130.0,
    },
    description:
      "This personalized nutrition plan is designed to help you slowly and steadily gain weight from 76 kg to your target weight of 80 kg while supporting your moderately active lifestyle (exercising 3-5 days per week).\n\nThe calorie calculation is based on the Mifflin-St Jeor formula to estimate your Basal Metabolic Rate (BMR), then multiplied by your activity factor to get Total Daily Energy Expenditure (TDEE). A caloric surplus appropriate for slow and steady weight gain is added to the TDEE to support muscle growth without excessive fat gain. This results in a target of approximately 3130 calories per day.\n\nProtein intake is set at 1.8 grams per kilogram of your current body weight (76 kg), which amounts to roughly 137 grams per day. This range is chosen to support muscle repair and growth during a weight gain phase while also maintaining optimal recovery from your exercise routine.\n\nFats are set at 1.0 gram per kilogram of body weight (76 grams per day) to ensure sufficient intake for hormone production, nutrient absorption, and overall health.\n\nCarbohydrates are calculated from the remaining calories after accounting for protein and fats, resulting in about 475 grams per day. This will provide ample energy to fuel your workouts and daily activities.\n\nThere are no medical conditions or dietary restrictions impacting this plan, so no special modifications are needed.\n\nWith four meals per day, aim to distribute these macronutrients evenly to maintain energy levels and support recovery throughout the day.\n\nPrioritize nutrient-dense whole foods such as lean meats, dairy, whole grains, fruits, vegetables, nuts, and healthy oils. Avoid excessive processed foods and sugary snacks to maximize health benefits.\n\nFollowing this plan with consistency in both nutrition and exercise will help you achieve your weight gain goals steadily while maintaining good overall health and performance.",
    daily_meal_plans: [
      {
        description:
          "This first day's meals focus on a balanced distribution of lean poultry, whole grains, and diverse vegetables to provide ample protein and complex carbohydrates paired with healthy fats. The inclusion of chicken breast, quinoa, and a variety of colorful vegetables ensures nutrient density, while natural oils and nuts support healthy fat intake. Each meal is crafted to maintain steady energy throughout the day and optimize muscle repair and growth in line with the patient's caloric and macronutrient goals.",
        meals: [
          {
            name: "Breakfast",
            ingredients: [
              { name: "Oats", quantity: "40% - 50%" },
              { name: "Skim milk", quantity: "25% - 30%" },
              { name: "Whey protein powder", quantity: "15% - 20%" },
              { name: "Blueberries", quantity: "5% - 10%" },
              { name: "Chopped almonds", quantity: "5% - 7%" },
            ],
          },
          {
            name: "Lunch",
            ingredients: [
              { name: "Grilled chicken breast", quantity: "35% - 40%" },
              { name: "Quinoa", quantity: "30% - 35%" },
              { name: "Steamed broccoli", quantity: "15% - 20%" },
              { name: "Olive oil", quantity: "8% - 10%" },
              { name: "Carrots", quantity: "5% - 7%" },
            ],
          },
          {
            name: "Snack",
            ingredients: [
              { name: "Greek yogurt (low-fat)", quantity: "50% - 60%" },
              { name: "Honey", quantity: "5% - 8%" },
              { name: "Mixed nuts (walnuts, cashews)", quantity: "25% - 30%" },
              { name: "Sliced strawberries", quantity: "8% - 10%" },
            ],
          },
          {
            name: "Dinner",
            ingredients: [
              { name: "Baked salmon", quantity: "35% - 40%" },
              { name: "Brown rice", quantity: "30% - 35%" },
              { name: "Roasted asparagus", quantity: "15% - 20%" },
              { name: "Avocado slices", quantity: "10% - 12%" },
              { name: "Lemon juice", quantity: "3% - 5%" },
            ],
          },
        ],
      },
      {
        description:
          "The second daily plan incorporates diverse protein sources including lean beef and tofu, combined with a range of whole grains and fresh vegetables to provide balanced macros and micronutrients. This plan introduces legumes and alternative protein to support muscle growth while keeping the meals palatable and nourishing. Healthy fats come from olive oil, seeds, and avocado, promoting overall well-being and sustained energy release.",
        meals: [
          {
            name: "Breakfast",
            ingredients: [
              { name: "Whole wheat toast", quantity: "35% - 40%" },
              { name: "Scrambled eggs", quantity: "30% - 35%" },
              { name: "Sliced avocado", quantity: "15% - 20%" },
              { name: "Tomato slices", quantity: "10% - 12%" },
              { name: "Olive oil", quantity: "3% - 5%" },
            ],
          },
          {
            name: "Lunch",
            ingredients: [
              { name: "Lean ground beef (cooked)", quantity: "40% - 45%" },
              { name: "Brown rice", quantity: "30% - 35%" },
              { name: "Steamed green beans", quantity: "15% - 20%" },
              { name: "Chopped red bell pepper", quantity: "5% - 7%" },
              { name: "Sunflower seeds", quantity: "3% - 5%" },
            ],
          },
          {
            name: "Snack",
            ingredients: [
              { name: "Cottage cheese (low-fat)", quantity: "50% - 55%" },
              { name: "Pineapple chunks", quantity: "15% - 20%" },
              { name: "Walnuts", quantity: "20% - 25%" },
              { name: "Chia seeds", quantity: "5% - 7%" },
            ],
          },
          {
            name: "Dinner",
            ingredients: [
              { name: "Grilled tofu", quantity: "35% - 40%" },
              { name: "Sweet potato", quantity: "30% - 35%" },
              { name: "Sautéed spinach", quantity: "15% - 20%" },
              { name: "Olive oil", quantity: "8% - 10%" },
              { name: "Sesame seeds", quantity: "3% - 5%" },
            ],
          },
        ],
      },
      {
        description:
          "This third day's menu emphasizes variety with fish, turkey, legumes, and dairy complemented by colorful vegetables and fibrous grains. The inclusion of pulses and legumes adds plant-based protein and complex carbs, balancing the macronutrient profile for muscle gain and energy. Healthy oils and nuts support fat targets while enhancing flavor. This diverse selection supports consistent progress and enjoyment through distinctive meals distinct from previous days.",
        meals: [
          {
            name: "Breakfast",
            ingredients: [
              { name: "Greek yogurt (full fat)", quantity: "40% - 45%" },
              { name: "Granola (low sugar)", quantity: "30% - 35%" },
              { name: "Chopped walnuts", quantity: "10% - 12%" },
              { name: "Banana slices", quantity: "10% - 12%" },
              { name: "Honey drizzle", quantity: "3% - 5%" },
            ],
          },
          {
            name: "Lunch",
            ingredients: [
              { name: "Roasted turkey breast", quantity: "35% - 40%" },
              { name: "Whole grain pasta", quantity: "30% - 35%" },
              { name: "Cherry tomatoes", quantity: "15% - 20%" },
              { name: "Steamed zucchini", quantity: "10% - 12%" },
              { name: "Olive oil", quantity: "5% - 7%" },
            ],
          },
          {
            name: "Snack",
            ingredients: [
              { name: "Hummus", quantity: "40% - 45%" },
              { name: "Carrot sticks", quantity: "25% - 30%" },
              { name: "Celery sticks", quantity: "15% - 20%" },
              { name: "Pumpkin seeds", quantity: "10% - 12%" },
              { name: "Whole wheat pita bread", quantity: "5% - 7%" },
            ],
          },
          {
            name: "Dinner",
            ingredients: [
              { name: "Grilled cod", quantity: "35% - 40%" },
              { name: "Lentils (cooked)", quantity: "30% - 35%" },
              { name: "Steamed kale", quantity: "15% - 20%" },
              { name: "Avocado oil", quantity: "8% - 10%" },
              { name: "Lemon zest", quantity: "2% - 4%" },
            ],
          },
        ],
      },
    ],
  };
  return mockData;
}
