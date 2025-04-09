'use client';
import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

type Tutorial = {
  title: string;
  description: string;
  file: string;
};

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    fetch('/tutorials/tutorials.json')
      .then((res) => res.json())
      .then(setTutorials);
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-gold">Tutorials</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial, index) => (
          <div key={index} className="bg-[#131b26] p-6 rounded-2xl shadow-md border border-gray-700">
            <div className="flex items-center mb-4 text-lg font-semibold">
              <FileText className="mr-2 text-white" />
              {tutorial.title}
            </div>
            <p className="text-sm mb-4 text-gray-300">{tutorial.description}</p>
            <a
              href={`/tutorials/${tutorial.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline font-medium"
            >
              View →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
