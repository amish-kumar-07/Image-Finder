"use client";
import { Search, Eye, EyeOff, Github, Chrome } from 'lucide-react';
import { SignIn } from '@/app/actions/SignIn';
import { useSession } from "@/app/context/SessionContext";

export default function Page() {
  const session = useSession();

  const handleSignIn = async () => {
    await SignIn();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <Search className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to ImageSearch
          </h2>
          <p className="text-gray-400">
            Sign in to discover and search amazing images
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button onClick={handleSignIn}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200"
          >
            <Chrome className="h-5 w-5 mr-3" />
            Continue with Google
          </button>
        </div>

        
        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200">
              Sign up
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-8">
          <p>
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}