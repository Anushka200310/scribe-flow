import { findOrCreateUser } from "@/actions/userAction";


const ServerInitializer = async () => {
  await findOrCreateUser();
  return null;
};

export default ServerInitializer;
