import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, File, X, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';

const AtsCheck = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;
    
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or DOCX file.');
      setFile(null);
      return;
    }

    // Check size (5MB = 5 * 1024 * 1024 bytes)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB.');
      setFile(null);
      return;
    }

    setError('');
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleAnalyze = () => {
    if (!file) {
      setError('Please upload a file first.');
      return;
    }
    // TODO: Send file to the backend API
    console.log('Sending file to backend:', file.name);
    // Placeholder for future API logic
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-slate-200 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-100 pb-8 pt-10 px-10">
            <CardTitle className="text-3xl font-extrabold text-slate-900">ATS Score Check</CardTitle>
            <CardDescription className="text-slate-600 text-base mt-2">
              Upload your resume to see how well it performs against modern Applicant Tracking Systems.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-10 space-y-6">
            {!file ? (
              <div
                className={`relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl transition-all duration-300 ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-50' 
                    : error 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <UploadCloud className={`w-16 h-16 mb-4 ${isDragging ? 'text-blue-600' : 'text-slate-400'}`} />
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                  Drag & Drop your resume here
                </h3>
                <p className="text-sm text-slate-500 mb-4">or click to browse from your computer</p>
                
                <div className="flex gap-4 text-xs font-medium text-slate-400">
                  <span className="bg-white px-2 py-1 rounded-md border border-slate-200">PDF</span>
                  <span className="bg-white px-2 py-1 rounded-md border border-slate-200">DOCX</span>
                  <span className="bg-white px-2 py-1 rounded-md border border-slate-200">Max 5MB</span>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-between p-6 bg-blue-50 rounded-2xl border border-blue-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm">
                    <File size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 truncate max-w-[200px] md:max-w-md">
                      {file.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setFile(null)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-sm font-medium"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="px-10 pb-10 pt-4 flex justify-end">
            <Button 
              size="lg" 
              onClick={handleAnalyze} 
              disabled={!file}
              className={`w-full md:w-auto px-8 py-6 rounded-xl font-semibold text-base transition-all ${
                file 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' 
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              Analyze Resume
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AtsCheck;
