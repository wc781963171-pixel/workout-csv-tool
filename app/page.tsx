	'use client';
	import { useState } from 'react';
	import Papa from 'papaparse';
	import { saveAs } from 'file-saver';
	export default function Home() {
	  const [goal, setGoal] = useState('Muscle Gain');
	  const [equipment, setEquipment] = useState('Full Gym');
	  const [experience, setExperience] = useState('Beginner');
	  // 删除了无用的 format 状态
	  const [loading, setLoading] = useState(false);
	  const [workoutData, setWorkoutData] = useState<string[][]>([]);
	  const [dietData, setDietData] = useState<string[][]>([]);
	  const [rawCsv, setRawCsv] = useState('');
	  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	  const handleGenerate = async (e: React.FormEvent) => {
	    e.preventDefault();
	    setLoading(true);
	    setWorkoutData([]);
	    setDietData([]);
	    try {
	      const res = await fetch('/api/generate', {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({ goal, equipment, experience })
	      });
	      if (!res.ok) throw new Error('Network response was not ok');
	      const data = await res.json();
	      const csvText = data.csv;
	      setRawCsv(csvText);
	      const parsed = Papa.parse(csvText, { header: false });
	      const rows = (parsed.data as string[][]).filter(row => row.some(cell => cell.trim() !== ''));
	      const workoutRows = rows
	        .filter(row => row[0]?.toLowerCase() === 'workout')
	        .map(row => [row[1], row[3], row[4], row[5], row[6], row[7]]);
	      const dietRows = rows
	        .filter(row => row[0]?.toLowerCase() === 'diet')
	        .map(row => [row[1], row[2], row[3], row[4], row[5], row[6], row[7]])
	        .sort((a, b) => {
	          const dayA = dayOrder.indexOf(a[1]);
	          const dayB = dayOrder.indexOf(b[1]);
	          return dayA - dayB;
	        });
	      setWorkoutData(workoutRows);
	      setDietData(dietRows);
	    } catch (err) {
	      console.error(err);
	      alert('Generation failed. Please try again.');
	    } finally {
	      setLoading(false);
	    }
	  };
	  const handleDownload = () => {
	    const blob = new Blob([rawCsv], { type: 'text/csv;charset=utf-8' });
	    const fileName = `${goal}_${equipment}_Plan.csv`;
	    saveAs(blob, fileName);
	  };
	  const workoutHeaders = ['Muscle Group', 'Exercise', 'Sets', 'Reps', 'Rest', 'Pro Tip'];
	  // 饮食表头去掉了 Day，因为我们要按天分组展示
	  const dietHeaders = ['Meal', 'Food / Recipe', 'Portion', 'Calories', 'Macros (P/C/F)', 'Dietary Tip'];
	  // 通用表格渲染器
	  const renderTable = (headers: string[], data: string[][]) => (
	    <div className="overflow-x-auto rounded-lg border border-gray-700">
	      <table className="w-full text-left border-collapse">
	        <thead>
	          <tr className="bg-gray-800 text-indigo-400">
	            {headers.map((h, i) => <th key={i} className="p-3 font-semibold whitespace-nowrap">{h}</th>)}
	          </tr>
	        </thead>
	        <tbody>
	          {data.map((row, i) => (
	            <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
	              {row.map((cell, j) => (
	                <td key={j} className="p-3 text-gray-300 whitespace-nowrap">{cell}</td>
	              ))}
	            </tr>
	          ))}
	        </tbody>
	      </table>
	    </div>
	  );
	  // 将饮食数据按天分组
	  const groupedDietData = dietData.reduce((acc, row) => {
	    const day = row[1]; // Day 在索引 1 的位置
	    if (!acc[day]) acc[day] = [];
	    acc[day].push(row);
	    return acc;
	  }, {} as Record<string, string[][]>);
	  return (
	    <main className="min-h-screen bg-gray-950 text-gray-100 font-sans">
	      {/* Hero 区域 */}
	      <section className="flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">
	        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
	          AI Workout Generator to CSV
	        </h1>
	        <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10">
	          Stop paying for fitness apps. Get a professional, customized training and diet plan delivered in a clean CSV file. Ready for Notion, Excel, or Google Sheets in seconds.
	        </p>
	        <a href="#tool" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-lg transition duration-300 shadow-lg shadow-indigo-500/50">
	          Generate My Plan - Free
	        </a>
	      </section>
	      {/* 表单区域 - 修改了移动端 Padding */}
	      <section id="tool" className="max-w-5xl mx-auto py-16 px-4">
	        <form onSubmit={handleGenerate} className="bg-gray-900 p-4 md:p-8 rounded-xl border border-gray-800 shadow-2xl space-y-6">
	          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
	            <div>
	              <label className="block text-sm font-medium text-gray-300 mb-2">Fitness Goal</label>
	              <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-indigo-500 focus:border-indigo-500">
	                <option>Muscle Gain</option>
	                <option>Fat Loss</option>
	                <option>Powerlifting</option>
	              </select>
	            </div>
	            <div>
	              <label className="block text-sm font-medium text-gray-300 mb-2">Equipment</label>
	              <select value={equipment} onChange={e => setEquipment(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-indigo-500 focus:border-indigo-500">
	                <option>Full Gym</option>
	                <option>Dumbbells Only</option>
	                <option>Bodyweight</option>
	              </select>
	            </div>
	          </div>
	          <div>
	            <label className="block text-sm font-medium text-gray-300 mb-2">Experience</label>
	            <div className="flex gap-4">
	              {['Beginner', 'Intermediate', 'Advanced'].map(exp => (
	                <label key={exp} className="flex items-center space-x-2 cursor-pointer">
	                  <input type="radio" name="experience" value={exp} checked={experience === exp} onChange={e => setExperience(e.target.value)} className="text-indigo-600 focus:ring-indigo-500" />
	                  <span>{exp}</span>
	                </label>
	              ))}
	            </div>
	          </div>
	          {/* 删除了 Output Format 单选框 */}
	          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 text-white font-bold py-4 rounded-lg transition duration-300 mt-4 flex items-center justify-center gap-2">
	            {loading ? (
	              <>
	                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
	                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
	                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
	                </svg>
	                <span>AI is calculating optimal intensity...</span>
	              </>
	            ) : 'Generate AI Workout Plan'}
	          </button>
	        </form>
	        {/* 结果展示区域 */}
	        {(workoutData.length > 0 || dietData.length > 0) && (
	          <div className="mt-10 space-y-8">
	            <div className="flex justify-end">
	              <button onClick={handleDownload} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-lg">
	                Download .csv
	              </button>
	            </div>
	            {workoutData.length > 0 && (
	              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
	                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
	                  <span className="w-3 h-3 bg-indigo-500 rounded-full"></span> Workout Plan
	                </h3>
	                {renderTable(workoutHeaders, workoutData)}
	              </div>
	            )}
	            {dietData.length > 0 && (
	              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
	                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
	                  <span className="w-3 h-3 bg-green-500 rounded-full"></span> Diet Plan
	                </h3>
	                {/* 按天分组渲染饮食卡片 */}
	                <div className="space-y-6">
	                  {Object.entries(groupedDietData).map(([day, rows]) => (
	                    <div key={day}>
	                      <h4 className="text-xl font-bold text-green-400 mb-3 border-b border-gray-700 pb-2">{day}</h4>
	                      {/* 渲染表格时，剔除数据中的 Day 列 (row[1])，因为标题已经有了 */}
	                      {renderTable(dietHeaders, rows.map(row => [row[0], ...row.slice(2)]))}
	                    </div>
	                  ))}
	                </div>
	              </div>
	            )}
	          </div>
	        )}
	      </section>
	    </main>
	  );
	}