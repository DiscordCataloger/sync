import ServerForm from './components/ServerForm';

const HomePage = () => {
  const handleCreateServer = async (server) => {
    const response = await fetch('/api/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(server),
    });
  };

  return (
    <div>
      <h1>Server Management</h1>
      <ServerForm onSubmit={handleCreateServer} />
    </div>
  );
};

export default HomePage;