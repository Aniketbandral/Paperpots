import { Link } from 'react-router-dom';
import teamImage from '../assets/rb_2151363349.png';

function Home() {
  return (
    <div className="relative container mx-auto px-4 pt-20  bg-black text-gray-300 min-h-screen overflow-hidden">
    {/* Gradient overlays */}
    <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full filter blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full filter blur-3xl"></div>
    
    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Left Side - Hero Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
        <div className="mb-8 w-full max-w-md backdrop-blur-sm"> 
          <img 
            src={teamImage}
            alt="Study Illustration"
            className="w-full h-auto object-contain rounded-lg shadow-xl" 
          />
        </div>
        <h1 className="text-6xl font-bold mb-6 text-center text-white leading-tight">
          PaperPot
        </h1>
        <p className="text-2xl mb-8 text-center text-gray-400 max-w-xl">
          Your One-Stop Hub for Old Exam Papers, Notes, and Instant Chatbot Support!
        </p>
      </div>

        {/* Right Side - Cards */}
        <div className="w-full lg:w-1/2">
          <div className="grid gap-8 max-w-lg mx-auto">
            {[
              {
                to: '/papers',
                iconColor: 'text-blue-400',
                title: 'Exam Papers',
                description: 'Access previous year question papers',
              },
              {
                to: '/notes',
                iconColor: 'text-purple-400',
                title: 'Exam Notes',
                description: 'Study materials and notes',
              },
              {
                to: '/chat',
                iconColor: 'text-green-400',
                title: 'Chat with AI',
                description: 'Get instant help with your queries',
              },
            ].map((card, index) => (
              <Link 
                key={index} 
                to={card.to} 
                className="rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-gray-600"
              >
                <div className="flex items-center gap-6 p-8">
                  <div className={`p-4 bg-black/40 rounded-xl ${card.iconColor}`}>
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-lg">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;