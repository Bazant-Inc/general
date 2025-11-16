export interface AgentRegistrationMessage {
  agent_id: string; // Assuming backend groups agents by workspace and user
  message: string;
  timestamp: number;
}
