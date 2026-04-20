	export default function About() {
	  return (
	    <div className="min-h-screen bg-gray-950 text-gray-300 py-16 px-4">
	      <div className="max-w-3xl mx-auto">
	        <h1 className="text-4xl font-bold text-white mb-8">About & Contact</h1>
	        <div className="space-y-6 leading-relaxed">
	          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
	            <h2 className="text-2xl font-semibold text-white mb-3">Why I Built This</h2>
	            <p>Hi there! I built AI Workout to CSV because I was tired of paying monthly subscriptions for fitness apps, only to find that I couldn't export my data or track my progress the way I wanted to.</p>
	            <p className="mt-3">I track everything in <strong className="text-white">Notion</strong>. But manually typing sets, reps, rest times, and macros into a database was a massive headache. I wanted a tool where I could select my goal, get a professional plan, and have it in a clean CSV file ready to import in 10 seconds.</p>
	            <p className="mt-3">So, I built this side project. It uses AI to calculate the optimal intensity and macros based on scientific principles, and outputs a beautifully structured CSV that plays perfectly with Notion, Google Sheets, and Excel.</p>
	            <p className="mt-3">I hope it helps you crush your fitness goals without the friction!</p>
	          </div>
	          <div>
	            <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
	            <p>Have feedback, found a bug, or want to collaborate? I'd love to hear from you.</p>
	            <p className="mt-3">
	              Email: <a href="mailto:support@aiworkingout.top" className="text-indigo-400 hover:underline">support@aiworkingout.top</a>
	            </p>
	          </div>
	        </div>
	      </div>
	    </div>
	  );
	}