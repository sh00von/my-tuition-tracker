import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <header className="bg-base-100 text-base-content p-4 shadow-md">
        <div className="container mx-auto flex justify-center">
          <h1 className="text-2xl font-bold">Tuition Management</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-8">
        {children}
      </main>
      <footer className="bg-base-200 text-base-content p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Tuition Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
