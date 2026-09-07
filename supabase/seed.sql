-- Idempotent development seed. Safe to run repeatedly.
insert into public.categories (name, slug, description) values
('High Protein','high-protein','Satisfying, protein-forward meals for busy days.'),
('Quick Dinners','quick-dinners','Wholesome dinners ready in 30 minutes or less.'),
('Air Fryer','air-fryer','Crisp, lighter favorites made easy in the air fryer.'),
('Meal Prep','meal-prep','Make-ahead meals that keep healthy eating simple.'),
('Healthy Breakfasts','healthy-breakfasts','Bright, energizing starts to your day.'),
('Budget Meals','budget-meals','Nutritious recipes that are kind to your grocery budget.')
on conflict (slug) do update set name=excluded.name, description=excluded.description;

update public.categories set
  seo_title = case slug
    when 'high-protein' then 'Easy High-Protein Recipes for Everyday Meals'
    when 'quick-dinners' then 'Quick Healthy Dinner Recipes in 30 Minutes'
    when 'air-fryer' then 'Easy Healthy Air Fryer Recipes'
    when 'meal-prep' then 'Healthy Meal Prep Recipes for Busy Weeks'
    when 'healthy-breakfasts' then 'Easy Healthy Breakfast Recipes'
    when 'budget-meals' then 'Budget-Friendly Healthy Meal Recipes'
  end,
  meta_description = case slug
    when 'high-protein' then 'Discover satisfying high-protein recipes made with everyday ingredients, clear steps, and practical nutrition for busy breakfasts, lunches, and dinners.'
    when 'quick-dinners' then 'Make quick healthy dinners with simple ingredients and plenty of flavor. Find practical weeknight meals ready in 30 minutes or less.'
    when 'air-fryer' then 'Find easy healthy air fryer recipes with crisp texture, straightforward instructions, and lighter ingredients for busy weeknight meals.'
    when 'meal-prep' then 'Plan a simpler week with healthy meal prep recipes designed for make-ahead breakfasts, lunches, and satisfying everyday dinners.'
    when 'healthy-breakfasts' then 'Start your day with easy healthy breakfast recipes, including make-ahead oats and balanced meals for busy weekday mornings.'
    when 'budget-meals' then 'Cook affordable healthy meals using accessible ingredients, practical techniques, and flavorful recipes that help stretch your grocery budget.'
  end
where slug in ('high-protein','quick-dinners','air-fryer','meal-prep','healthy-breakfasts','budget-meals');

insert into public.recipes (title,slug,short_description,hero_image_url,hero_image_alt,author_name,status,published_at,prep_minutes,cook_minutes,servings,calories,protein_grams,carbs_grams,fat_grams,helpful_tips,seo_title,meta_description,featured) values
('Lemon Herb Chicken Quinoa Bowls','lemon-herb-chicken-quinoa-bowls','Juicy lemon-garlic chicken, fluffy quinoa, and colorful roasted vegetables come together in an easy, protein-packed bowl.','/images/lemon-herb-chicken-bowl.png','Lemon herb chicken bowl with quinoa and vegetables','Maya Bennett','published','2026-08-18',15,20,4,445,42,38,16,array['Pound the chicken to an even thickness so it cooks uniformly.','Add the avocado just before serving.'],'Lemon Herb Chicken Quinoa Bowls (42g Protein)','Make easy lemon herb chicken quinoa bowls with roasted vegetables in 35 minutes.',true),
('Crispy Air Fryer Chicken Bites','crispy-air-fryer-chicken-bites','Tender, golden chicken bites with a smoky seasoning blend—ready in just 20 minutes.','/images/lemon-herb-chicken-bowl.png','Crispy seasoned chicken bites','Maya Bennett','published','2026-08-20',8,12,4,310,39,18,10,array['Cook in a single layer for the crispiest edges.'],'Healthy Air Fryer Chicken Bites','Easy crispy air fryer chicken bites ready in 20 minutes.',false),
('15-Minute Mediterranean Chickpea Salad','mediterranean-chickpea-salad','A bright pantry-friendly salad with crunchy vegetables, feta, and lemon vinaigrette.','/images/lemon-herb-chicken-bowl.png','Mediterranean chickpea salad','Maya Bennett','published','2026-08-22',15,0,4,385,16,48,14,array['Drain chickpeas thoroughly before dressing.'],'15-Minute Mediterranean Chickpea Salad','Fresh Mediterranean chickpea salad for a quick healthy lunch.',false),
('Berry Almond Overnight Oats','berry-almond-overnight-oats','Creamy, naturally sweet overnight oats for effortless weekday mornings.','/images/lemon-herb-chicken-bowl.png','Berry almond overnight oats','Maya Bennett','published','2026-08-24',10,0,2,365,18,46,13,array['Refrigerate at least four hours.'],'Healthy Berry Almond Overnight Oats','Prep creamy berry almond overnight oats in 10 minutes.',false),
('One-Pan Turkey Taco Skillet','turkey-taco-skillet','A veggie-loaded, budget-friendly skillet with lean turkey and bold taco flavor.','/images/lemon-herb-chicken-bowl.png','Healthy turkey taco skillet','Maya Bennett','published','2026-08-26',10,20,4,410,37,34,14,array['Use low-sodium beans to control salt.'],'Healthy Turkey Taco Skillet','Easy one-pan turkey taco skillet for a healthy budget dinner.',false),
('Green Goddess Meal Prep Boxes','green-goddess-meal-prep-boxes','Crisp vegetables, grains, eggs, and a creamy herb dressing built for weekday lunches.','/images/lemon-herb-chicken-bowl.png','Green goddess meal prep box','Maya Bennett','published','2026-08-28',15,20,4,430,24,42,18,array['Store dressing separately until serving.'],'Green Goddess Meal Prep Boxes','Fresh green goddess meal prep lunches that last all week.',false)
on conflict (slug) do update set title=excluded.title, short_description=excluded.short_description, seo_title=excluded.seo_title, meta_description=excluded.meta_description;

insert into public.recipe_categories (recipe_id,category_id,is_primary)
select r.id,c.id,true from public.recipes r join public.categories c on c.slug = case r.slug
 when 'lemon-herb-chicken-quinoa-bowls' then 'high-protein' when 'crispy-air-fryer-chicken-bites' then 'air-fryer'
 when 'mediterranean-chickpea-salad' then 'quick-dinners' when 'berry-almond-overnight-oats' then 'healthy-breakfasts'
 when 'turkey-taco-skillet' then 'budget-meals' else 'meal-prep' end
where r.slug in ('lemon-herb-chicken-quinoa-bowls','crispy-air-fryer-chicken-bites','mediterranean-chickpea-salad','berry-almond-overnight-oats','turkey-taco-skillet','green-goddess-meal-prep-boxes')
on conflict (recipe_id,category_id) do update set is_primary=true;

insert into public.ingredients (recipe_id,display_text,sort_order)
select r.id,v.text,v.ord from public.recipes r cross join lateral (values
 ('1 ½ lb main protein or 2 cans chickpeas',0),('1 cup whole grain, rinsed',1),('4 cups fresh vegetables',2),('2 tbsp extra-virgin olive oil',3),('Fresh herbs, salt, and pepper',4)
) v(text,ord) where r.slug in ('lemon-herb-chicken-quinoa-bowls','crispy-air-fryer-chicken-bites','mediterranean-chickpea-salad','berry-almond-overnight-oats','turkey-taco-skillet','green-goddess-meal-prep-boxes')
on conflict (recipe_id,sort_order) do update set display_text=excluded.display_text;

insert into public.recipe_steps (recipe_id,instruction,sort_order)
select r.id,v.text,v.ord from public.recipes r cross join lateral (values
 ('Prepare and measure all ingredients.',0),('Cook the main ingredients until safely done and tender.',1),('Divide among serving bowls and finish with herbs.',2)
) v(text,ord) where r.slug in ('lemon-herb-chicken-quinoa-bowls','crispy-air-fryer-chicken-bites','mediterranean-chickpea-salad','berry-almond-overnight-oats','turkey-taco-skillet','green-goddess-meal-prep-boxes')
on conflict (recipe_id,sort_order) do update set instruction=excluded.instruction;

insert into public.recipe_faqs (recipe_id,question,answer,sort_order)
select id,'Can I make this ahead?','Yes. Refrigerate in an airtight container and add delicate toppings just before serving.',0 from public.recipes
where slug in ('lemon-herb-chicken-quinoa-bowls','crispy-air-fryer-chicken-bites','mediterranean-chickpea-salad','berry-almond-overnight-oats','turkey-taco-skillet','green-goddess-meal-prep-boxes')
on conflict (recipe_id,sort_order) do update set question=excluded.question,answer=excluded.answer;
