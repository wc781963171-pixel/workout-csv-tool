	export default function PrivacyPolicy() {
	  return (
	    <div className="min-h-screen bg-gray-950 text-gray-300 py-16 px-4">
	      <div className="max-w-3xl mx-auto">
	        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
	        <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
	        <div className="space-y-6 leading-relaxed">
	          <div>
	            <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
	            <p>When you use our AI Workout Generator, we collect the information you explicitly provide to generate your plan, such as your fitness goal, available equipment, and experience level. We do not collect personal identification information (like name or email) unless you voluntarily provide it via our contact channels.</p>
	          </div>
	          <div>
	            <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
	            <p>The fitness parameters you provide are used solely to generate your customized workout and diet plan via our third-party AI provider. We do not store your generated plans on our servers after the session ends, nor do we use this data for marketing purposes.</p>
	          </div>
	          <div>
	            <h2 className="text-2xl font-semibold text-white mb-3">3. Third-Party Services</h2>
	            <p><strong>AI Processing:</strong> We use Zhipu AI (BigModel) to process your requests and generate content. Your input parameters are sent to their API. Please refer to their privacy policy for their data handling practices.</p>
	            <p className="mt-2"><strong>Analytics:</strong> We use Google Analytics to collect standard internet log information and details of visitor behavior patterns. This helps us understand how the site is being used so we can improve it.</p>
	          </div>
	          <div>
	            <h2 className="text-2xl font-semibold text-white mb-3">4. Cookies</h2>
	            <p>We use cookies and similar tracking technologies primarily through Google Analytics to track website traffic and usage. You can set your browser to refuse all or some browser cookies.</p>
	          </div>
	          <div>
	            <h2 className="text-2xl font-semibold text-white mb-3">5. Contact</h2>
	            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@aiworkingout.top" className="text-indigo-400 hover:underline">support@aiworkingout.top</a>.</p>
	          </div>
	        </div>
	      </div>
	    </div>
	  );
	}