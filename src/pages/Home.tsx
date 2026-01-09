import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Brain, FileText, Languages,Lightbulb, Star, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      title: 'AI Learning Assistant',
      description: 'Get personalized help from our advanced AI tutor. Ask questions, get explanations, and learn at your own pace.',
      benefits: ['24/7 availability', 'Personalized responses', 'Adaptive learning'],
    },
    {
      icon: <FileText className="w-12 h-12 text-red-600" />,
      title: 'Smart Quiz Generator',
      description: 'AI-powered quizzes that adapt to your learning gaps and current skill level. Track progress and improve continuously.',
      benefits: ['Gap-based questions', 'Adaptive difficulty', 'Detailed analytics'],
    },
    {
      icon: <Languages className="w-12 h-12 text-green-600" />,
      title: 'Translation Tools',
      description: 'Break language barriers in education with our AI-powered translation tools for educational content and accessibility.',
      benefits: ['Multiple languages', 'Educational context', 'Quiz translation'],
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Students Helped' },
    { number: '50+', label: 'Subjects Covered' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'AI Support' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'High School Student',
      avatar: 'SJ',
      content: 'EduAgent helped me understand complex math concepts that I struggled with for months. The AI assistant is like having a personal tutor!',
      rating: 5,
    },
    {
      name: 'Dr. Michael Chen',
      role: 'University Professor',
      avatar: 'MC',
      content: 'As an educator, I\'m impressed by how well this platform adapts to different learning styles and provides comprehensive support.',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'Language Learner',
      avatar: 'ER',
      content: 'The translation tools made learning a new language so much easier. I can now access educational content in multiple languages.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-blue-500/5 z-50">
        <div className="w-full px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center group cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300">
                  <GraduationCap className="w-6 h-6 text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  EduAgent
                </span>
                <div className="text-xs text-gray-500 font-medium">AI-Powered Learning</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2.5 text-gray-700 hover:text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-all duration-300 hover:shadow-md"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-black font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
                >
                  Get Started Free
                </button>
              </div>
              <div className="text-center">
                <button
                  onClick={() => navigate('/admin/login')}
                  className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline transition-all"
                >
                  Administrator Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add padding for fixed header */}
      <div className="pt-24">
        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 via-purple-700 to-blue-800">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          {/* Floating Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-float"></div>
            <div className="absolute top-40 right-32 w-6 h-6 bg-yellow-300/30 rounded-lg rotate-45 animate-float-delayed"></div>
            <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-pink-300/25 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-20 w-5 h-5 bg-cyan-300/20 rounded-lg animate-float-delayed"></div>
          </div>

          {/* ORIGINAL WITH GAPS: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 */}
          {/* FULL WIDTH (no max-width constraint): w-full px-4 sm:px-6 lg:px-8 py-24 lg:py-32 */}
          {/* FULL WIDTH NO PADDING: w-full py-24 lg:py-32 */}
          <div className="w-full px-4 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-black mb-6 border border-white/20">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  SDG 4 Quality Education Initiative
                </div>

                <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-8 animate-fade-in-up">
                  <span className="block text-black">AI-Powered</span>
                  <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient">
                    Education for
                  </span>
                  <span className="block text-black">Everyone</span>
                </h1>

                <p className="text-xl lg:text-2xl text-blue-100 mb-10 leading-relaxed font-light animate-fade-in-up animation-delay-200">
                  Unlock your potential with personalized AI learning assistants, smart quiz generators, and multilingual educational tools. Transform education with cutting-edge technology.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
                  <button
                    onClick={() => navigate('/register')}
                    className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-2xl hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/40 flex items-center justify-center gap-3"
                  >
                    <span>Start Learning Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 border-2 border-white/30 text-black font-semibold rounded-2xl hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
                  >
                    Sign In to Continue
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-6 mt-12 animate-fade-in-up animation-delay-600">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-black">
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="text-black/80">
                    <div className="font-semibold">10,000+ Students</div>
                    <div className="text-sm">Trust EduAgent for their learning journey</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                {/* Main Visual */}
                <div className="relative mx-auto w-96 h-96">
                  {/* Central AI Brain */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl flex items-center justify-center animate-float">
                      <div className="w-48 h-48 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full flex items-center justify-center">
                        <Brain className="w-32 h-32 text-black animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Orbiting Elements */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Lightbulb className="w-6 h-6 text-black" />
                    </div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <FileText className="w-6 h-6 text-black" />
                    </div>
                    <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <Languages className="w-6 h-6 text-black" />
                    </div>
                    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-6 h-6 text-black" />
                    </div>
                  </div>

                  {/* Floating Achievement Badges */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
                    95% Success Rate
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-blue-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce animation-delay-1000">
                    50+ Subjects
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-gray-50">
          <div className="w-full px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2364b5f6' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0 11-9 20-20 20s-20-9-20-20 9-20 20-20 20 9 20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="w-full px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                🚀 Advanced AI Technology
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                Powerful AI Features for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Quality Education
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Our AI-powered platform combines cutting-edge technology with educational excellence to provide personalized learning experiences that adapt to every student's unique needs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    {/* Icon with Glow Effect */}
                    <div className="mb-8 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
                        {React.cloneElement(feature.icon, { className: "w-10 h-10 text-black" })}
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      {feature.description}
                    </p>

                    {/* Enhanced Benefits */}
                    <div className="space-y-3 mb-8">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-black" />
                          </div>
                          <span className="font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => navigate('/register')}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-black py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center gap-2"
                    >
                      <span>Try It Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SDG 4 Section */}
        <div className="py-20 bg-gray-50">
          <div className="w-full px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Contributing to SDG 4:
                  <span className="text-blue-600"> Quality Education</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  EduAgent is committed to achieving Sustainable Development Goal 4 by ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all.
                </p>
                <div className="space-y-3">
                  {[
                    'Inclusive and accessible education for everyone',
                    'Personalized learning experiences',
                    'Multilingual educational support',
                    'AI-powered educational equity',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="bg-yellow-500 text-black p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    To democratize quality education through artificial intelligence, breaking down barriers and providing personalized learning experiences that adapt to every student's unique needs and circumstances.
                  </p>
                  <button
                    onClick={() => navigate('/register')}
                    className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Join Our Mission
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Testimonials Section */}
        <div className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-indigo-200/15 to-pink-200/15 rounded-full blur-3xl"></div>
          </div>

          <div className="w-full px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-800 rounded-full text-sm font-semibold mb-6 border border-yellow-200">
                ⭐ Loved by Students Worldwide
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                What Our
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {" "}Users Say
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of learners who have transformed their educational journey with EduAgent's AI-powered learning platform.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                >
                  {/* Quote Mark */}
                  <div className="absolute top-6 left-6 text-6xl text-blue-100 font-serif leading-none">"</div>

                  {/* Rating Stars */}
                  <div className="flex mb-6 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 mb-8 italic leading-relaxed text-lg relative z-10 pl-6">
                    {testimonial.content}
                  </p>

                  {/* Author */}
                  <div className="flex items-center relative z-10">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-black rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300">
                        {testimonial.avatar}
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 font-medium">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-6 right-6 w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-600">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-green-600">24/7</div>
                  <div className="text-sm text-gray-600">AI Support</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-purple-600">50+</div>
                  <div className="text-sm text-gray-600">Subjects</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"></div>
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-300/10 rounded-full blur-xl animate-pulse delay-500"></div>
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-black text-sm font-semibold mb-8 border border-white/20">
              🎯 Start Your Learning Journey Today
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-black mb-6 leading-tight">
              Ready to Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 animate-gradient">
                Learning Experience?
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join EduAgent today and discover the power of AI-driven personalized education. Unlock your potential with cutting-edge technology designed for SDG 4 Quality Education.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button
                onClick={() => navigate('/register')}
                className="group px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-2xl hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/40 flex items-center justify-center gap-3"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-10 py-4 border-2 border-white/40 text-black font-semibold rounded-2xl hover:bg-white/10 hover:border-white/60 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>Sign In to Continue</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-8 text-black/80">
              <div className="flex -space-x-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white/20 flex items-center justify-center text-xs font-bold text-black">
                    {String.fromCharCode(65 + i - 1)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-bold text-black text-lg">Join 10,000+ Learners</div>
                <div className="text-sm text-blue-100">Already transforming education worldwide</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-black relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>

          <div className="w-full px-4 py-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
              {/* Brand Section */}
              <div className="md:col-span-4">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <GraduationCap className="w-7 h-7 text-black" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
                  </div>
                  <div className="ml-3">
                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      EduAgent
                    </span>
                    <div className="text-sm text-gray-400">AI-Powered Learning</div>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  AI-powered education for SDG 4 Quality Education. Empowering learners worldwide with personalized, accessible, and inclusive educational experiences.
                </p>

                {/* Social Links */}
                <div className="flex gap-4">
                  {['Twitter', 'LinkedIn', 'GitHub'].map(platform => (
                    <button
                      key={platform}
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <span className="text-gray-400 text-sm font-bold">
                        {platform.charAt(0)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold mb-6 text-black">Platform</h4>
                <div className="space-y-3">
                  {[
                    { name: 'AI Learning Assistant', action: () => navigate('/register') },
                    { name: 'Quiz Generator', action: () => navigate('/register') },
                    { name: 'Translation Tools', action: () => navigate('/register') },
                    { name: 'Dashboard', action: () => navigate('/login') }
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={item.action}
                      className="block text-gray-400 hover:text-black transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold mb-6 text-black">Company</h4>
                <div className="space-y-3">
                  {['About Us', 'Careers', 'Press', 'Blog'].map((item) => (
                    <button
                      key={item}
                      className="block text-gray-400 hover:text-black transition-colors text-left"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold mb-6 text-black">Support</h4>
                <div className="space-y-3">
                  <a href="mailto:support@eduagent.com" className="block text-gray-400 hover:text-black transition-colors">
                    support@eduagent.com
                  </a>
                  <button className="block text-gray-400 hover:text-black transition-colors text-left">
                    Help Center
                  </button>
                  <button className="block text-gray-400 hover:text-black transition-colors text-left">
                    Documentation
                  </button>
                  <button className="block text-gray-400 hover:text-black transition-colors text-left">
                    Community
                  </button>
                </div>
              </div>

              {/* Newsletter */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold mb-6 text-black">Stay Updated</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Get the latest updates on AI education and new features.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <button className="px-4 py-2 bg-yellow-500 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <span>© 2024 EduAgent. All rights reserved.</span>
                  <button className="hover:text-black transition-colors">Privacy Policy</button>
                  <button className="hover:text-black transition-colors">Terms of Service</button>
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-sm">Made with</span>
                  <span className="text-red-500 animate-pulse">❤️</span>
                  <span className="text-sm">for SDG 4 Quality Education</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
