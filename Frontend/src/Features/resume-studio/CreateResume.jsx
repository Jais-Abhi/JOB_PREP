import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { toast } from 'sonner';

const STEPS = [
  { id: 'personal', title: 'Personal Info', description: 'Your basic details' },
  { id: 'links', title: 'Social Links', description: 'Professional profiles' },
  { id: 'education', title: 'Education', description: 'Academic qualifications' },
  { id: 'projects', title: 'Projects', description: 'Showcase your work' },
  { id: 'experience', title: 'Experience', description: 'Past roles (Optional)' },
  { id: 'summary', title: 'Summary', description: 'Objective or summary' }
];

const CreateResume = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // State for all form fields
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    github: '',
    linkedin: '',
    leetcode: '',
    gfg: '',
    summary: '',
    education: [{ id: 1, institution: '', degree: '', year: '' }],
    projects: [{ id: 1, title: '', description: '', link: '' }],
    experience: [{ id: 1, company: '', role: '', duration: '', description: '' }]
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (arrayName, id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { id: Date.now(), ...defaultItem }]
    }));
  };

  const removeArrayItem = (arrayName, id) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter(item => item.id !== id)
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Final Resume Data:', formData);
    // TODO: Send to backend or generate PDF
    toast.success("Resume data saved successfully! (Backend integration pending)");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={formData.name} onChange={e => updateField('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => updateField('phone', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="123 Main St, City, Country" value={formData.address} onChange={e => updateField('address', e.target.value)} />
            </div>
          </div>
        );
      
      case 1: // Social Links
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub Link</Label>
                <Input id="github" placeholder="github.com/username" value={formData.github} onChange={e => updateField('github', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Link</Label>
                <Input id="linkedin" placeholder="linkedin.com/in/username" value={formData.linkedin} onChange={e => updateField('linkedin', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leetcode">LeetCode (Optional)</Label>
                <Input id="leetcode" placeholder="leetcode.com/username" value={formData.leetcode} onChange={e => updateField('leetcode', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gfg">GeeksforGeeks (Optional)</Label>
                <Input id="gfg" placeholder="auth.geeksforgeeks.org/user/username" value={formData.gfg} onChange={e => updateField('gfg', e.target.value)} />
              </div>
            </div>
          </div>
        );
      
      case 2: // Education
        return (
          <div className="space-y-6">
            {formData.education.map((edu, index) => (
              <div key={edu.id} className="p-4 border rounded-xl space-y-4 bg-slate-50 relative group">
                {formData.education.length > 1 && (
                  <button onClick={() => removeArrayItem('education', edu.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                )}
                <div className="space-y-2">
                  <Label>Institution / University</Label>
                  <Input placeholder="Harvard University" value={edu.institution} onChange={e => updateArrayField('education', edu.id, 'institution', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input placeholder="B.S. Computer Science" value={edu.degree} onChange={e => updateArrayField('education', edu.id, 'degree', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Graduation Year</Label>
                    <Input placeholder="2024" value={edu.year} onChange={e => updateArrayField('education', edu.id, 'year', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => addArrayItem('education', { institution: '', degree: '', year: '' })}>
              <Plus size={16} className="mr-2" /> Add Education
            </Button>
          </div>
        );

      case 3: // Projects
        return (
          <div className="space-y-6">
            {formData.projects.map((proj, index) => (
              <div key={proj.id} className="p-4 border rounded-xl space-y-4 bg-slate-50 relative group">
                {formData.projects.length > 1 && (
                  <button onClick={() => removeArrayItem('projects', proj.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Project Title</Label>
                    <Input placeholder="E-commerce Platform" value={proj.title} onChange={e => updateArrayField('projects', proj.id, 'title', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Live Link / Repo</Label>
                    <Input placeholder="https://..." value={proj.link} onChange={e => updateArrayField('projects', proj.id, 'link', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Built using React and Node.js..." value={proj.description} onChange={e => updateArrayField('projects', proj.id, 'description', e.target.value)} />
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => addArrayItem('projects', { title: '', description: '', link: '' })}>
              <Plus size={16} className="mr-2" /> Add Project
            </Button>
          </div>
        );

      case 4: // Experience (Optional)
        return (
          <div className="space-y-6">
            {formData.experience.map((exp, index) => (
              <div key={exp.id} className="p-4 border rounded-xl space-y-4 bg-slate-50 relative group">
                <button onClick={() => removeArrayItem('experience', exp.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input placeholder="Google" value={exp.company} onChange={e => updateArrayField('experience', exp.id, 'company', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input placeholder="Software Engineer Intern" value={exp.role} onChange={e => updateArrayField('experience', exp.id, 'role', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input placeholder="May 2023 - Aug 2023" value={exp.duration} onChange={e => updateArrayField('experience', exp.id, 'duration', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Developed a microservice..." value={exp.description} onChange={e => updateArrayField('experience', exp.id, 'description', e.target.value)} />
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => addArrayItem('experience', { company: '', role: '', duration: '', description: '' })}>
              <Plus size={16} className="mr-2" /> Add Experience (Optional)
            </Button>
          </div>
        );

      case 5: // Summary
        return (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Almost Done!</h3>
            <p className="text-slate-500">Add a professional summary to highlight your goals and key skills.</p>
            <div className="text-left space-y-2 mt-6">
              <Label htmlFor="summary">Professional Summary / Objective</Label>
              <Textarea 
                id="summary" 
                className="h-32"
                placeholder="Highly motivated Software Engineer with experience in full-stack development..." 
                value={formData.summary} 
                onChange={e => updateField('summary', e.target.value)} 
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Build Your ATS Resume</h1>
        <p className="text-slate-500">Fill in the details below to generate an optimized resume.</p>
      </div>

      <Card className="shadow-lg border-slate-200 rounded-2xl overflow-hidden">
        {/* Progress Bar Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-100">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">
                Step {currentStep + 1} of {STEPS.length}
              </h2>
              <h3 className="text-xl font-bold text-slate-800">{STEPS[currentStep].title}</h3>
              <p className="text-slate-500 text-sm mt-1">{STEPS[currentStep].description}</p>
            </div>
            <span className="text-2xl font-bold text-slate-200">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <CardContent className="p-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 0}
            className="px-6"
          >
            <ChevronLeft size={16} className="mr-2" /> Back
          </Button>

          {currentStep === STEPS.length - 1 ? (
            <Button onClick={handleSubmit} className="px-8 bg-blue-600 hover:bg-blue-700 text-white">
              Complete & Generate <CheckCircle2 size={16} className="ml-2" />
            </Button>
          ) : (
            <Button onClick={nextStep} className="px-8 bg-slate-900 hover:bg-slate-800 text-white">
              Next Step <ChevronRight size={16} className="ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateResume;
