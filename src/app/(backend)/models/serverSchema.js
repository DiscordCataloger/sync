import mongoose,{Schema} from 'mongoose';

const ServerSchema = new Schema({
  serverName: String,
  serverCategory: String,
  serverAdmin: String,
  serverIcon: String,
  serverPrivacy: String,
  members: [String],
  onlineMembers: [String],
  serverChannels: [String],
});

const Server = mongoose.models.Server || mongoose.model('Server', ServerSchema);
export default Server;