import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  UploadCloud, 
  FileText, 
  X, 
  Briefcase, 
  User, 
  Sparkles, 
  CheckCircle, 
  Loader2, 
  ArrowRight, 
  Trash2, 
  Clipboard, 
  FileCode,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import api from '@/Config/api';
import { toast } from 'sonner';

const JobPreperation = () => {
  // Form State
  const [selfDescription, setSelfDescription] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [profileType, setProfileType] = useState('resume'); // 'resume' | 'description'
  
  // UI States
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Refs for Animations
  const mainCardRef = useRef(null);
  const submitBtnRef = useRef(null);
  const glowOrbRef = useRef(null);
  const titleRef = useRef(null);
  const typewriterIntervalRef = useRef(null);

  // Floating cursor orb interaction and general cleanup
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowOrbRef.current) {
        gsap.to(glowOrbRef.current, {
          x: e.clientX - 150,
          y: e.clientY - 150,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (typewriterIntervalRef.current) {
        clearInterval(typewriterIntervalRef.current);
      }
    };
  }, []);

  // Title entrance animation using GSAP
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current.querySelectorAll('.animate-text-reveal'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
    
    tl.fromTo(
      mainCardRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.4'
    );
  }, []);

  // Magnetic Button Effect using GSAP
  const handleButtonMouseMove = (e) => {
    const btn = submitBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleButtonMouseLeave = () => {
    const btn = submitBtnRef.current;
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  // Drag-and-drop resume handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file) => {
    // Basic validation: PDF only
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      toast.error('Only PDF documents are supported.');
      return;
    }

    // Size check: Max 5MB (5 * 1024 * 1024 bytes)
    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast.error('File size exceeds the 5MB limit. Please upload a smaller PDF.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate uploader visual uploader state
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setResumeFile(file);
          setIsUploading(false);
        }, 300);
      }
    }, 80);
  };

  // Typewriter effect to fill sample self description
  const fillSampleSelfDescription = () => {
    if (typewriterIntervalRef.current) {
      clearInterval(typewriterIntervalRef.current);
    }
    
    const sampleText = "I am a Frontend Developer with 2.5 years of experience specialized in React, Next.js, and CSS animations. I love building responsive, interactive dashboards and have a strong foundation in accessibility and unit testing.";
    
    let currentIdx = 0;
    setSelfDescription('');
    
    typewriterIntervalRef.current = setInterval(() => {
      const char = sampleText[currentIdx];
      setSelfDescription((prev) => prev + char);
      currentIdx++;
      if (currentIdx >= sampleText.length) {
        clearInterval(typewriterIntervalRef.current);
        typewriterIntervalRef.current = null;
      }
    }, 15);
  };

  // Quick clipboard paste for Job Description
  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setJobDescription(text);
      }
    } catch (err) {
      console.warn("Clipboard access denied or unavailable", err);
    }
  };

  // Submission flow
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasProfile = profileType === 'resume' ? !!resumeFile : !!selfDescription;
    if (!jobDescription || !hasProfile) {
      toast.warning('Please fill out the required profile field and job description.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('jobDescription', jobDescription);
      
      if (profileType === 'resume') {
        if (resumeFile) {
          formData.append('resume', resumeFile);
        }
      } else {
        formData.append('selfDescription', selfDescription);
      }
      
      // Make the actual API call to the backend
      const response = await api.post('/api/interview/generate-report', formData);
      // console.log(response.data.interviewReport.success)
      console.log('Success: Report generated!', response.data);
            
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-900">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      {/* Floating Glowing Aura following cursor */}
      <div 
        ref={glowOrbRef}
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-violet-300/40 to-indigo-300/40 blur-[100px] pointer-events-none select-none z-0"
        style={{ left: 0, top: 0 }}
      />

      {/* Top Banner Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[200px] bg-gradient-to-b from-indigo-200/50 to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 py-6 md:py-8 relative z-10 max-w-6xl">
        
        {/* Header Section */}
        <header ref={titleRef} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[11px] font-medium mb-3 backdrop-blur-md animate-text-reveal opacity-0">
            <Sparkles className="size-3 text-indigo-500" />
            Job Preparation
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 mb-2 select-none leading-tight">
            <span className="animate-text-reveal opacity-0 inline-block">AI</span>{' '}
            <span className="animate-text-reveal opacity-0 inline-block bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">Interview Coach</span>
          </h1>
          
          <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed animate-text-reveal opacity-0">
            Upload your resume and the target job description. Our AI will generate tailored questions and a comprehensive preparation blueprint for your next role.
          </p>
        </header>

        {/* Main Content Area */}
        <div ref={mainCardRef} className="opacity-0">
          <Card className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl overflow-hidden">
            
            <div className="bg-gradient-to-r from-indigo-50 via-violet-50 to-transparent p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                  <Briefcase className="size-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Setup Interview Session</h2>
                  <p className="text-xs text-slate-500">Fill in the inputs below to start generating customized reports</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 2-Column Responsive Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Left Column: Candidate Profile Selector & Inputs */}
                  <div className="space-y-6 flex flex-col">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <User className="size-4 text-indigo-500" />
                        Candidate Profile Details
                      </label>
                      <p className="text-xs text-slate-500">Choose how you want to provide your profile information</p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="relative flex p-1 bg-slate-100 border border-slate-200 rounded-xl w-full">
                      <button
                        type="button"
                        onClick={() => setProfileType('resume')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all relative z-10 ${
                          profileType === 'resume' ? 'text-indigo-700 font-bold' : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {profileType === 'resume' && (
                          <motion.div
                            layoutId="activeProfileTab"
                            className="absolute inset-0 bg-white border border-slate-200 rounded-lg -z-10 shadow-sm"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        <FileText className="size-3.5" />
                        Upload Resume
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfileType('description')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all relative z-10 ${
                          profileType === 'description' ? 'text-indigo-700 font-bold' : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {profileType === 'description' && (
                          <motion.div
                            layoutId="activeProfileTab"
                            className="absolute inset-0 bg-white border border-slate-200 rounded-lg -z-10 shadow-sm"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        <User className="size-3.5" />
                        Write Self Description
                      </button>
                    </div>

                    {/* Dynamic Profile Input rendering */}
                    <div className="flex-1 flex flex-col">
                      <AnimatePresence mode="wait">
                        {profileType === 'resume' ? (
                          <motion.div
                            key="resume-uploader"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 flex flex-col h-full"
                          >
                            <div
                              onDragEnter={handleDrag}
                              onDragOver={handleDrag}
                              onDragLeave={handleDrag}
                              onDrop={handleDrop}
                              className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-300 min-h-[280px] h-full relative overflow-hidden ${
                                !resumeFile && !isUploading ? 'cursor-pointer' : ''
                              } ${
                                dragActive 
                                  ? 'border-indigo-400 bg-indigo-50 scale-[0.99]' 
                                  : 'border-slate-300 bg-slate-50 hover:border-indigo-300 hover:bg-slate-100'
                              }`}
                            >
                              {/* Interactive Drag background pulse */}
                              <AnimatePresence>
                                {dragActive && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-violet-50 pointer-events-none"
                                  />
                                )}
                              </AnimatePresence>

                              <input
                                type="file"
                                id="resume-upload"
                                className="hidden"
                                accept=".pdf"
                                onChange={handleFileChange}
                              />

                              {!resumeFile && !isUploading && (
                                <label htmlFor="resume-upload" className="space-y-4 relative z-10 cursor-pointer w-full h-full flex flex-col items-center justify-center py-8">
                                  <div className="mx-auto w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-indigo-500 shadow-sm">
                                    <UploadCloud className="size-7" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-slate-700">
                                      Drag & drop your resume here, or{' '}
                                      <span className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors underline">
                                        browse
                                      </span>
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1.5">Supports PDF up to 5MB</p>
                                  </div>
                                </label>
                              )}

                              {/* Uploading Simulation State */}
                              {isUploading && (
                                <div className="space-y-4 relative z-10 w-full max-w-[240px]">
                                  <Loader2 className="size-8 text-indigo-600 animate-spin mx-auto" />
                                  <div className="space-y-1">
                                    <p className="text-xs font-semibold text-slate-600">Uploading File...</p>
                                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden border border-slate-300">
                                      <motion.div 
                                        className="bg-indigo-600 h-full rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress}%` }}
                                        transition={{ ease: 'easeOut' }}
                                      />
                                    </div>
                                    <span className="text-[10px] text-slate-500">{uploadProgress}%</span>
                                  </div>
                                </div>
                              )}

                              {/* File Uploaded Details Card */}
                              {resumeFile && !isUploading && (
                                <motion.div 
                                  initial={{ scale: 0.95, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="w-full bg-white border border-slate-200 rounded-lg p-5 flex flex-col items-center space-y-4 shadow-sm relative z-10"
                                >
                                  <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                                    <FileText className="size-6" />
                                  </div>

                                  <div className="text-center w-full min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 truncate px-2">{resumeFile.name}</p>
                                    <p className="text-xs text-slate-500 mt-1">{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                                  </div>

                                  <div className="flex gap-2 w-full pt-2">
                                    <Button 
                                      type="button" 
                                      variant="outline" 
                                      onClick={() => setResumeFile(null)}
                                      className="flex-1 bg-transparent hover:bg-red-50 border-slate-200 hover:border-red-200 hover:text-red-600 transition-colors text-xs font-medium h-9"
                                    >
                                      <Trash2 className="size-3.5 mr-1" />
                                      Remove
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="self-description"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-2 group w-full flex-1 flex flex-col h-full"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-xs font-medium text-slate-500">
                                Tell us about your background
                              </label>
                              <button
                                type="button"
                                onClick={fillSampleSelfDescription}
                                className="text-xs text-indigo-600 hover:text-indigo-500 transition-colors flex items-center gap-1 group-hover:underline font-semibold"
                              >
                                <Sparkles className="size-3" />
                                Fill Sample
                              </button>
                            </div>
                            
                            <div className="relative rounded-lg overflow-hidden border border-slate-300 bg-white focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-300 flex-1 flex flex-col min-h-[280px] h-full shadow-sm">
                              <textarea
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                placeholder="Tell us about yourself, your tech stack, projects, and achievements..."
                                className="w-full flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 p-4 resize-none outline-none border-none focus:ring-0 min-h-[220px] h-full"
                                maxLength={1000}
                              />
                              <div className="absolute bottom-2 right-3 flex items-center gap-2 pointer-events-none select-none text-[10px] text-slate-400">
                                <span>{selfDescription.length}/1000</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Right Column: Job Description */}
                  <div className="space-y-6 flex flex-col h-full">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <Briefcase className="size-4 text-indigo-500" />
                        Target Job Description
                      </label>
                      <p className="text-xs text-slate-500">Provide details about the role you are preparing for</p>
                    </div>

                    <div className="space-y-2 group flex-1 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-slate-500">
                          Paste requirements, responsibilities or job post
                        </label>
                        <button
                          type="button"
                          onClick={pasteFromClipboard}
                          className="text-xs text-indigo-600 hover:text-indigo-500 transition-colors flex items-center gap-1 group-hover:underline font-semibold"
                        >
                          <Clipboard className="size-3" />
                          Paste Text
                        </button>
                      </div>

                      <div className="relative rounded-lg overflow-hidden border border-slate-300 bg-white focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-300 flex-1 flex flex-col min-h-[280px] h-full shadow-sm">
                        <textarea
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Paste the target job description here..."
                          className="w-full flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 p-4 resize-none outline-none border-none focus:ring-0 min-h-[220px] h-full"
                        />
                        <div className="absolute bottom-2 right-3 flex items-center gap-2 pointer-events-none select-none text-[10px] text-slate-400">
                          <span>{jobDescription.split(/\s+/).filter(Boolean).length} words</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Submit Section */}
                <div className="flex flex-col items-center justify-center pt-6 border-t border-slate-100 relative">
                  
                  {/* Magnetic Button Container wrapper */}
                  <div className="w-full max-w-md h-24 flex items-center justify-center">
                    <button
                      ref={submitBtnRef}
                      type="submit"
                      disabled={
                        isSubmitting || 
                        !jobDescription || 
                        (profileType === 'resume' ? !resumeFile : !selfDescription)
                      }
                      onMouseMove={handleButtonMouseMove}
                      onMouseLeave={handleButtonMouseLeave}
                      className="w-full h-14 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden select-none active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none" />
                      
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          <span>Preparing Interview Coaching...</span>
                        </>
                      ) : (
                        <>
                          <span>Generate Interview Blueprint</span>
                          <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </form>
            </CardContent>
          </Card>
        </div>

        {/* Info Grid for added aesthetics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center md:text-left">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 mx-auto md:mx-0">
              <Sparkles className="size-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">Self Assessment Alignment</h3>
            <p className="text-xs text-slate-500 leading-relaxed">AI assesses your description and projects to extract core behavioral strengths and competencies.</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 mb-4 mx-auto md:mx-0">
              <FileText className="size-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">Structured Resume parsing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Upload your resume in PDF format. It maps your historical skills against modern industry requirements.</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-4 mx-auto md:mx-0">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">Tailored Question bank</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Generates technical and behavioral question sets based on the precise target Job description details.</p>
          </div>
        </section>
      </div>

    </div>
  );
};

export default JobPreperation;