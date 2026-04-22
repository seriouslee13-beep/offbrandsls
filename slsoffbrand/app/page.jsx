"use client";

import React, { useState } from 'react';
import { CheckCircle, Circle, ChevronRight, ChevronLeft } from 'lucide-react';

const SLSTemplate = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const [completedSteps, setCompletedSteps] = useState([]); // Track checkmarks
  const [quizAnswer, setQuizAnswer] = useState(() => {
    // This looks for saved text in the browser memory on load
    if (typeof window !== 'undefined') {
      return localStorage.getItem('student-answer') || "";
    }
    return "";
  });

  // Example Lesson Data
  const lessonData = [
    { title: "Introduction", type: "video", content: "Watch the briefing video below." },
    { title: "Key Concepts", type: "text", content: "Read the notes on Newton's Laws." },
    { title: "Check for Understanding", type: "quiz", content: "Answer the following questions." }
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-bold text-lg text-blue-900">Physics 101</h2>
          <p className="text-xs text-slate-500 uppercase tracking-wider">Lesson Package</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          {lessonData.map((step, index) => (
            <button 
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                currentStep === index ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              {index < currentStep ? (
                <CheckCircle size={18} className="text-green-500" />
              ) : (
                <Circle size={18} className={currentStep === index ? "text-blue-600" : "text-slate-300"} />
              )}
              <span className="text-sm font-medium">{step.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <span className="text-sm text-slate-500">Activity {currentStep + 1} of {lessonData.length}</span>
          <div className="flex gap-2">
            <button 
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="p-2 border rounded hover:bg-gray-50 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              disabled={currentStep === lessonData.length - 1}
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-12">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h1 className="text-2xl font-bold mb-4">{lessonData[currentStep].title}</h1>
            <p className="text-slate-600 leading-relaxed">
              {lessonData[currentStep].content}
            </p>
            
            {/* Conditional Rendering based on Activity Type */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              {lessonData[currentStep].type === 'video' && (
                <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                  <span className="text-slate-500 italic">Video Player Component</span>
                </div>
              )}
              {lessonData[currentStep].type === 'quiz' && (
                <textarea 
                  className="w-full p-4 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Type your answer here..."
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SLSTemplate;