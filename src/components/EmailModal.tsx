import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

export default function EmailModal({ isOpen, onClose, wallet }: { isOpen: boolean; onClose: () => void; wallet: string }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/register', {
        wallet,
        email,
      });
      alert('✅ Email registered successfully!');
      onClose();
    } catch (err) {
      alert('❌ Failed to register email.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Dialog.Panel className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full">
        <Dialog.Title className="text-lg font-semibold mb-4">Add Email Address</Dialog.Title>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#b0822e] via-[#fee4a3] to-[#925008] text-black font-semibold py-2 px-4 rounded w-full hover:opacity-90 transition duration-300"
>
         
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}
