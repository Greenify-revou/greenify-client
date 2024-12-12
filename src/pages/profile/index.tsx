import React from 'react';
import ProfileForm from '@/src/components/ProfileForm';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <h1 className="text-center text-2xl font-semibold text-gray-700">Personal Profile</h1>
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
