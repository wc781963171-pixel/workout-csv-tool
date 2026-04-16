import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { goal, equipment, experience } = await request.json();

  const prompt = `Act as a top-tier personal trainer and sports nutritionist. Create a comprehensive workout and diet plan for a user with the goal of ${goal}, using ${equipment}, at an ${experience} level.

Output ONLY a valid CSV structure. Columns must be exactly in this order: Type,Category,Day,Item,Metric1,Metric2,Metric3,Note

CRITICAL RULES:
1. RANGES: You MUST use the tilde symbol (~) for ANY numerical ranges (e.g., 3~4 sets, 8~12 reps, 60~90s rest). NEVER use hyphens for ranges.
2. UNITS: Use lbs for weight and inches where applicable. Use 's' for seconds (e.g., 90s). 
3. NO HALLUCINATIONS: Do NOT output any unrelated text (e.g., markdown tags, or conversational filler).
4. LANGUAGE: Output in native, professional English only.

For Workout rows (Type = Workout):
- Category: Target muscle group. Output in this exact order: Chest, Shoulders, Back, Legs, Arms, Core, Functional.
- Day: Leave this completely empty for workouts.
- Item: Exercise name (e.g., Barbell Bench Press)
- Metric1: Sets (e.g., 3~4)
- Metric2: Reps (e.g., 8~12)
- Metric3: Rest (e.g., 60~90s)
- Note: Form tip (e.g., Retract scapula)

For Diet rows (Type = Diet):
- Category: Meal type (Breakfast, Lunch, Dinner, Snack)
- Day: Day of the week (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday). You MUST provide a full 7-day cycle.
- Item: Food description (e.g., Grilled Chicken Breast)
- Metric1: Portion size (e.g., 6~8 oz)
- Metric2: Estimated Calories (e.g., 300~400 kcal)
- Metric3: Macros P/C/F in grams (e.g., 40g/10g/5g)
- Note: Dietary tip (e.g., Good lean protein source)
- OUTPUT ORDER: You MUST output diet rows grouped by Day first (Monday -> Sunday), then by Meal (Breakfast -> Lunch -> Dinner -> Snack).`;

  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`
      },
      body: JSON.stringify({
        model: 'glm-4-flash',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
      })
    });

    const data = await response.json();
    let csvText = data.choices[0].message.content.trim();
    
    // 容错处理：清洗 Markdown 代码块
    if (csvText.startsWith('```csv')) {
      csvText = csvText.replace(/^```csv\n/, '').replace(/\n```$/, '');
    } else if (csvText.startsWith('```')) {
      csvText = csvText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    return NextResponse.json({ csv: csvText });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate workout' }, { status: 500 });
  }
}