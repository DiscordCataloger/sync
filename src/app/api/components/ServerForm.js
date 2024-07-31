import { useState } from 'react';

const ServerForm = ({ onSubmit }) => {
  const [server, setServer] = useState({});

  const handleChange = (e) => {
    setServer({ ...server, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(server);
  };

  return (
<form onSubmit={handleSubmit}>
  <input name="serverName" onChange={handleChange} placeholder="Server Name" required />
  <input name="serverId" onChange={handleChange} placeholder="Server ID" required />
  <input name="serverCategory" onChange={handleChange} placeholder="Server Category" />
  <input name="serverAdmin" onChange={handleChange} placeholder="Server Admin" />
  <input name="serverIcon" onChange={handleChange} placeholder="Server Icon URL" />
  <select name="serverPrivacy" onChange={handleChange}>
    <option value="public">Public</option>
    <option value="private">Private</option>
  </select>
  <input name="members" onChange={handleChange} placeholder="Members (comma-separated)" />
  <input name="onlineMembers" onChange={handleChange} placeholder="Online Members (comma-separated)" />
  <input name="serverChannels" onChange={handleChange} placeholder="Server Channels (comma-separated)" />
  <button type="submit">Create Server</button>
</form>
  );
};

export default ServerForm;